import React, { useEffect, useState } from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    console.error(error);
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>{timeLeft}초 뒤 메인페이지로 이동합니다. </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
