import React from 'react';
import 'stylesheet/Form.scss';

const UserInfoForm = ({children, onSubmit, platform}) => {
  return (
    <form className="user-info-form" onSubmit={onSubmit}>
      <div className="form-title">
        {platform}로 회원가입이 완료되었습니다. <br /> 사용자의 이름을
        입력해주세요.
      </div>
      {children}
    </form>
  );
};

export default UserInfoForm;
