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
      <div>Navigation</div>
      {!loginUser ? (
        <Link to="/signin" className="nav__usermenu">
          <img
            className="user-login-icon"
            src={process.env.PUBLIC_URL + '/img/user-icon.png'}
            alt="user-login-icon"
          />
          <div className="nav_usermenu__button">로그인</div>
        </Link>
      ) : (
        <div className="nav__usermenu" onClick={dropdownHandler}>
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
  );
};

export default Navigation;
