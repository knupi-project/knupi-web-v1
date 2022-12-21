import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserReserve = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [reserveList, setReserveList] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => {};
  }, [currentTime]);

  return (
    <div className="profile__main">
      <div className="title">예약관리</div>
      <div className="msg">내 예약 일정을 확인, 취소합니다.</div>
      <div className="msg">현재시각 : {currentTime}</div>
      <div className="menu__title">예약현황</div>
      {reserveList.length === 0 && (
        <div className="menu__content none">
          <div className="msg">현재 예약 현황이 없습니다.</div>
          <Link to="/reserve">예약하기</Link>
        </div>
      )}
      {reserveList.length !== 0 && (
        <div className="menu__content exists">TODO//표그리기</div>
      )}
    </div>
  );
};

export default UserReserve;
