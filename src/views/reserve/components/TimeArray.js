import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

const TimeArray = ({ startDate, type, reserveArray }) => {
  let [btnActive, setBtnActive] = useState();
  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  function getTimeFromHourMinuteString(hourMinuteString, time = new Date()) {
    const [hour, minute] = hourMinuteString.split(':');
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

  function getIndexFromTime(time) {
    const hour = time.getHours();
    const min = time.getMinutes();
    const index = (hour - 9) * 2 + (min >= '30' ? 1 : 0);
    return index;
  }

  function getTimeArray(start, end, interval) {
    let startTime = getTimeFromHourMinuteString(start);
    const endTime = getTimeFromHourMinuteString(end);
    let timeArray = [];
    const intervalMS = interval * 60 * 1000;
    while (startTime < endTime) {
      timeArray.push(startTime);
      startTime = new Date(startTime.getTime() + intervalMS);
    }
    reserveArray.forEach((data, i) => {
      const [hour, minute] = data.split(':');
      const index = (hour - 9) * 2 + (minute === '30' ? 1 : 0) - i;
      timeArray.splice(index, 1);
    });

    return timeArray;
  }
  const timeArray = getTimeArray('09:00', '24:00', 30);

  const today = new Date();
  if (startDate.getDate() === today.getDate()) {
    console.log(timeArray)
    while (getIndexFromTime(timeArray[0]) < getIndexFromTime(new Date())) {
      timeArray.splice(0, 1);
    }
  }

  return (
    <>
      {timeArray.map((item, idx) => {
        return (
          <div className="home_time_block" key={idx + 'big_button'}>
            <div
              key={idx}
              value={idx}
              className={'time-block' + (idx === btnActive ? ' active' : '')}
              onClick={toggleActive}
              tabIndex="0"
            >
              {getStringFromDate(item)}
              <Link to={`/knupi-web-v1/app/reserve/check${type}`}>
                <button
                  key={'confirm_button' + idx}
                  className="home_time_block_confirm"
                  onClick={() => {
                    localStorage.setItem('start time', getStringFromDate(item));
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
    </>
  );
};

export default TimeArray;
