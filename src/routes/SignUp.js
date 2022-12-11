import React from 'react';
import {useState} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';

import LoginButton from 'components/ui/Button/LoginButton';
import 'stylesheet/SignIn.scss';

const Auth = ({auth}) => {
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      setAuthError(null);
      await setPersistence(auth, browserSessionPersistence); // 세션 유지 시 로그인 유지
      const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성
      await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인
      authError && setAuthError(false);
      navigate('/home');
    } catch (error) {
      setAuthError(error.message);
      console.log(error.message);
    }
  };

  const loginErrorMsg = authError ? (
    <div className="cf-msg">
      로그인 에러입니다. 로그인을 다시 시도해주세요.
      <br />
      에러 로그 : {authError}
    </div>
  ) : (
    <></>
  );

  return (
    <div>
      <div className="signin">
        <div className="signin-loginbox">
          <img
            src={process.env.PUBLIC_URL + '/img/logo1.png'}
            width="236"
            height="82"
            alt="logo-signsin-title"
          />
          <div className="signin-loginbox-title">로그인</div>
          <LoginButton
            loginBy="구글"
            imgSrc={process.env.PUBLIC_URL + '/img/google24.png'}
            onClick={loginHandler}
          />
          <div className="rq-msg">
            <span style={{marginRight: '3px'}}>아직 계정이 없으신가요 ?</span>
            <span style={{color: 'black', fontWeight: 'bold'}}>회원가입</span>
          </div>
          {loginErrorMsg}
        </div>
      </div>
    </div>
  );
};

export default Auth;
