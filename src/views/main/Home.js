import React from 'react';
import { auth } from 'util/firebaseConfig';
import { Link } from 'react-router-dom';
const Home = () => {
  const loginUser = auth.currentUser;

  return (
    <div className="home">
      {/* <img src={process.env.PUBLIC_URL + '/img/Main 1.png'} alt="img" /> */}
      <div className="home__main">
        <span className="home__main__title">KNUPI</span>
        <span className="home__main__subtitle">KNU PIANO CLUB</span>
        <img className="home__main__noticeImg" src={process.env.PUBLIC_URL + '/notice/piano_concert_250402.jpg'}/>
        <span className="home__main__noticeText1">The 4th KNUPI piano concert</span>
        <span className="home__main__noticeText2">25.04.02 19:00</span>
        <span className="home__main__noticeText2">대구 문화센터 어울림홀</span>

        {loginUser ? (
          <>
            <span className="home__main__explainbtn">피아노 예약하기</span>
            <Link
              to="/knupi-web-v1/app/reservation"
              className="home__main__btn"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                const elements = document.getElementsByClassName('nav__link');
                for (let i = 0; i < elements.length; i++) {
                  elements[i].classList.remove('selected');
                }
              }}
            >
              Reservation
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/knupi-web-v1/auth/signin"
              className="home__main__btn"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              JOIN
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
