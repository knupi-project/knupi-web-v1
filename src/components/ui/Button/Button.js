import React from 'react';
import 'stylesheet/Button.scss';

function Button({children, onClick}) {
  return (
    <button className="Button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
