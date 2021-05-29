import React from "react";

const Square = ({ value, onClick }) => {
  console.log(`${value}`);
  const style = value ? `sqSquares ${value}` : `sqSquares`;

  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
