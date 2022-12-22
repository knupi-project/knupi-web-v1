import React from 'react';
import { useParams } from 'react-router-dom';
const ReservePage = () => {
  const { id } = useParams();
  return (
    <div className="home">
      ReservePage
      <div>{id}</div>
    </div>
  );
};

export default ReservePage;
