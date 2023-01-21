import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Reservecheck = () => {
  const selectedTime = localStorage.getItem('key');

  useEffect(() => {
    const keyData = localStorage.getItem('key');
    !keyData && alert('예약 시간이 없습니다. 예약 페이지로 이동합니다.');
    return () => {

    };
  }, []);

  return (
    <div className="home_check">
      <p id="home_check_title">예약이 완료되었습니다</p>
      <div className="home_check_info">
        <p className="home_check_name" id="home_check_subtitle">
          이름 : {}
        </p>
        <p className="home_check_time" id="home_check_subtitle">
          예약 시간 : {selectedTime} ~ {selectedTime}
        </p>
      </div>

      <div className="reserve_button_div">
        <Link to={`/`}>
          <button
            className="home_check_reserve"
            id="home_check_subtitle"
            type="submit"
          >
            확인
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Reservecheck;
