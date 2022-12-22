import React from 'react';
import 'stylesheet/Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__title">Contacts</div>
      <div className="footer__menu">
        <div className="footer__menu__item">
          <img src={process.env.PUBLIC_URL + '/img/message.png'} alt="img" />
        </div>
        <div className="footer__menu__item">
          <img src={process.env.PUBLIC_URL + '/img/call.png'} alt="img" />
        </div>
        <div className="footer__menu__item">
          <img src={process.env.PUBLIC_URL + '/img/insta.png'} alt="img" />
        </div>
      </div>
      <div className="footer__copyright">
        © KNUPI | 2023 경북대학교 중앙동아리 크누피
      </div>
    </div>
  );
};

export default Footer;
