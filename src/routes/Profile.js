import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { auth } from 'util/firebaseConfig';
// import { useParams } from 'react-router-dom';

const Profile = () => {
  const loginUser = auth.currentUser;
  // const { id } = useParams();
  // console.log(id);

  return (
    <div className="profile">
      <div className="profile__sidebar">
        <div className="user">
          <img
            className="user__img"
            src={loginUser.photoURL}
            alt="유저사진"
            referrerPolicy="no-referrer"
          />
          <div className="user__name">{loginUser.displayName}</div>
        </div>
        <div className="menu">
          <Link
            to={`/app/profile/:${auth.currentUser.email}/info`}
            className="profile__menu__item"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            내 계정
          </Link>
          <Link
            to={`/app/profile/:${auth.currentUser.email}/reserve`}
            className="profile__menu__item"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            예약 관리
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
