import React from 'react';
import { useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from 'util/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogIn } from 'util/reducer/loginSlice';
import SignInButton from 'views/auth/components/SignInButton';

setPersistence(auth, browserLocalPersistence); // 세션 유지 시 로그인 유지
const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성

const SignIn = () => {
  const [authError, setAuthError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authHandler = async () => {
    try {
      //인증정보 가지고오기
      const userCredential = await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인
      //인증정보 바탕으로 DB 회원정보 쿼리
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      //회원정보가 있다면 로그인성공, 없으면 에러 알림.
      if (!docSnap.exists()) {
        throw new Error('회원 정보가 없습니다. 회원가입 후 이용해주세요.');
      }
      setAuthError(null);
      dispatch(setLogIn());
      navigate('/knupi-web-v1');
    } catch (error) {
      setAuthError(error.message);
      signOut(auth);
    }
  };

  return (
    <>
      <div className="sign-loginbox-title">로그인</div>
      <SignInButton
        platform="구글"
        imgSrc={process.env.PUBLIC_URL + '/img/google24.png'}
        onClick={authHandler}
      />
      <div className="rq-msg">
        <span style={{ marginRight: '3px' }}>아직 계정이 없으신가요 ?</span>
        <Link to="/knupi-web-v1/auth/signup">
          <span style={{ color: 'black', fontWeight: 'bold' }}>회원가입</span>
        </Link>
      </div>
      {authError && (
        <div className="cf-msg">
          로그인 중에 문제가 발생했습니다.
          <br />
          메세지 : {authError}
        </div>
      )}
    </>
  );
};

export default SignIn;
