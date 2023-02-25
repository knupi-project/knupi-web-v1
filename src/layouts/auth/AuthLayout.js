import React from 'react';
import BackButton from 'components/UI/BackButton';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Auth = () => {
  return (
    <div className="sign">
      <BackButton />
      <div className="sign-loginbox">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + '/img/logo1.png'}
            width="236"
            height="82"
            alt="logo-signsin-title"
            style={{ marginBottom: '83px' }}
          />
        </Link>
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
