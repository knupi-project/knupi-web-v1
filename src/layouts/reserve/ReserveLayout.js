import React from 'react';
import 'react-datepicker/dist/react-datepicker.css'; // css import
import 'moment/locale/ko';
import BackButton from 'components/UI/BackButton';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Reserve = () => {
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
  //피아노 넘버에 따라 피아노 이름 변경
  const { type } = useParams();
  const pianoNumber = type.replace(':', '');
  let pianoName = '';

  switch (pianoNumber) {
    case '0':
      pianoName = '업라이트 피아노';
      break;

    default:
      pianoName = `${pianoNumber}번 피아노`;
      break;
  }
  return (
    <>
      {isDesktopOrMobile !== true ? (
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
                <p className="home_info_subtitle">{pianoName}</p>
                <p className="home_info_time-info">🕑 진행시간 : 30분</p>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <div className="reserve_div">
          <div className="reserve_textBox">
            <p className="reserve_pianoName">{pianoName}</p>
            <p className="reserve_timeInfo">🕑 진행시간 : 30분</p>
          </div>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Reserve;
