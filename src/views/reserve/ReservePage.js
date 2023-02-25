import React from 'react';
import { useState, useEffect } from 'react';
import { db } from 'util/firebaseConfig';
import { useParams } from 'react-router-dom';
import { collection, getDocs, doc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';
import TimeArray from './components/TimeArray';

const ReservePage = () => {
  // 달력
  const [startDate, setStartDate] = useState(new Date()); // 달력 날짜 변경 시 기준점이 되는 날짜
  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  const YMD = moment(startDate).format('YYYY년 M월 D일');
  const [list, setLists] = useState([]);
  useEffect(() => {
    // 선택한 날짜
    const reservationsRef = doc(db, 'reservations', YMD);
    const setTimeArray = async () => {
      const querySnapshot = await getDocs(collection(reservationsRef, '0번'));
      querySnapshot.forEach((doc) => {
        // timeArray.pop(doc.id);
        console.log(doc.id, 'detected');
      });
    };
    setTimeArray();
  }, [startDate]);

  const { type } = useParams();

  return (
    <>
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
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
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
          <TimeArray startDate={startDate} type={type} />
        </div>
      </div>
    </>
  );
};

export default ReservePage;
