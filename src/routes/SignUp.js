import React from 'react';
import {useState} from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {db, auth} from 'util/firebaseConfig';
import {Link, useNavigate} from 'react-router-dom';
import SignUpButton from 'components/ui/Button/signUpButton';
import 'stylesheet/SignIn.scss';

setPersistence(auth, browserSessionPersistence); // 세션 유지 시 로그인 유지
const provider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성

const SignUp = () => {
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  const signUpHandler = async () => {
    try {
      //인증정보 가지고오기
      const userCredential = await signInWithPopup(auth, provider); // 팝업창으로 구글 로그인
      console.log(userCredential.user);
      //인증정보 바탕으로 DB 회원정보 쿼리
      const docRef = doc(db, 'users', userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      //회원정보가 있다면 회원가입 중지
      if (docSnap.exists())
        throw new Error('이미 가입하신 계정입니다. 로그인 해주세요.');
      //DB에 회원정보 추가
      const docData = {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        timestamp: serverTimestamp(),
      };
      await setDoc(docRef, docData, {merge: true});
      setIsSignUpSuccess(true);
    } catch (error) {
      setAuthError(error.message);
      console.log(error.message);
    }
  };

  const errorMsg = authError ? (
    <div className="cf-msg">
      회원가입에 실패했습니다.
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
        <div className="signin-loginbox-title">회원가입</div>
        {!isSignUpSuccess ? (
          <>
            <SignUpButton
              platform="구글"
              imgSrc={process.env.PUBLIC_URL + '/img/google24.png'}
              onClick={signUpHandler}
            />
            <div className="rq-msg">
              <span style={{marginRight: '3px'}}>이미 계정이 있으신가요 ?</span>
              <Link to="/signin">
                <span style={{color: 'black', fontWeight: 'bold'}}>로그인</span>
              </Link>
            </div>
            {errorMsg}
          </>
        ) : (
          <>
            <div>회원가입에 성공했습니다.</div>
            <Link to="/signin">
              <span style={{color: 'black', fontWeight: 'bold'}}>
                로그인 페이지로
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
