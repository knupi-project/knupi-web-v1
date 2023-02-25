import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

function NavBarOffcanvas({ className, loginUser }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navLinkClickHandler = (e) => {
    handleClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="nav__togleBtn">
      <Button variant="outline-secondary" onClick={handleShow} className="me-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.5rem"
          height="1.5rem"
          fill="currentColor"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
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
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default NavBarOffcanvas;
