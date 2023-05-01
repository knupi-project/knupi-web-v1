import { useState, useEffect, forwardRef } from 'react';
import { db, auth } from 'util/firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays, subDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';
import ReservedList from 'views/main/ReservedList';
import { useMediaQuery } from 'react-responsive';
import ReserveTable from 'views/profile/components/ReserveTable';

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

// 23:30 까지 리스트에 들어가므로 24:00 으로 수정
const timeArray = getTimeArray('09:00', '24:00', 30);

function getIndexFromTime(time) {
  const [hour, min] = time.split(':');
  const index = (hour - 9) * 2 + (min >= '30' ? 1 : 0);
  return index;
}

const ReserveStatus = () => {
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
  // 달력 날짜 변경 시 기준점이 되는 날짜
  const [startDate, setStartDate] = useState(new Date());
  const YMD = moment(startDate).format('YYYY년 M월 D일');
  // firebase 예약 데이터
  const [list, setLists] = useState([]);

  const [timetableArray, setTimetableArray] = useState(list);

  async function handleDeleteClick(docRef) {
    try {
      await deleteDoc(docRef);
      alert('삭제되었습니다.');
      queryfunction(); // queryfunction => 달력에 선택된 날짜 쿼리해오기
    } catch (error) {
      console.log('error');
    }
  }

  // useeffect 내의 코드를 queryfunction으로 빼내서 useeffect 안에 넣음
  const queryfunction = () => {
    const today_real = new Date();
    const today = new Date(today_real.getTime());
    today.setDate(today.getDate() - 1);
    const isPastDate = startDate < today;

    // 선택한 날짜
    const reservationsRef = doc(db, 'reservations', YMD);
    Promise.all([
      getDocs(collection(reservationsRef, '0번')),
      getDocs(collection(reservationsRef, '1번')),
      getDocs(collection(reservationsRef, '2번')),
      getDocs(collection(reservationsRef, '3번')),
    ])
      .then((querySnapshotArray) => {
        const documentsArray = [];
        const timetableArray = [];

        // Loop through each query snapshot and add its documents to the array
        querySnapshotArray.forEach((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // delete data.userId; // userId 필드 삭제
            documentsArray.push({
              id: doc.id,
              ...data,
            });
          });
        });

        timeArray.map((time) => {
          const timeQuery = {
            time: time,
            '0번': {
              value: ' ',
              isUser: false,
              YMD: 0,
              pn: 0,
              time: time,
              isPastDate: isPastDate,
            },
            '1번': {
              value: ' ',
              isUser: false,
              YMD: 0,
              pn: 0,
              time: time,
              isPastDate: isPastDate,
            },
            '2번': {
              value: ' ',
              isUser: false,
              YMD: 0,
              pn: 0,
              time: time,
              isPastDate: isPastDate,
            },
            '3번': {
              value: ' ',
              isUser: false,
              YMD: 0,
              pn: 0,
              time: time,
              isPastDate: isPastDate,
            },
            is0: 0,
          };

          timetableArray.push(timeQuery);
        });

        // documentsArray만 for문 돌려서 인덱싱으로 배열 내 요소 삭제
        for (let i = 0; i < documentsArray.length; i++) {
          timetableArray[getIndexFromTime(documentsArray[i].id)][
            documentsArray[i].pianoNum
          ].value = `${documentsArray[i].name}(${documentsArray[i].purpose})`;
          timetableArray[getIndexFromTime(documentsArray[i].id)]['is0'] = 1;

          if (documentsArray[i].userId === auth.currentUser.uid) {
            timetableArray[getIndexFromTime(documentsArray[i].id)][
              documentsArray[i].pianoNum
            ].isUser = true;
            timetableArray[getIndexFromTime(documentsArray[i].id)][
              documentsArray[i].pianoNum
            ].YMD = documentsArray[i].selectedDate;
            timetableArray[getIndexFromTime(documentsArray[i].id)][
              documentsArray[i].pianoNum
            ].pn = documentsArray[i].pianoNum;
          }
        }

        setTimetableArray(timetableArray);
        setLists(timetableArray);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };

  useEffect(() => {
    queryfunction();
  }, [startDate]);

  const ShowList = list && (
    <ReservedList
      selectedDay={startDate}
      list={list}
      onDeleteClick={handleDeleteClick}
    />
  );

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="example-custom-input" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <>
      {isDesktopOrMobile !== true ? (
        <>
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
                    minDate={subDays(new Date(), 5)} // 과거 날짜는 선택할 수 없게 disable
                    maxDate={addDays(new Date(), 13)} // 오늘로부터 13일까지 날짜 선택 가능
                    onChange={(date) => setStartDate(date)} // 바뀐 날짜로 저장
                    renderCustomHeader={({
                      date,
                      decreaseMonth,
                      increaseMonth,
                    }) => (
                      <div className="datepickerHeader">
                        <div>
                          <img
                            onClick={decreaseMonth}
                            alt="backbutton"
                            src={process.env.PUBLIC_URL + '/img/back.png'}
                            className="h-6"
                          />
                        </div>
                        <div> {formatDate(date)}</div>
                        <div>
                          <img
                            onClick={increaseMonth}
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
                </div>
              </div>
              <div className="reservation_main_box">
                <div className="reservation_main_calendar">
                  <p id="reservation_main_box_title">- 예약현황</p>
                  {ShowList}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="reserve_container">
            <DatePicker
              className="input-datepicker" // class name
              locale={ko} // 한국어 설정
              customInput={<ExampleCustomInput />}
              selected={startDate}
              dateFormat="yyyy-MM-dd" // 데이터 포맷
              popperModifiers={{
                // 모바일 web 환경에서 화면을 벗어나지 않도록 하는 설정
                preventOverflow: {
                  enabled: true,
                },
              }}
              minDate={subDays(new Date(), 5)} // 과거 날짜는 선택할 수 없게 disable
              maxDate={addDays(new Date(), 13)} // 오늘로부터 13일까지 날짜 선택 가능
              onChange={(date) => setStartDate(date)} // 바뀐 날짜로 저장
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="datepickerHeader">
                  <div>
                    <img
                      onClick={decreaseMonth}
                      alt="달력 왼쪽 화살표"
                      src={process.env.PUBLIC_URL + '/img/back.png'}
                      className="h-6"
                    />
                  </div>
                  <div> {formatDate(date)}</div>
                  <div>
                    <img
                      onClick={increaseMonth}
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
          <div className="reservation_main_box">
            <div className="reservation_main_calendar">{ShowList}</div>
          </div>
        </>
      )}
    </>
  );
};

export default ReserveStatus;
