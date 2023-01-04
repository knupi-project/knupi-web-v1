import React from 'react';
import { useState } from 'react';
import { auth } from 'util/firebaseConfig';
import { Link } from 'react-router-dom';
const ReservePage = () => {
  const loginUser = auth.currentUser;
  let data = ['10:00', '10:30', '11:00', '11:30', '12:00'];

  let [btnActive, setBtnActive] = useState('');

  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  return (
    <div className="home">
      <div className="home_top-bar"></div>
      <div className="home_main">
        <div className="home_info">
          <Link className="home_info_back" to={`/app/reserve`}>
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
        <div className="home_date" id="home_box">
          <p className="home_date_title" id="home__title">
            1. 날짜 선택
          </p>
          <div className="home_date_calendar"></div>
        </div>
        <div className="home_time" id="home_box">
          <div className="home_time_text">
            <p className="home_time_title" id="home__title">
              2. 시간 선택
            </p>
            <p className="home_time_subtitle">1월 11일 수요일</p>
          </div>
          <>
            {data.map((item, idx) => {
              return (
                <div className="home_time_block" key={idx + 'big_button'}>
                  <button
                    key={idx}
                    value={idx}
                    className={
                      'time-block' + (idx == btnActive ? ' active' : '')
                    }
                    onClick={toggleActive}
                  >
                    {item}
                    <Link to={`/app/reserve/check/:${loginUser.email}`}>
                      <button
                        key={'confirm_button' + idx}
                        className="home_time_block_confirm"
                        onClick={() => localStorage.setItem('key', item)}
                      >
                        확인
                      </button>
                    </Link>
                  </button>
                </div>
              );
            })}
          </>
        </div>
      </div>
    </div>
  );
};

export default ReservePage;
