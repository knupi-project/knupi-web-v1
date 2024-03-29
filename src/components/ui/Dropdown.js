import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from 'util/firebaseConfig';
import { signOut } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { setLogout } from 'util/reducer/loginSlice';
import 'stylesheet/Dropdown.scss';

const Dropdown = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const logOutHandler = async () => {
    // console.log('setLogout');
    // dispatch(setLogout());
    await signOut(auth);
    navigate('/');
  };

  const onClickHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const elements = document.getElementsByClassName('nav__link');
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.remove('selected');
    }
  };

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (
      !event.target.matches('.dropdown-group') &&
      !event.target.matches('.dropbtn') &&
      !event.target.matches('.user-img') &&
      !event.target.matches('.nav__usermenu')
    ) {
      const dropdowns = document.getElementsByClassName('dropdown-content');
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-group">
        <div className="dropbtn" />
      </div>
      <div id="dropdown-list" className="dropdown-content">
        <Link
          to={`/knupi-web-v1/app/profile/:${auth.currentUser.email}/info`}
          onClick={onClickHandler}
        >
          내 정보
        </Link>
        <Link
          to={`/knupi-web-v1/app/profile/:${auth.currentUser.email}/reserve`}
          onClick={onClickHandler}
        >
          내 예약
        </Link>
        <hr></hr>
        <Link to="#logout" onClick={logOutHandler}>
          로그아웃
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
