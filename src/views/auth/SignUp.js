import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from 'util/firebaseConfig';
import { useDispatch } from 'react-redux';
import SignUpButton from 'views/auth/components/SignUpButton';
import UserInfoForm from 'views/auth/components/UserInfoForm';
import FormBtn from 'views/auth/components/FormBtn';
import FormInput from 'views/auth/components/FormInput';

setPersistence(auth, browserSessionPersistence); // 세션 유지 시 로그인 유지
const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성

const SignUp = () => {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [docData, setDocData] = useState('');
  const [docRef, setDocRef] = useState('');
  const [authError, setAuthError] = useState(null);
  const [nickName, setNickName] = useState('');
  const navigate = useNavigate();
  //eslint-disable-next-line
  const dispatch = useDispatch();

  const nickChangeHandler = ({ target: { value } }) => setNickName(value);

  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log('nickName: ', nickName);
      //회원가입 정보 DB에 저장
      await setDoc(docRef, { ...docData, nickname: nickName }, { merge: true });
      alert('회원가입이 완료되었습니다. 다시 로그인해주세요.');
      //홈페이지로 이동
      navigate('/');
    } catch (error) {
      setAuthError(error.message);
      signOut(auth);
    }
  };

  const authHandler = async () => {
    try {
      //인증정보 가지고오기
      const userCredential = await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인

      //인증정보 바탕으로 DB 회원정보 쿼리
      const tempDocRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(tempDocRef);

      //회원정보가 있다면 회원가입 중지
      if (docSnap.exists())
        throw new Error('이미 가입하신 계정입니다. 로그인 해주세요.');

      //State에 회원정보 임시 저장
      setDocRef(tempDocRef);
      setDocData({
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        timestamp: serverTimestamp(),
      });
      setIsSignUpSuccess(true);
    } catch (error) {
      setAuthError(error.message);
      signOut(auth);
    }
  };

  useEffect(() => {
    setAuthError(null);
    signOut(auth);
    return () => {
      setAuthError(null);
      signOut(auth);
    };
  }, [isSignUpSuccess]);

  return (
    <>
      {!isSignUpSuccess ? (
        <>
          <div className="sign-loginbox-title">회원가입</div>
          <SignUpButton
            platform="구글"
            imgSrc={process.env.PUBLIC_URL + '/img/google24.png'}
            onClick={authHandler}
          />
          <div className="rq-msg">
            <span style={{ marginRight: '3px' }}>이미 계정이 있으신가요 ?</span>
            <Link to="/knupi-web-v1/auth/signin">
              <span style={{ color: 'black', fontWeight: 'bold' }}>로그인</span>
            </Link>
          </div>
        </>
      ) : (
        <>
          <UserInfoForm onSubmit={formSubmitHandler} platform="구글">
            <FormInput
              type="text"
              title="이름"
              placeholder="이름을 입력하세요"
              onChange={nickChangeHandler}
            />
            <FormBtn title="회원가입" />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '320px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              회원가입을 누르면 첫 화면으로 이동합니다.
              <br /> 다시 로그인해주세요.
            </div>
          </UserInfoForm>
        </>
      )}
      {authError && (
        <div className="cf-msg">
          회원가입에 실패했습니다.
          <br />
          메세지 : {authError}
        </div>
      )}
    </>
  );
};

export default SignUp;
