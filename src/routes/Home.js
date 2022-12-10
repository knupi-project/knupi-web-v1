import Button from 'components/ui/Button';
import React from 'react';
import {signOut} from 'firebase/auth';
import {Link, useNavigate} from 'react-router-dom';
import 'stylesheet/Home.scss';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';

const Home = ({auth, setInit}) => {
  const loginUser = auth.currentUser;
  const navigate = useNavigate();

  const logOutHandler = async () => {
    await setInit(false);
    signOut(auth);
    navigate('/home');
  };

  const status = loginUser ? (
    <>
      <div>로그인 유저 : {loginUser.displayName}</div>
      <div>로그인 이메일 : {loginUser.email}</div>
      <div>
        로그인 프로필 사진 : <img src={loginUser.photoURL} alt="유저사진"></img>
      </div>
      <Button onClick={logOutHandler}>로그아웃</Button>)<Footer></Footer>
    </>
  ) : (
    <Link to="/auth">
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
