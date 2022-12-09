import React from 'react';
import {useState, useEffect} from 'react';
import {getAuth} from 'firebase/auth';
import firebaseApp from 'util/firebaseConfig';
import AppRouter from 'components/Router';
import Loader from 'components/ui/Loader';
import 'stylesheet/App.scss';

function App() {
  const [init, setInit] = useState(false); //앱 시작 전 로딩 상태 표시
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태 표시

  const auth = getAuth(firebaseApp); //파이어베이스 인증 객체 기록

  //앱 로딩 및 인증상태 확인
  useEffect(() => {
    console.log('App.js useEffect 실행');
    auth.onAuthStateChanged((user) => {
      console.log('App.js auth.onAuthStateChanged 실행');
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true); // init 완료. 로딩 상태 표시 해제
    });
    return () => {};
  }, [auth]);

  return (
    <>
      {init ? (
        <AppRouter auth={auth} isLoggedIn={isLoggedIn} setInit={setInit} />
      ) : (
        (console.log('initializing...'), 'Initializing...', (<Loader />))
      )}
    </>
  );
}

export default App;
