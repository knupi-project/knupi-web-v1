import React from 'react';
import Dropdown from 'components/ui/Dropdown';
import { Link } from 'react-router-dom';
import { auth } from 'util/firebaseConfig';
import 'stylesheet/Navigation.scss';

const Navigation = () => {
  const loginUser = auth.currentUser;

  const dropdownHandler = (e) => {
    document.getElementById('dropdown-list').classList.toggle('show');
  };

  return (
    <div className="nav">
      <div className="nav__row">
        <Link to="/home" className="nav__link">
          Home
        </Link>
        <Link to="/about" className="nav__link">
          About
        </Link>
        <Link to="/contact" className="nav__link">
          Contact
        </Link>
        <div className="nav__link" />
      </div>
      <Link to="/home" className="nav__logo">
        <img
          src={process.env.PUBLIC_URL + '/img/logo1.png'}
          width="236"
          height="82"
          alt="logo-signsin-title"
        />
      </Link>

      <div className="nav__row">
        <div className="nav__link" />
        <Link to="/reserve" className="nav__link">
          Reservation
        </Link>
        {!loginUser ? (
          <Link to="/signin" className="nav__usermenu nav__link">
            <img
              className="user-login-icon"
              src={process.env.PUBLIC_URL + '/img/user-icon.png'}
              alt="user-login-icon"
            />
            <div className="nav__usermenu__button">로그인</div>
          </Link>
        ) : (
          <div className="nav__usermenu nav__link" onClick={dropdownHandler}>
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
