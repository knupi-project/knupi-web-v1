import React from 'react';
import { useState, useEffect } from 'react';
import AppRouter from 'Router';
import Loader from 'components/UI/Loader';
import { useSelector } from 'react-redux';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

function App() {
  const [init, setInit] = useState(false); //앱 시작 전 로딩 상태 표시
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  // useEffect(() => {
  //   console.log('App.js useEffect 실행');
  //   auth.onAuthStateChanged((user) => {
  //     console.log('App.js auth.onAuthStateChanged 실행');
  //     user ? dispatch(setLogIn()) : dispatch(setLogout());
  //     setInit(true); // init 완료. 로딩 상태 표시 해제
  //   });
  //   return () => {};
  // }, []);

  //앱 로딩 및 인증상태 확인
  useEffect(() => {
    console.log('App.js useEffect isLoggedIn 실행');

    timer(500).then(() => {
      setInit(true);
    }); // init 완료. 로딩 상태 표시 해제
    return () => {
      setInit(false);
    };
  }, [isLoggedIn]);

  return <>{init ? <AppRouter /> : <Loader />}</>;
}

export default App;
