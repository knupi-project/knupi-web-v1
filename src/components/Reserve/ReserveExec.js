import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from 'util/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updatePianoList } from 'util/reducer/pianoSlice';
import Loader from 'components/UI/Loader';

const ReserveExec = () => {
  const [piano, setPianoList] = useState(
    useSelector((state) => state.piano.pianoInfo)
  );
  const dispatch = useDispatch();
  const loginUser = auth.currentUser;

  useEffect(() => {
    if (!piano) {
      const getPianoInfo = async () => {
        //인증정보 바탕으로 DB 회원정보 쿼리
        const docRef = doc(db, 'piano', 'info');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(updatePianoList(docSnap.data().pianoList));
          setPianoList(docSnap.data());
        }
      };
      getPianoInfo();
    }
    return () => {
      setPianoList(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="reservation_main_explanation">
        <p className="reservation_main_title">피아노 종류를 선택해주세요</p>
        <p className="reservation_main_subtitle">Choose the Piano</p>
      </div>
      <div className="piano_card_box">
        {piano &&
          piano.pianoList.map((element, index) => {
            return (
              <div className="piano_card" key={index}>
                <span className="piano_card_title">{element.name}</span>
                <span className="piano_card_time">
                  🕑 진행 시간 : {element.time}
                </span>
                <span className="piano_card_subtitle">
                  {element.name} 예약하기
                </span>
                <p className="piano_card_btn">
                  {loginUser && (
                    <Link
                      to={`/reserve/page:${loginUser.email}`}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      예약하기
                    </Link>
                  )}
                  {!loginUser && (
                    <Link
                      to="/login"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      로그인
                    </Link>
                  )}
                </p>
              </div>
            );
          })}
        {!piano && <Loader></Loader>}
      </div>
    </>
  );
};

export default ReserveExec;
