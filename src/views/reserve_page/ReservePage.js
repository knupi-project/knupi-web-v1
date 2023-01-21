import React from 'react';
import { useState } from 'react';
import { auth } from 'util/firebaseConfig';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';
import BackButton from 'components/UI/BackButton';

const ReservePage = () => {
  const loginUser = auth.currentUser;
  let data = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
  ];

  let [btnActive, setBtnActive] = useState();

  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  // 달력

  const [startDate, setStartDate] = useState(new Date()); // 달력 날짜 변경 시 기준점이 되는 날짜
  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  return (
    <div className="home">
      <div className="reserve_home">
        <div className="home_top-bar"></div>
        <div className="home_main">
          <div className="home_info">
            <BackButton
              style={{
                margin: '40px 0px 0px 40px',
                padding: '0px',
              }}
            />
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
            <div className="home_date_calendar">
              <div className="hasCalendar">
                <DatePicker
                  className="input-datepicker" // class name
                  inline // 달력 화면에 바로 나오도록 설정
                  locale={ko} // 한국어 설정
                  dateFormat="yyyy-MM-dd" // 데이터 포맷
                  popperModifiers={{
                    // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                    preventOverflow: {
                      enabled: true,
                    },
                  }}
                  minDate={new Date()} // 과거 날짜는 선택할 수 없게 disable
                  maxDate={addDays(new Date(), 13)} // 오늘로부터 13일까지 날짜 선택 가능
                  onChange={(date) => setStartDate(date)} // 바뀐 날짜로 저장
                  renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                  }) => (
                    <div className="datepickerHeader">
                      <div onClick={decreaseMonth}>
                        <img
                          alt="달력 왼쪽 화살표"
                          src={process.env.PUBLIC_URL + '/img/back.png'}
                          className="h-6"
                        />
                      </div>
                      <div> {formatDate(date)}</div>
                      <div onClick={increaseMonth}>
                        <img
                          alt="달력 오른쪽 화살표"
                          src={process.env.PUBLIC_URL + '/img/back.png'}
                          className="h-6"
                          id="h-6_reverse"
                        />
                      </div>
                    </div>
                  )}
                  dayClassName={(d) =>
                    getDate(d) === getDate(startDate) &&
                    getMonth(d) === getMonth(startDate)
                      ? 'normal-day selected-day'
                      : 'normal-day'
                  }
                />
              </div>
            </div>
          </div>
          <div className="home_time" id="home_box">
            <div className="home_time_text">
              <p className="home_time_title" id="home__title">
                2. 시간 선택
              </p>
              <p className="home_time_subtitle">
                {moment(startDate).format('M월 D일 dddd')}
              </p>
            </div>

            <div className="home_time_container">
              {data.map((item, idx) => {
                return (
                  <div className="home_time_block" key={idx + 'big_button'}>
                    <div
                      key={idx}
                      value={idx}
                      className={
                        'time-block' + (idx === btnActive ? ' active' : '')
                      }
                      onClick={toggleActive}
                      tabIndex="0"
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservePage;
