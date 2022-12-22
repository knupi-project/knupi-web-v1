import React from 'react';
import 'stylesheet/Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__title">Contacts</div>
      <div className="footer__menu">
        <div className="footer__menu__item">
          <img src={process.env.PUBLIC_URL + '/img/message.png'} alt="img" />
          <p>knupi2022@naver.com</p>
        </div>
        <div className="footer__menu__item">
          <img src={process.env.PUBLIC_URL + '/img/call.png'} alt="img" />
          <p>010-9985-8584 (회장 : 조연호)</p>
        </div>
        <div className="footer__menu__item">
          <img src={process.env.PUBLIC_URL + '/img/insta.png'} alt="img" />
          <p>@knupi_official</p>
        </div>
      </div>
      <div className="footer__copyright">
        © KNUPI | 2023 경북대학교 중앙동아리 크누피
      </div>
    </div>
  );
};

export default Footer;
