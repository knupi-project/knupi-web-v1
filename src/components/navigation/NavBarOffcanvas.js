import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { setLogout } from 'util/reducer/loginSlice';
import { auth } from 'util/firebaseConfig';

function NavBarOffcanvas({ loginUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navLinkClickHandler = (e) => {
    handleClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const logOutHandler = async () => {
    // console.log('setLogout');
    dispatch(setLogout());
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      <div id="nav__togleBtn">
        <Button
          variant="outline-secondary"
          onClick={handleShow}
          style={{
            border: 'none',
            height: '2rem',
            width: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            width="25em"
            height="25em"
            className="bi bi-chevron-down"
            src={process.env.PUBLIC_URL + '/img/menu_mobile.svg'}
            viewBox="0 0 16 16"
          />
        </Button>
        <Offcanvas
          placement="top"
          onHide={handleClose}
          show={show}
          style={{
            height: '40vh',
          }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvas__nav__title">
              KNUPI{' '}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvas__body">
            <Link
              to="/knupi-web-v1/app/home"
              className="nav__link"
              id="offcanvas__nav__link"
              onClick={navLinkClickHandler}
              autoFocus
            >
              Home
            </Link>

            <Link
              to="/knupi-web-v1/app/about"
              className="nav__link"
              id="offcanvas__nav__link"
              onClick={navLinkClickHandler}
            >
              About
            </Link>
            <Link
              to="/knupi-web-v1/app/contact"
              className="nav__link"
              id="offcanvas__nav__link"
              onClick={navLinkClickHandler}
            >
              Contact
            </Link>
            {/* reservation */}
            {!loginUser ? (
              <Link
                to="/knupi-web-v1/auth/signin"
                className="nav__link"
                id="offcanvas__nav__link"
                onClick={() => {
                  window.alert(
                    '로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.'
                  );
                }}
              >
                Reservation
              </Link>
            ) : (
              <Link
                to="/knupi-web-v1/app/reservation"
                className="nav__link"
                id="offcanvas__nav__link"
                onClick={navLinkClickHandler}
              >
                Reservation
              </Link>
            )}
            {!loginUser ? (
              <Link
                to="/knupi-web-v1/auth/signin"
                className="nav__link"
                id="offcanvas__nav__link"
                onClick={navLinkClickHandler}
                autoFocus
              >
                Log In
              </Link>
            ) : (
              <Link
                to="#logout"
                className="nav__link"
                id="offcanvas__nav__link"
                onClick={logOutHandler}
                autoFocus
              >
                Log Out
              </Link>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </div>

      <div className="mobileLogo">
        <Link to="/knupi-web-v1/app/home" onClick={navLinkClickHandler}>
          <img
            src={process.env.PUBLIC_URL + '/img/pianoimg.svg'}
            className='mobileLogoPiano'
          />
          <img
            src={process.env.PUBLIC_URL + '/img/logo_test2.svg'}
            className='mobileLogoImg'
          />
        </Link>
      </div>
      <div className="mobileLogo">
        {!loginUser ? (
          <Link to="/knupi-web-v1/auth/signin">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: '49px',
                width: '58px',
              }}
            >
              <img
                className="user-login-icon"
                src={process.env.PUBLIC_URL + '/img/user-icon.png'}
                alt="user-login-icon"
              />
            </div>
          </Link>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: '49px',
              width: '58px',
            }}
          >
            <img
              className="user-img"
              src={loginUser.photoURL}
              alt="유저사진"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default NavBarOffcanvas;
