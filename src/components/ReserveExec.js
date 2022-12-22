import React from 'react';
import { auth } from 'util/firebaseConfig';
import { Link } from 'react-router-dom';
const ReserveExec = () => {
  const loginUser = auth.currentUser;
  return (
    <>
      <div className="reservation_main_explanation">
        <p className="reservation_main_title">피아노 종류를 선택해주세요</p>
        <p className="reservation_main_subtitle">Choose the Piano</p>
      </div>
      <div className="piano_card_box">
        {[1, 2, 3, 4].map((element) => {
          return (
            <div className="piano_card">
              <span className="piano_card_title">업라이트 피아노</span>
              <span className="piano_card_time">진행 시간 : 30분</span>
              <span className="piano_card_subtitle">
                업라이트 피아노 예약하기
              </span>
              <p className="piano_card_btn">
                {loginUser && (
                  <Link
                    to={`/reserve/page:${loginUser.email}`}
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    예약하기
                  </Link>
                )}
                {!loginUser && (
                  <Link
                    to="/signin"
                    onClick={() => {
                      alert('로그인이 필요합니다, 로그인 페이지로 이동합니다.');
                    }}
                  >
                    예약하기
                  </Link>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ReserveExec;
