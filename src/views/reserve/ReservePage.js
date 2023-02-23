import React from 'react';
import { useState, useEffect } from 'react';
import { db } from 'util/firebaseConfig';
import { Link, useParams } from 'react-router-dom';
import { collection, getDocs, doc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';

const ReservePage = () => {
  // 달력
  const [startDate, setStartDate] = useState(new Date()); // 달력 날짜 변경 시 기준점이 되는 날짜
  const formatDate = (d) => {
    const date = new Date(d);
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
  };

  function getTimeFromHourMinuteString(hourMinuteString) {
    const [hour, minute] = hourMinuteString.split(':');
    const time = new Date();
    time.setHours(parseInt(hour));
    time.setMinutes(parseInt(minute));
    time.setSeconds(0);

    return time;
  }

  function getStringFromDate(date) {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const timeStr = hours + ':' + minutes;

    return timeStr;
  }

  function getTimeArray(start, end, interval) {
    let startTime = getTimeFromHourMinuteString(start);
    const endTime = getTimeFromHourMinuteString(end);
    const timeArray = [];
    const intervalMS = interval * 60 * 1000;
    while (startTime < endTime) {
      timeArray.push(startTime);
      startTime = new Date(startTime.getTime() + intervalMS);
    }
    return timeArray;
  }
  function getTimeFromHourMinuteString(hourMinuteString) {
    const [hour, minute] = hourMinuteString.split(':');
    const time = new Date();
    time.setHours(parseInt(hour));
    time.setMinutes(parseInt(minute));
    time.setSeconds(0);

    return time;
  }

  function getStringFromDate(date) {
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const timeStr = hours + ':' + minutes;

    return timeStr;
  }
  const timeArray = getTimeArray('09:00', '22:30', 30);

  const YMD = moment(startDate).format('YYYY년 M월 D일');
  const [list, setLists] = useState([]);
  useEffect(() => {
    // 선택한 날짜
    const reservationsRef = doc(db, 'reservations', YMD);
    const setTimeArray = async () => {
      const querySnapshot = await getDocs(collection(reservationsRef, '0번'));
      querySnapshot.forEach((doc) => {
        timeArray.pop(doc.id);
        console.log(doc.id, 'detected');
      });
    };
    setTimeArray();
  }, [startDate]);

  const { type } = useParams();

  let [btnActive, setBtnActive] = useState();
  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

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
          {timeArray.map((item, idx) => {
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
                  {getStringFromDate(item)}
                  <Link to={`/app/reserve/check${type}`}>
                    <button
                      key={'confirm_button' + idx}
                      className="home_time_block_confirm"
                      onClick={() => {
                        localStorage.setItem(
                          'start time',
                          getStringFromDate(item)
                        );
                        localStorage.setItem(
                          'end time',
                          getStringFromDate(
                            new Date(item.getTime() + 30 * 60 * 1000)
                          )
                        );
                        localStorage.setItem(
                          'date',
                          moment(startDate).format('YYYY년 M월 D일')
                        );
                      }}
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
    </>
  );
};

export default ReservePage;
