import React, { useEffect } from 'react';
import Dropdown from 'components/UI/Dropdown';
import { Link, useLocation } from 'react-router-dom';
import { auth } from 'util/firebaseConfig';
import NavBarOffcanvas from './navigation/NavBarOffcanvas';
import { useMediaQuery } from 'react-responsive';
import 'stylesheet/Navigation.scss';

const Navigation = () => {
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });

  const loginUser = auth.currentUser;
  const { pathname } = useLocation();

  const navLinkClickHandler = (e) => {
    const elements = document.getElementsByClassName('nav__link');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected');
    }
    e.target.classList.add('selected');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const dropdownHandler = (e) => {
    document.getElementById('dropdown-list').classList.toggle('show');
  };

  useEffect(() => {
    let elements = document.getElementsByClassName('nav__link');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected');
    }
    elements = document.getElementById('nav__' + pathname.split('/')[2]);
    elements && elements.focus();
    elements && elements.classList.add('selected');
  }, [pathname]);

  return (
    <div className="nav__custom">
      <NavBarOffcanvas loginUser={loginUser} />

      <div className="nav__row" id="nav__hide">
        <Link
          id="nav__home"
          to="/knupi-web-v1/app/home"
          className="nav__link"
          onClick={navLinkClickHandler}
          autoFocus
        >
          Home
        </Link>
        <Link
          id="nav__about"
          to="/knupi-web-v1/app/about"
          className="nav__link"
          onClick={navLinkClickHandler}
        >
          About
        </Link>
        <Link
          id="nav__contact"
          to="/knupi-web-v1/app/contact"
          className="nav__link"
          onClick={navLinkClickHandler}
        >
          Contact
        </Link>
      </div>
      <Link
        to="/knupi-web-v1/app/home"
        onClick={() => {
          const elements = document.getElementsByClassName('nav__link');
          for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove('selected');
          }
          document.getElementById('nav__home').classList.add('selected');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="nav__logo"
      >
        <img
          src={process.env.PUBLIC_URL + '/img/logo1.png'}
          width="236"
          height="82"
          alt="logo-signsin-title"
        />
      </Link>
      <div className="nav__row">
        {/* login */}
        {!loginUser ? (
          <Link
            to="/knupi-web-v1/auth/signin"
            className="nav__link"
            id="nav__reservation"
            onClick={() => {
              window.alert(
                '로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.'
              );
            }}
          >
            Reservation
          </Link>
        ) : (
          <Link
            to="/knupi-web-v1/app/reservation"
            className="nav__link"
            id="nav__reservation"
            onClick={navLinkClickHandler}
          >
            Reservation
          </Link>
        )}{' '}
        {/* usermenu */}
        {!loginUser ? (
          <Link
            to="/knupi-web-v1/auth/signin"
            className="nav__usermenu nav__link"
          >
            <img
              className="user-login-icon"
              src={process.env.PUBLIC_URL + '/img/user-icon.png'}
              alt="user-login-icon"
            />
            <span style={{ fontSize: '1.2rem' }}>로그인</span>
          </Link>
        ) : (
          <div
            className="nav__usermenu nav__link"
            onClick={(e) => {
              dropdownHandler(e);
            }}
          >
            <img
              className="user-img"
              src={loginUser.photoURL}
              alt="유저사진"
              referrerPolicy="no-referrer"
            />
            <Dropdown />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
