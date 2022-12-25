import React from 'react';
import { useState } from 'react';
import ReserveExec from 'components/Reserve/ReserveExec';
import ReserveStatus from 'components/Reserve/ReserveStatus';
// import { Link } from 'react-router-dom';

const Reserve = () => {
  const [page, setPage] = useState(<ReserveExec />);

  const pageHandler = (e) => {
    switch (e.target.id) {
      case 'button-0':
        setPage(<ReserveExec />);
        document.getElementById('button-1').classList.remove('selected');

        break;
      case 'button-1':
        setPage(<ReserveStatus />);
        document.getElementById('button-0').classList.remove('selected');

        break;
      default:
        break;
    }
    e.target.classList.add('selected');
    window.scrollTo({ top: e.clientY, behavior: 'smooth' });
  };

  return (
    <div className="reservation">
      <div className="reservation_mid">
        <div className="reservation_mid-text">
          <span className="reservation_mid-title">Reservation</span>
          <span className="reservation_mid-subtitle">피아노 예약</span>
        </div>
      </div>
      <div className="reservation_main">
        <div className="reservation_main_top-button">
          <button className="selected" id="button-0" onClick={pageHandler}>
            예약하기
          </button>
          <button className="" id="button-1" onClick={pageHandler}>
            예약현황
          </button>
        </div>
        {page}
      </div>
    </div>
  );
};

export default Reserve;
