import React from 'react';
import { auth } from 'util/firebaseConfig';
import { Link } from 'react-router-dom';
const Reservecheck = () => {
  const selectedTime = localStorage.getItem('key');

  return (
    <div className="home">
      <div className="home_top-bar"></div>
      <div className="home_main">
        <div className="home_info">
          <Link className="home_info_back">
            <img
              className="home_info_back-btn"
              src={process.env.PUBLIC_URL + '/img/back.png'}
              alt="img"
            />
            <p className="home_info_back-title">뒤로가기</p>
          </Link>
          <img
            className="home_info_piano_img"
            src={process.env.PUBLIC_URL + '/img/piano_img.png'}
            alt="img"
          />
          <p className="home_info_title">피아노 예약하기</p>
          <p className="home_info_subtitle">업라이트 피아노</p>
          <p className="home_info_time-info">🕑 진행시간 : 30분</p>
        </div>

        <div className="home_check">
          <p id="home_check_title">예약이 완료되었습니다</p>
          <div className="home_check_info">
            <p className="home_check_name" id="home_check_subtitle">
              이름 : {}
            </p>
            <p className="home_check_time" id="home_check_subtitle">
              예약 시간 : {selectedTime} ~ {selectedTime}
            </p>
          </div>

          <div className="reserve_button_div">
            <Link to="/app/reserve">
              <button className="home_check_reserve" id="home_check_subtitle">
                확인
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservecheck;