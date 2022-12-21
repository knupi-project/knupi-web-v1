import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from 'util/firebaseConfig';

import 'stylesheet/Profile.scss';
const Profile = () => {
  const loginUser = auth.currentUser;

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="profile__user">
          <img
            className="profile__user__img"
            src={loginUser.photoURL}
            alt="유저사진"
            referrerPolicy="no-referrer"
          />
          <div className="profile__user__name">{loginUser.displayName}</div>
        </div>
        <div className="profile__menu">
          <Link to="/profile/info" className="profile__menu__item">
            My Account
          </Link>
          <Link to="/profile/reserve" className="profile__menu__item">
            My Reservation
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
