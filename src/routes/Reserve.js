import React from 'react';
import { useState } from 'react';
import ReserveExec from 'components/ReserveExec';
import ReserveStatus from 'components/ReserveStatus';
// import { Link } from 'react-router-dom';

const Reserve = () => {
  const [page, setPage] = useState(<ReserveExec />);

  const pageHandler = (e) => {
    switch (e.target.id) {
      case 'exec':
        setPage(<ReserveExec />);
        break;
      case 'status':
        setPage(<ReserveStatus />);
        break;
      default:
        break;
    }
    window.scrollTo({ top: e.clientY, behavior: 'smooth' });
  };

  return (
    <div className="reservation">
      <div className="reservation_mid">
        <img
          src={process.env.PUBLIC_URL + '/img/reservation_mid.png'}
          alt="img"
        />
        <div className="reservation_mid-text">
          <span className="reservation_mid-title">Reservation</span>
          <span className="reservation_mid-subtitle">피아노 예약하기</span>
        </div>
      </div>
      <div className="reservation_main">
        <div className="reservation_main_top-button">
          <button id="exec" autoFocus onClick={pageHandler}>
            예약하기
          </button>
          <button id="status" onClick={pageHandler}>
            예약현황
          </button>
        </div>
        {page}
      </div>
    </div>
  );
};

export default Reserve;
