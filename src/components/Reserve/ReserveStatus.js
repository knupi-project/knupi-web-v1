import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';

const ReserveStatus = () => {
  const [startDate, setStartDate] = useState(new Date()); // 달력 날짜 변경 시 기준점이 되는 날짜
  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };
  return (
    <div className="reservation_main">
      <div className="reservation_main_explanation">
        <p className="reservation_main_title">예약현황을 확인합니다</p>
        <p className="reservation_main_subtitle">
          Checking Current Reservation Lists
        </p>
      </div>
      <div className="reservation_main_container">
        <div className="reservation_main_box">
          <div className="reservation_main_calendar">
            <p id="reservation_main_box_title">
              - 날짜 : {moment(startDate).format('M월 D일 dddd')}
            </p>
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
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="datepickerHeader">
                  <div onClick={decreaseMonth}>
                    <img
                      src={process.env.PUBLIC_URL + '/img/back.png'}
                      className="h-6"
                    />
                  </div>
                  <div> {formatDate(date)}</div>
                  <div onClick={increaseMonth}>
                    <img
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
        <div className="reservation_main_box">
          <div className="reservation_main_calendar">
            <p id="reservation_main_box_title">- 예약현황</p>
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
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="datepickerHeader">
                  <div onClick={decreaseMonth}>
                    <img
                      src={process.env.PUBLIC_URL + '/img/back.png'}
                      className="h-6"
                    />
                  </div>
                  <div> {formatDate(date)}</div>
                  <div onClick={increaseMonth}>
                    <img
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
    </div>
  );
};

export default ReserveStatus;
