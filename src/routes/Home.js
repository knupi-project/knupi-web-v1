import Button from 'components/ui/Button';
import React from 'react';
import {signOut} from 'firebase/auth';
import {useHistory} from 'react-router-dom';

const Home = ({auth, setInit}) => {
  console.log(auth);
  const loginUser = auth.currentUser;
  const history = useHistory();
  const logOutHandler = async () => {
    await setInit(false);
    signOut(auth);
    history.push('/auth');
  };
  return (
    <div>
      Home
      <div>로그인 유저 : {loginUser.displayName}</div>
      <div>로그인 이메일 : {loginUser.email}</div>
      <div>
        로그인 프로필 사진 : <img src={loginUser.photoURL} alt="유저사진"></img>
      </div>
      <Button onClick={logOutHandler}>로그아웃</Button>
    </div>
  );
};

export default Home;
