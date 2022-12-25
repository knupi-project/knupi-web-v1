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
        {loginUser ? (
          <>
            <Link
              to="/reserve"
              className="home__main__btn"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Reservation
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signin"
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
