import React from 'react';
import 'stylesheet/Button.scss';

const SignUpButton = ({platform, imgSrc, onClick}) => {
  return (
    <button className="login-btn" onClick={onClick}>
      <div id="login-icon-size">
        <img className="login-icon" src={imgSrc} alt="로그인로고"></img>
      </div>
      <div>{platform}로 회원가입</div>
      <div className="login-icon-size"></div>
    </button>
  );
};

export default SignUpButton;
