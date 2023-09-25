import React from 'react';
import { useState } from 'react';
import ReserveExec from 'views/main/reservation/components/ReservationExec';
import ReserveStatus from 'views/main/reservation/components/ReservationStatus';
// import { Link } from 'react-router-dom';

const Reservation = () => {
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
          <div className="reservation_mid-title">Reservation</div>
          <div className="reservation_mid-subtitle">피아노 예약</div>
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

export default Reservation;
