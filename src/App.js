import React from 'react';
import { useState, useEffect } from 'react';
import AppRouter from 'routes/Router';
import Loader from 'components/UI/Loader';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLogIn, setLogout } from 'util/reducer/loginSlice';
import { auth } from 'util/firebaseConfig';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

function App() {
  const [init, setInit] = useState(false); // 앱 시작 전 로딩 상태 표시]
  //TODO : GeonhaPark / reducer의 로그인 상태확인 여부로 추후에 firebase 로그인 상태확인과 통합 필요.
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // 로그인 상태 확인 - > beforeAuthStateChanged는 onAuthStateChanged가 실행되기전에 실행되는 Observer
    auth.beforeAuthStateChanged((user) => {});
    // 로그인 상태 확인 - > onAuthStateChanged는 로그인 상태가 변경될 때마다 실행됨. 한번 호출되면 계속 실행됨.
    auth.onAuthStateChanged((user) => {
      // auth.signUpVerifying 변수는 onAuthStateChange 내부 로직 실행 여부를 결정하는 변수, 선언되지 않았을 때 초기화.
      if (auth.signUpVerifying === undefined || auth.signUpVerifying === null) {
        auth.signUpVerifying = false;
      }
      // console.log(user);
      // console.log('auth.signUpVerifying : ', auth.signUpVerifying);
      /*
       auth.signUpVerifying === false : 회원가입 인증 중이 아님. auth state 변경에 따른 로그인 상태 디스패쳐 실행 가능 => 로더 동작
       auth.signUpVerifying === true : 회원가입 인증 중. 로로그인 상태 디스패쳐 실행 불가 => 로더 동작 X
       */
      if (auth.signUpVerifying === false) {
        // user는 로그인된 유저 상태로, firebase 패키지에 의해 저장됨
        // 해당 로그인 정보가 있으면 디스패쳐에 login. 없으면 로그아웃 상태로 변경
        if (user && !isLoggedIn) dispatch(setLogIn());
        if (!user && isLoggedIn) dispatch(setLogout());
      }
    });
  }, []);

  // login 상태변수에 따른 앱 로더 동작
  useEffect(() => {
    // console.log(
    //   `current user info:`,
    //   auth.currentUser,
    //   `login status:`,
    //   isLoggedIn
    // );
    // 0.5초 후에 init 상태를 true로 변경
    timer(500).then(() => {
      // init 완료. 로딩 상태 표시 해제
      setInit(true);
    });
    return () => {
      //언마운트시 로더 표시
      setInit(false);
    };
  }, [isLoggedIn]);

  return <>{init ? <AppRouter /> : <Loader />}</>;
}

export default App;
