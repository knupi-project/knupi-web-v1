import React from 'react';
import { auth } from 'util/firebaseConfig';
import 'stylesheet/Home.scss';

const Home = () => {
  const loginUser = auth.currentUser;

  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__subtitle">subtitle</div>
      <div>로그인 상태 : {loginUser ? '로그인' : '로그아웃'}</div>
      {loginUser ? (
        <>
          <div>로그인 유저 : {loginUser.displayName}</div>
          <div>로그인 이메일 : {loginUser.email}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
