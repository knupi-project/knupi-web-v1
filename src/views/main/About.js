import { useState, useMemo, useEffect } from 'react';
import { useTable } from 'react-table';
import { db } from 'util/firebaseConfig';
import {
  where,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';

import { auth } from 'util/firebaseConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import { ko } from 'date-fns/esm/locale';
import { getMonth, getDate, addDays } from 'date-fns';
import moment from 'moment';
import 'moment/locale/ko';

function About() {
  //userData
  const [userData, setUserData] = useState(null);

  // getDB
  useEffect(() => {
    const getDB = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };
    getDB();
  }, []);

  // 달력 날짜 변경 시 기준점이 되는 날짜
  const [startDate, setStartDate] = useState(new Date());

  // 선택한 날짜
  const SelectedDay = moment(startDate).format('YYYY년 M월 D일');

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

  const dayReserve = [];

  // firebase 예약 데이터
  const [names, setNames] = useState([]);

  // 날짜 선택할 때 마다 쿼리함. 저번에 얘기 했을 때는 여러번 쿼리 안하자 했는데..
  useEffect(() => {
    timeArray.map(async function (time) {
      const q0 = query(
        collection(db, ':0'),
        where('reserveDateTime', '==', `${SelectedDay}_${time}`)
      );
      const q1 = query(
        collection(db, ':1'),
        where('reserveDateTime', '==', `${SelectedDay}_${time}`)
      );
      const q2 = query(
        collection(db, ':2'),
        where('reserveDateTime', '==', `${SelectedDay}_${time}`)
      );
      const q3 = query(
        collection(db, ':3'),
        where('reserveDateTime', '==', `${SelectedDay}_${time}`)
      );
      const [query0Snapshot, query1Snapshot, query2Snapshot, query3Snapshot] =
        await Promise.all([getDocs(q0), getDocs(q1), getDocs(q2), getDocs(q3)]);
      query0Snapshot.docs.map((doc) => {
        if (doc.data) {
          dayReserve.push(doc.data());
        }
      });
      query1Snapshot.docs.map((doc) => {
        if (doc.data) {
          dayReserve.push(doc.data());
        }
      });
      query2Snapshot.docs.map((doc) => {
        if (doc.data) {
          dayReserve.push(doc.data());
        }
      });
      query3Snapshot.docs.map((doc) => {
        if (doc.data) {
          dayReserve.push(doc.data());
        }
      });
      setNames(dayReserve);
    });
    // 쿼리한 문서 + document id값 해서 names에 array로 저장
  }, [startDate]);

  // 현황표에 들어가는 data
  const [data, setData] = useState([]);

  // 표 columns
  const columns = useMemo(
    () => [
      {
        Header: '예약 시간',
        accessor: 'reserveDateTime',
      },
      {
        Header: '피아노 번호',
        accessor: 'number',
      },
      {
        Header: '이름',
        accessor: 'name',
      },
      {
        Header: '사용목적',
        accessor: 'purpose',
      },
    ],
    []
  );

  // 표에 들어가는 data state에 names array를 저장
  useEffect(() => {
    setData(names);
  }, [names]);

  console.log(data);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  console.log(names);

  return (
    <div className="reservation_main" style={{ marginTop: '150px' }}>
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
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
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

      <div>
        <table
          {...getTableProps()}
          style={{
            width: '100%',
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      textAlign: 'center',
                      width: '20%',
                      borderBottom: 'solid 3px black',
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          textAlign: 'center',
                        }}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default About;
