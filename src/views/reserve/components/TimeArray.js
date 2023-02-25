import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';

const TimeArray = ({ startDate, type }) => {
  let [btnActive, setBtnActive] = useState();
  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
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
              <Link to={`/app/reserve/check${type}`}>
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