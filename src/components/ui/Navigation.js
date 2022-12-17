import React from 'react';
import 'stylesheet/Navigation.scss';
const Navigation = ({children}) => {
  return (
    <div className="nav">
      Navigation
      {children}
    </div>
  );
};

export default Navigation;
