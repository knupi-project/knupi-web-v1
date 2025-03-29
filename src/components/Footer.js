import React from 'react';
import 'stylesheet/Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_go_home">
        <Link
          to="/knupi-web-v1/app/home"
          style={{ textDecoration: 'none' }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="footer_name">
            <div className="fotter_logotitle">
              <img
                className="footer_logo_duck"
                src={process.env.PUBLIC_URL + '/img/logo_duck_white.png'}
                alt="img" />
              <p className="footer_name_title"> KNUPI | We Are KNUPI</p>
            </div>
            <p className="footer_name_copyright">
              © KNUPI | 2023 경북대학교 중앙동아리 크누피
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
