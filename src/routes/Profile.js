import React from 'react';
import { Outlet } from 'react-router-dom';
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
        <div className="profile__menu"> menu</div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
