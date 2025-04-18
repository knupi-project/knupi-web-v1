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
        <img className="home__main__noticeImg" src={process.env.PUBLIC_URL + '/img/piano_wallpaper0418.jpg'}/>
        <span className="home__main__subtitle">KNU PIANO CLUB</span>

        {loginUser ? (
          <>
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
