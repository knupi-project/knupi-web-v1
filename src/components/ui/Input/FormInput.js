import React from 'react';
import 'stylesheet/Input.scss';

const FormInput = ({children, title, type, placeholder, onChange}) => {
  return (
    <div className="input-si">
      <div className="input-si-title">{title}</div>
      <input type={type} placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default FormInput;
