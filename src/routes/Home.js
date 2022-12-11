import React from 'react';
import {signOut} from 'firebase/auth';
import {auth} from 'util/firebaseConfig';
// import {useAuthState} from 'react-firebase-hooks/auth';
import {Link, useNavigate} from 'react-router-dom';
import Button from 'components/ui/Button/Button';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';
import 'stylesheet/Home.scss';

const Home = ({setIsLoggedIn}) => {
  const loginUser = auth.currentUser;
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    navigate('/home');
  };

  const status = loginUser ? (
    <>
      <div>로그인 유저 : {loginUser.displayName}</div>
      <div>로그인 이메일 : {loginUser.email}</div>
      <div>
        로그인 프로필 사진 : <img src={loginUser.photoURL} alt="유저사진"></img>
      </div>
      <Button onClick={logOutHandler}>로그아웃</Button>)
    </>
  ) : (
    <Link to="/signin">
      <button className="home__button"> 로그인 페이지로 이동 button</button>
    </Link>
  );

  return (
    <div className="home">
      <Navigation />
      <div className="home__title">Home</div>
      <div className="home__subtitle">subtitle</div>
      <div>로그인 상태 : {auth.currentUser ? '로그인' : '로그아웃'}</div>
      {status}
      <Footer />
    </div>
  );
};

export default Home;
