import React from 'react';
import 'stylesheet/Button.scss';

const SignUpButton = ({ platform, imgSrc, onClick }) => {
  return (
    <button className="signin-btn" onClick={onClick}>
      <div id="signin-icon-size">
        <img className="signin-icon" src={imgSrc} alt="로그인로고"></img>
      </div>
      <div>{platform}로 회원가입</div>
      <div className="signin-icon-size"></div>
    </button>
  );
};

export default SignUpButton;
