import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  signOut,
  inMemoryPersistence,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from 'util/firebaseConfig';
import SignUpButton from 'views/auth/components/SignUpButton';
import UserInfoForm from 'views/auth/components/UserInfoForm';
import FormBtn from 'views/auth/components/FormBtn';
import FormInput from 'views/auth/components/FormInput';

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const SignUp = () => {
  const [isSignUpVerified, setIsSignUpVerified] = useState(false); // 회원가입 인증 완료 여부
  const [docData, setDocData] = useState(''); // 회원가입 정보
  const [docRef, setDocRef] = useState(''); // 회원가입 정보 DB 참조
  const [authError, setAuthError] = useState(null); // 회원가입 인증 에러
  const [nickName, setNickName] = useState(''); // 회원가입 닉네임
  const [userSignUpVerfCode, setUserSignUpVerifCode] = useState(''); // 회원가입 전 유저 인증코드 입력 변수
  const [isSignUpCodeVerified, setIsSignUpCodeVerified] = useState(false); // 회원가입 전 인증코드 확인 상태
  const [imChecked, setImChecked] = useState(true); // 회원가입 전 인증코드 확인 시 메시지 출력 여부
  const [isBtnClicked, setIsBtnClicked] = useState(false); // 버튼 클릭시 중복 클릭 방지
  const navigate = useNavigate(); // 페이지 이동

  const nickChangeHandler = ({ target: { value } }) => setNickName(value);

  // 회원가입 인증 완료 시 폼 제출 핸들러
  const formSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      console.log('nickName: ', nickName);
      //회원가입 정보 DB에 저장
      await setDoc(docRef, { ...docData, nickname: nickName }, { merge: true });
      alert('회원가입이 완료되었습니다. 다시 로그인해주세요.');
      //홈페이지로 이동
      navigate('/');
      signOut(auth);
    } catch (error) {
      alert(
        `회원가입 폼 제출 중에 문제가 발생했습니다. \n 메세지 : ${error.message}`
      );
      setAuthError(error.message);
      signOut(auth);
    }
  };

  // 회원가입 인증 핸들러
  const authHandler = async () => {
    try {
      auth.signUpVerifying = true; // 회원가입 인증 중임을 업데이트 => 회원가입 인증 중에는 App.js의 onAuthStateChanged가 실행되지 않도록 함.
      setPersistence(auth, inMemoryPersistence); // 임시 인증정보 저장모드로 변경
      const signUpProvider = new GoogleAuthProvider(); // 구글 로그인 공급자 생성
      //인증정보 가지고오기
      const userCredential = await signInWithPopup(auth, signUpProvider); // 팝업창으로 구글 로그인

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
      setIsSignUpVerified(true);
    } catch (error) {
      setAuthError(error.message);
      alert(
        `회원가입 유저 인증 중에 문제가 발생했습니다. \n 메세지 : ${error.message}`
      );
      signOut(auth);
      setIsSignUpVerified(false);
      auth.signUpVerifying = false;
    }
  };

  // isSignUpVerified가 바뀔 때마다 실행되는 로직
  useEffect(() => {
    // 회원가입 인증상태가 바뀌면 실행 => isSignUpVerified에 의존적인 로직들을 실행
    // 1. SignUpVerified === false => 회원가입 인증상태 진입 시 (회원가입 페이지 진입 시) 변수 초기화
    // 2. SignUpVerified === true로 변할 시 => 회원가입 인증이 끝남을  업데이트 =>  onAuthStateChanged가 실행되도록 signUpVerifying을 false로 업데이트
    setAuthError(null);
    signOut(auth);
    auth.signUpVerifying = false;
    console.log('isSignUpVerified: ', isSignUpVerified);
    console.log('auth.signUpVerifying: ', auth.signUpVerifying);
    return () => {
      // SignUp 컴포넌트가 언마운트 될 시 => 회원가입 인증이 끝남을  업데이트 =>  onAuthStateChanged가 실행되도록 signUpVerifying을 false로 업데이트
      setAuthError(null);
      signOut(auth);
      auth.signUpVerifying = false;
    };
  }, [isSignUpVerified]);

  //TODO : 암호를 DB 쿼리할때, 암호를 암호화해서 쿼리하도록 수정해야함 => 현재 document가 그대로 노출되어있음.
  /* 회원가입 판단 코드를 DB에서 가져오는 부분 */
  const verifyingSignUpCode = async () => {
    try {
      const docRef = doc(db, 'code', '3Fj5DOM5Lr4wLWJ5wKks');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data().password;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.log('Error getting document:', error);
      return null;
    }
  };

  /* 사용자 입력 부분 회원가입 코드와 회원가입 판단 코드를 비교하는 부분 */
  const signUpVerfCodeSubmitHandler = async ({ target }) => {
    // 버튼 클릭 여부 확인
    if (isBtnClicked) return;
    // 클릭 시 버튼 비활성화
    setIsBtnClicked(true);
    target.disabled = true;
    if (userSignUpVerfCode === (await verifyingSignUpCode())) {
      setIsSignUpCodeVerified(true);
    } else {
      setImChecked(false);
    }
    return (
      // 2초 후 버튼 활성화
      timer(2000).then(() => {
        setIsBtnClicked(false);
        target.disabled = false;
      })
    );
  };

  const userInputVerfCodeChangeHandler = ({ target: { value } }) => {
    if (value === '') {
      setImChecked(true);
    }
    setUserSignUpVerifCode(value);
  };

  return (
    <>
      {!isSignUpVerified && !isSignUpCodeVerified && (
        <>
          <div style={{ marginBottom: '10px' }}>암호를 입력하세요</div>
          <FormInput
            type="text"
            title="암호"
            placeholder="암호를 입력하세요"
            onChange={userInputVerfCodeChangeHandler}
          />
          <p className={'reserve_button_err_' + (imChecked ? 'off' : 'on')}>
            올바른 암호를 입력해주세요!
          </p>
          <FormBtn title="입력하기" onClick={signUpVerfCodeSubmitHandler} />
        </>
      )}

      {!isSignUpVerified && isSignUpCodeVerified && (
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
      )}

      {isSignUpVerified && (
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
