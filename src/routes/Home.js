import React from 'react';
import { auth } from 'util/firebaseConfig';
import { Link } from 'react-router-dom';
const Home = () => {
  const loginUser = auth.currentUser;

  return (
    <div className="home">
      <img src={process.env.PUBLIC_URL + '/img/Main 1.png'} alt="img" />
      <div className="home__main__text">
        <p className="home__main__title">KNUPI</p>
        <p className="home__main__subtitle">KNU PIANO CLUB</p>
        {loginUser ? (
          <>
            <Link to="/reserve" className="home__main__btn">
              Reservation
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin" className="home__main__btn">
              JOIN
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
