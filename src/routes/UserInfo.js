import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from 'util/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { updateUserInfo } from 'util/reducer/loginSlice';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(
    useSelector((state) => state.login.userInfo)
  );
  const dispatch = useDispatch();
  const [nickName, setNickName] = useState('');

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log('formSubmitHandler 실행');
    } catch (error) {
      console.log(error.message);
    }
  };

  const nickChangeHandler = ({ target: { value } }) => {
    setNickName(value);
    console.log(nickName);
  };

  useEffect(() => {
    if (!userInfo) {
      const getUserInfo = async () => {
        //인증정보 바탕으로 DB 회원정보 쿼리
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(updateUserInfo(docSnap.data()));
          setUserInfo(docSnap.data());
        }
      };
      getUserInfo();
    }
    return () => {
      console.log('init');
      setUserInfo(null);
    };
  }, []);

  return (
    <div className="profile__main">
      <div className="title">내 계정</div>
      <div className="msg">아래에서 개인정보를 확인하고 편집하세요.</div>
      <div className="menu__title"></div>
      {userInfo && (
        <div className="menu__content exists">
          <div className="menu__content__title">계정</div>
          <div className="menu__content__msg">
            개인정보를 업데이트 해주세요.
          </div>
          <div className="menu__content__msg">
            로그인 이름 : {userInfo.name}
          </div>
          <div className="menu__content__msg">
            로그인 이메일 : {userInfo.email}
          </div>
          <div className="menu__content__msg">
            로그인 닉네임 : {userInfo.nickname}
          </div>
          <form className="menu__content__form" onSubmit={formSubmitHandler}>
            {[1, 2, 3, 4].map((item, index) => {
              return (
                <div className="inputbox">
                  <div className="inputbox__title">이름</div>
                  <input
                    type="text"
                    placeholder="이름을 입력하세요"
                    onChange={nickChangeHandler}
                  />
                </div>
              );
            })}
            <button type="submit">폼 버튼</button>
          </form>
        </div>
      )}
      {!userInfo && <div>데이터 로딩중..</div>}
    </div>
  );
};

export default UserInfo;
