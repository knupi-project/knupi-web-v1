import { useState, useEffect } from 'react';
import { db } from 'util/firebaseConfig';
import { where, collection, query, getDocs } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';
import ReservedList from './ReservedList';
import Loader from 'components/UI/Loader';

const formatDate = (d) => {
  const date = new Date(d);
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}년 ${`0${monthIndex}`.slice(-2)}월`;
};

function getTimeArray(start, end, interval) {
  let startTime = getTimeFromHourMinuteString(start);
  const endTime = getTimeFromHourMinuteString(end);
  const timeArray = [];
  const intervalMS = interval * 60 * 1000;
  while (startTime < endTime) {
    timeArray.push(getStringFromDate(startTime));
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

function About() {
  // 달력 날짜 변경 시 기준점이 되는 날짜
  const [startDate, setStartDate] = useState(new Date());

  // firebase 예약 데이터
  const [list, setLists] = useState(null);

  // 날짜 선택할 때 마다 쿼리함. 저번에 얘기 했을 때는 여러번 쿼리 안하자 했는데..
  useEffect(() => {
    // 선택한 날짜
    const SelectedDay = moment(startDate).format('YYYY년 M월 D일');

    const getData = async () => {
      let dayReserve = await Promise.all(
        timeArray.map(async (time) => {
          const querys = ['0번', '1번', '2번', '3번'].map((item) => {
            return query(collection(db, 'reservations', startDate, item));
          });

          const [
            query0Snapshot,
            query1Snapshot,
            query2Snapshot,
            query3Snapshot,
          ] = await Promise.all(querys.map((q) => getDocs(q)));

          if (
            !(
              query0Snapshot.empty &&
              query1Snapshot.empty &&
              query2Snapshot.empty &&
              query3Snapshot.empty
            )
          ) {
            const timeQuery = {
              time: time,
              no0: ' ',
              no1: ' ',
              no2: ' ',
              no3: ' ',
            };
            query0Snapshot.docs.forEach((doc) => {
              const Name0 = `${doc.data().name}\n(${doc.data().purpose})`;
              timeQuery['no0'] = Name0;
            });

            query1Snapshot.docs.forEach((doc) => {
              const Name1 = `${doc.data().name}\n(${doc.data().purpose})`;
              timeQuery['no1'] = Name1;
            });

            query2Snapshot.docs.forEach((doc) => {
              const Name2 = `${doc.data().name}\n(${doc.data().purpose})`;
              timeQuery['no2'] = Name2;
            });

            query3Snapshot.docs.forEach((doc) => {
              const Name3 = `${doc.data().name}\n(${doc.data().purpose})`;
              timeQuery['no3'] = Name3;
            });

            return timeQuery;
          }
        })
      );
      dayReserve = dayReserve.filter((item) => item !== undefined);
      console.log('db : ', dayReserve);
      setLists(dayReserve);
      return dayReserve;
    };

    getData();
  }, [startDate]);

  const ShowList = list && <ReservedList list={list} />;
  return (
    <div className="about_main" style={{ marginTop: '150px' }}>
      {list ? (
        <div className="reservation_main_container">
          <div className="reservation_main_box">
            <div className="reservation_main_calendar">
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
                        alt="backbutton"
                        src={process.env.PUBLIC_URL + '/img/back.png'}
                        className="h-6"
                      />
                    </div>
                    <div> {formatDate(date)}</div>
                    <div onClick={increaseMonth}>
                      <img
                        alt="backbutton"
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
              <p id="reservation_main_box_title">
                - 날짜 : {moment(startDate).format('M월 D일 dddd')}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {ShowList}
    </div>
  );
}
export default About;
