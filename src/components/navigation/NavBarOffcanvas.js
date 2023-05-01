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
    console.log('setLogout');
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
            // border: 'none',
            height: '49px',
            width: '58px',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.1rem"
            height="1.1rem"
            fill="currentColor"
            className="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
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
              KNU KNUPI{' '}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body
            style={{
              display: 'flex',
              flexDirection: 'column',
              textDecoration: 'none',
              textDecorationLine: 'None',
              color: '#424141',
            }}
          >
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
            src={process.env.PUBLIC_URL + '/img/logo1.png'}
            width="160"
            height="56"
            alt="logo-signsin-title"
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
