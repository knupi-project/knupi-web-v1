import React from 'react';
import Navigation from 'components/Navigation';
import Footer from 'components/ui/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="layout">
      <Navigation />
      <Outlet />
      {/* <div className="btns">
        <div
          className="moveTopBtn"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          맨 위로
        </div>
        <div
          className="moveBottomBtn"
          onClick={() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }}
        >
          맨 아래로
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default Root;
