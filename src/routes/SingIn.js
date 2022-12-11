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
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      setAuthError(false);
      //인증정보 가지고오기
      await setPersistence(auth, browserSessionPersistence); // 세션 유지 시 로그인 유지
      const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성
      await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인
      if (!authError) {
        //인증정보 바탕으로 DB 회원정보 쿼리
        let userExists = '';
        //회원정보가 있다면 로그인성공
        userExists = false;
        //회원정보가 없으면 없다고 알림.
        !userExists && new Error('회원 정보가 없습니다.');

        //로그인 정보가 없다고 에러메시지 작성
      } else {
        setAuthError(false);
      }
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
