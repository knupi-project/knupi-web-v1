import React from 'react';
import { Link } from 'react-router-dom';
const ReserveExec = () => {
  return (
    <>
      <div className="reservation_main_explanation">
        <p className="reservation_main_title">피아노 종류를 선택해주세요</p>
        <p className="reservation_main_subtitle">Choose the Piano</p>
      </div>
      <div className="reservation_main_piano">
        <div className="reservation_main_piano-1">
          <span className="reservation_main_piano-1_title">
            업라이트 피아노
          </span>
          <span className="reservation_main_piano-1_time">
            진행 시간 : 30분
          </span>
          <span className="reservation_main_piano-1_subtitle">
            업라이트 피아노 예약하기
          </span>
          <p className="reservation_main_piano-1_btn">
            <Link href="#">예약하기</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ReserveExec;
