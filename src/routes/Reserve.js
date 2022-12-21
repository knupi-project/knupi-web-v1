import React from 'react';

const Reserve = () => {
  return (
    <div className="reservation">
      <div className="reservation__mid">
        <img
          src={process.env.PUBLIC_URL + 'img/reservation_mid.png'}
          alt="img"
        />
        <div className="txt">
          <span className="txt__title">Reservation</span>
          <span className="txt__subtitle">피아노 예약하기</span>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
