import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReserveTable from 'views/profile/components/ReserveTable';

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

const UserReserve = () => {
  const [secCounter, setSecCounter] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleString('ko-KR', options)
  );
  const [reserveList, setReserveList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSecCounter(secCounter + 1);

      setCurrentTime(new Date().toLocaleString('ko-KR', options));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [secCounter]);

  return (
    <div className="profile__main">
      <div className="title">예약 관리</div>
      <div className="msg">내 예약 일정을 확인, 취소합니다.</div>
      <div className="msg">현재시각 : {currentTime}</div>
      <div className="menu__title">예약현황</div>
      {/* {reserveList.length === 0 && (
        <div className="menu__content none">
          <div className="msg">현재 예약 현황이 없습니다.</div>
          <Link to="/knupi-web-v1/app/reservation">예약하기</Link>
        </div>
      )} */}
      {reserveList.length === 0 && (
        <div className="menu__content exists">
          <ReserveTable></ReserveTable>
        </div>
      )}
    </div>
  );
};

export default UserReserve;
