import React from 'react';
import 'stylesheet/Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_go_home">
        <Link
          to="/app/home"
          style={{ textDecoration: 'none' }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="footer_logo">
            <img
              className="footer_logo_duck"
              src={process.env.PUBLIC_URL + '/img/logo_duck_white.png'}
              alt="img"
            />
            <div className="footer_logo_text">
              <span className="footer_logo__title">KNUPI</span>
              <span className="footer_logo__subtitle">KNU PIANO CLUB</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="footer_name">
        <p className="footer_name_title"> KNUPI | We Are KNUPI</p>
        <p className="footer__copyright">
          © KNUPI | 2023 경북대학교 중앙동아리 크누피
        </p>
      </div>
    </div>
  );
};

export default Footer;
