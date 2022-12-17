import React from 'react';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';
import {Outlet} from 'react-router-dom';
import 'stylesheet/Layout.scss';
import Dropdown from 'components/ui/Dropdown';
const Root = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <div className="layout">
      <Navigation>
        <Dropdown
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        ></Dropdown>
      </Navigation>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
