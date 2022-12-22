import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'stylesheet/Button.scss';

const BackButton = () => {
  const navigate = useNavigate();
  const backButtonHandler = () => {
    navigate(-1);
  };
  return (
    <div className="back-button">
      <button onClick={backButtonHandler}>
        <img src={process.env.PUBLIC_URL + '/img/back.png'} alt="back-button" />
        <span>뒤로가기</span>
      </button>
    </div>
  );
};

export default BackButton;
