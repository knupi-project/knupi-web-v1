import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db, auth } from 'util/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';

const Reservecheck = () => {
  const selectedTime = localStorage.getItem('start time');
  const finishTime = localStorage.getItem('end time');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getDB = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      setUserData(docSnap.data());
    };
    getDB();
  }, []);

  return (
    <div className="home_check">
      <p id="home_check_title">예약이 완료되었습니다</p>
      <div className="home_check_info">
        <p className="home_check_name" id="home_check_subtitle">
          이름 : {userData && userData.nickname}
        </p>
        <p className="home_check_time" id="home_check_subtitle">
          예약 시간 : {selectedTime} ~ {finishTime}
        </p>
      </div>

      <div className="reserve_button_div">
        <Link to={`/`}>
          <button
            className="home_check_reserve"
            id="home_check_subtitle"
            type="submit"
          >
            확인
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Reservecheck;
