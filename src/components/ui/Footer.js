import React from 'react';

const Footer = () => {
  return (
    <div
      className="d-flex flex-wrap align-items-center py-3 px-3 border-top"
      style={{
        justifyContent: 'space-around',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '250px',
          minHeight: '60px',
        }}
      >
        <strong style={{fontSize: '1.3rem'}}>ECRARM</strong>
        Element Classification Robot Arm
      </div>
      <div
        className="d-flex text-muted"
        style={{
          fontSize: '12px',
          justifyContent: 'flex-start',
          justifyItems: 'flex-start',
          alignItems: 'center',
          alignContent: 'center',
          minWidth: '250px',
          minHeight: '60px',
        }}
      >
        2022 Hanium ICT공모전 / 22hf_182 <br />
        © 김영희.박건하.이희원.차우석 all right reserved <br />© Developed by
        GeonhaPark | seunmul
      </div>
    </div>
  );
};

export default Footer;
