import React from 'react';
import 'stylesheet/Button.scss';

const formBtn = ({ title, onClick }) => {
  return (
    <button className="btn-si-mj-320" onClick={onClick} type="submit">
      {title}
    </button>
  );
};

export default formBtn;
