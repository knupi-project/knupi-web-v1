import React from 'react';
import {useState} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {db, auth} from 'util/firebaseConfig';
import {Link, useNavigate} from 'react-router-dom';
import SignInButton from 'components/ui/Button/signInButton';
import 'stylesheet/SignIn.scss';

setPersistence(auth, browserSessionPersistence); // 세션 유지 시 로그인 유지
const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성

const SignIn = ({setIsLoggedIn}) => {
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const loginHandler = async () => {
    try {
      //인증정보 가지고오기
      const userCredential = await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인
      console.log(userCredential.user);
      //인증정보 바탕으로 DB 회원정보 쿼리
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      //회원정보가 있다면 로그인성공, 없으면 에러 알림.
      if (!docSnap.exists()) {
        throw new Error('회원 정보가 없습니다. 회원가입 후 이용해주세요.');
      } else {
        setAuthError(false);
        setIsLoggedIn(true);
        navigate('/home');
      }
    } catch (error) {
      setAuthError(error.message);
      console.log(error.message);
    }
  };

  const loginErrorMsg = authError ? (
    <div className="cf-msg">
      로그인 중에 문제가 발생했습니다.
      <br />
      메세지 : {authError}
    </div>
  ) : (
    <></>
  );

  return (
    <div className="signin">
      <div className="signin-loginbox">
        <img
          src={process.env.PUBLIC_URL + '/img/logo1.png'}
          width="236"
          height="82"
          alt="logo-signsin-title"
        />
        <div className="signin-loginbox-title">로그인</div>
        <SignInButton
          platform="구글"
          imgSrc={process.env.PUBLIC_URL + '/img/google24.png'}
          onClick={loginHandler}
        />
        <div className="rq-msg">
          <span style={{marginRight: '3px'}}>아직 계정이 없으신가요 ?</span>
          <Link to="/signup">
            <span style={{color: 'black', fontWeight: 'bold'}}>회원가입</span>
          </Link>
        </div>
        {loginErrorMsg}
      </div>
    </div>
  );
};

export default SignIn;
