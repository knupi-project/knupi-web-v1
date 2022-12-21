import React from 'react';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div className="layout">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
