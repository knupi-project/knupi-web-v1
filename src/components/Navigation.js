import React from 'react';
import Dropdown from 'components/ui/Dropdown';
import { Link } from 'react-router-dom';
import { auth } from 'util/firebaseConfig';
import 'stylesheet/Navigation.scss';

const Navigation = () => {
  const loginUser = auth.currentUser;

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

  return (
    <div className="nav">
      <div className="nav__row">
        <Link
          to="/home"
          className="nav__link selected"
          onClick={navLinkClickHandler}
          autoFocus
        >
          Home
        </Link>
        <Link to="/about" className="nav__link" onClick={navLinkClickHandler}>
          About
        </Link>
        <Link to="/contact" className="nav__link" onClick={navLinkClickHandler}>
          Contact
        </Link>
      </div>
      <Link
        to="#"
        onClick={() => {
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
        <Link to="/reserve" className="nav__link" onClick={navLinkClickHandler}>
          Reservation
        </Link>
        {!loginUser ? (
          <Link to="/signin" className="nav__usermenu nav__link">
            <img
              className="user-login-icon"
              src={process.env.PUBLIC_URL + '/img/user-icon.png'}
              alt="user-login-icon"
            />
            <span>로그인</span>
          </Link>
        ) : (
          <div
            className="nav__usermenu nav__link"
            onClick={(e) => {
              dropdownHandler(e);
              // navLinkClickHandlser(e);
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
