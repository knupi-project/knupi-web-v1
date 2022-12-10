import React from 'react';
import {useState} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import Button from 'components/ui/Button';
import {useNavigate} from 'react-router-dom';

const Auth = ({auth}) => {
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();

  const loginHandler = async () => {
    try {
      await setPersistence(auth, browserSessionPersistence); // 세션 유지 시 로그인 유지
      const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성
      await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인
      loginError && setLoginError(false);
      navigate('/home');
    } catch (error) {
      setLoginError(error);
      alert(error.message);
    }
  };

  return (
    <div>
      Auth
      <Button onClick={loginHandler}>구글로 로그인</Button>
      <div>{loginError}</div>
    </div>
  );
};

export default Auth;
