import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth, db } from 'util/firebaseConfig';
import {
  doc,
  getDoc,
  updateDoc,
  query,
  collection,
  onSnapshot,
} from 'firebase/firestore';
import { updateUserInfo } from 'util/reducer/loginSlice';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(
    useSelector((state) => state.login.userInfo)
  );
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [nickName, setNickName] = useState('');

  const toggleEditing = () => setEditing((prev) => !prev);

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log('formSubmitHandler 실행');
      const UserRef = doc(db, 'users', `${auth.currentUser.uid}`);
      await updateDoc(UserRef, { nickname: nickName });
      toggleEditing();
      alert('변경되었습니다!');
    } catch (error) {
      console.log(error.message);
    }
  };

  const nickChangeHandler = ({ target: { value } }) => {
    setNickName(value);
  };

  useEffect(() => {
    if (!userInfo) {
      const getUserInfo = async () => {
        //인증정보 바탕으로 DB 회원정보 쿼리
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(updateUserInfo({ ...docSnap.data(), timestamp: '' }));
          setUserInfo(docSnap.data());
        }
      };
      getUserInfo();
    }
    return () => {
      setUserInfo(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <div className="menu__nickname_div">
            {editing ? (
              <div className="edit_mode_container">
                <form
                  className="menu__content__form"
                  onSubmit={formSubmitHandler}
                >
                  <div className="edit_mode_div">
                    <label htmlFor="name">변경할 닉네임 : </label>
                    <input
                      type="text"
                      placeholder="이름을 입력하세요"
                      onChange={nickChangeHandler}
                      id="name"
                      required
                    />
                  </div>
                  <button className="edit_mode_btn" type="submit">
                    submit
                  </button>
                </form>
                <button
                  style={{ marginTop: '-3px' }}
                  className="edit_mode_btn"
                  onClick={toggleEditing}
                >
                  back
                </button>
              </div>
            ) : (
              <>
                <p>로그인 닉네임 : {userInfo.nickname}</p>
                <button className="edit_btn" onClick={toggleEditing}>
                  수정하기
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {!userInfo && <div>데이터 로딩중..</div>}
    </div>
  );
};

export default UserInfo;
