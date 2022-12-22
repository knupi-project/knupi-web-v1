import ReserveExec from 'components/ReserveExec';
import React from 'react';
import { Link } from 'react-router-dom';

const Reserve = () => {
  const [page, setPage] = React.useState(0);

  const pageHandler = (e) => {
    console.log(e.target.id);
    switch (e.target.id) {
      case 'exec':
        setPage(0);
        break;
      case 'status':
        setPage(1);
        break;
      default:
        break;
    }
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
          <button id="exec" onClick={pageHandler} >
            예약하기
          </button>
          <button id="status" onClick={pageHandler}>
            예약현황
          </button>
        </div>
        <ReserveExec />
      </div>
    </div>
  );
};

export default Reserve;
