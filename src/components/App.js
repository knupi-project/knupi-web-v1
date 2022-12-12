import React from 'react';
import {useState, useEffect} from 'react';
import {auth} from 'util/firebaseConfig';

import AppRouter from 'components/Router';
import Loader from 'components/ui/Loader';
import 'stylesheet/App.scss';

function App() {
  const [init, setInit] = useState(false); //앱 시작 전 로딩 상태 표시
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인 상태 표시

  //앱 로딩 및 인증상태 확인
  useEffect(() => {
    console.log('App.js useEffect 실행');
    auth.onAuthStateChanged((user) => {
      console.log('App.js auth.onAuthStateChanged 실행');
      // user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      // setInit(true); // init 완료. 로딩 상태 표시 해제
    });

    return () => {};
  }, []);

  useEffect(() => {
    console.log('App.js useEffect isLoggedIn 실행');
    setInit(true);
    return () => {
      setInit(false);
    };
  }, [isLoggedIn]);

  return (
    <>
      {init ? (
        <AppRouter
          auth={auth}
          isLoggedIn={isLoggedIn}
          setInit={setInit}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        (console.log('initializing...'), (<Loader />))
      )}
    </>
  );
}

export default App;
