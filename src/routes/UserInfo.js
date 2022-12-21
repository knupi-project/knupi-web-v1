import React, { useEffect } from 'react';
import { useState } from 'react';

const UserInfo = () => {
  const [nickName, setNickName] = useState('');
  const nickChangeHandler = ({ target: { value } }) => setNickName(value);

  useEffect(() => {
    console.log(nickName);
  }, [nickName]);

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="profile__main">
      <div className="title">내 계정</div>
      <div className="msg">아래에서 개인정보를 확인하고 편집하세요.</div>
      <div className="menu__title"></div>
      <div className="menu__content exists">
        <div className="menu__content__title">계정</div>
        <div className="menu__content__msg">개인정보를 업데이트 해주세요.</div>
        <div className="menu__content__msg">
          로그인 이메일 : //TODO 이메일 연결
        </div>
        <div className="menu__content__form">
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
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
