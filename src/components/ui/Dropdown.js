import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {auth} from 'util/firebaseConfig';
import {signOut} from 'firebase/auth';
import 'stylesheet/Dropdown.scss';

const Dropdown = ({isLoggedIn, setIsLoggedIn}) => {
  const navigate = useNavigate();
  const loginUser = auth.currentUser;

  const logOutHandler = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
    navigate('/home');
  };
  const dropdownHandler = (e) => {
    console.log(e.target);
    document.getElementById('dropdown-list').classList.toggle('show');
  };

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (
      !event.target.matches('.dropdown-group') &&
      !event.target.matches('.dropbtn')
    ) {
      let dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };
  return (
    <div className="dropdown">
      <div className="dropdown-group" onClick={dropdownHandler}>
        {isLoggedIn && <img src={loginUser.photoURL} alt="유저사진"></img>}
        <div className="dropbtn" />
      </div>
      <div id="dropdown-list" className="dropdown-content">
        <Link to="/profile/info">내 정보</Link>
        <Link to="/profile/reserve">내 예약</Link>
        <hr></hr>
        <Link to="#contact" onClick={logOutHandler}>
          로그아웃
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
