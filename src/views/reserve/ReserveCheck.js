import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { db, auth } from 'util/firebaseConfig';
import { getDoc, doc, collection, setDoc } from 'firebase/firestore';

const Reservecheck = () => {
  const selectedTime = localStorage.getItem('start time');
  const finishTime = localStorage.getItem('end time');
  const selectedDate = localStorage.getItem('date');

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // getDB
  useEffect(() => {
    const getDB = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };
    getDB();
  }, []);

  // 사용 목적 체크박스 state
  const [purpose, setPurpose] = useState('');

  // purpose값 string으로 바꾸기
  useEffect(() => {
    if (purpose === 0) {
      setPurpose('멘토링');
    } else {
      setPurpose('개인 연습');
    }
  }, [purpose]);

  // 체크박스 1개만 체크 가능 & 체크한 값을 저장
  const checkOnlyOne = (checkThis) => {
    const checkboxes = document.getElementsByName('checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
    if (checkboxes[0].checked === true) {
      handlecheck(true);
      setPurpose(0);
    } else if (checkboxes[1].checked === true) {
      handlecheck(true);
      setPurpose(1);
    }
  };

  // submit
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const docRef = doc(
        collection(db, 'reservations', selectedDate, `${type.slice(1, 2)}번`),
        selectedTime
      );
      const reservationData = {
        name: userData.nickname,
        createdAt: Date.now(),
        reserveDateTime: `${selectedDate}_${selectedTime}`,
        purpose: purpose,
      };
      await setDoc(docRef, reservationData);
      console.log('Document written with ID: ', docRef.id);

      console.log('formSubmitHandler 실행');
      //홈페이지로 이동
      navigate(`/app/reserve/complete${type}`);
    } catch (error) {
      console.log(error.message);
    }
    // location.href = '/app/reserve';
  };

  const [imChecked, handlecheck] = useState(true);
  const { type } = useParams();

  return (
    <div className="home_check">
      <p id="home_check_title">예약 정보를 확인해주세요</p>
      <div className="home_check_info">
        <p className="home_check_name" id="home_check_subtitle">
          이름 : {userData && userData.nickname}
        </p>
        <p id="home_check_subtitle">
          예약 일시 : {selectedDate} // {selectedTime} ~ {finishTime}
        </p>
      </div>
      <p id="home_check_title">사용 목적을 입력해주세요</p>

      <div id="checkbox_div">
        <input
          type="checkbox"
          name="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
        />
        <p className="home_check_mentoring" id="home_check_subtitle">
          멘토링
        </p>
      </div>

      <div id="checkbox_div">
        <input
          type="checkbox"
          name="checkbox"
          onChange={(e) => checkOnlyOne(e.target)}
        />
        <p className="home_check_practice" id="home_check_subtitle">
          개인 연습
        </p>
      </div>
      <div className="reserve_button_div">
        <p className={'reserve_button_err_' + (imChecked ? 'off' : 'on')}>
          사용 목적을 입력해주세요!
        </p>

        <form className="menu__content__form" onSubmit={formSubmitHandler}>
          <button
            className="home_check_reserve"
            id="home_check_subtitle"
            onClick={(event) => {
              const checkboxes = document.getElementsByName('checkbox');
              if (
                checkboxes[0].checked === false &&
                checkboxes[1].checked === false
              ) {
                event.preventDefault();
                handlecheck(false);
              }
            }}
            type="submit"
          >
            예약하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservecheck;
