import React from "react";
import Square from "./square";

const Board = ({ squares, onClick }) => (
  <div className="bo846Board">
    {squares.map((square, squareIndex) => (
      <Square
        key={squareIndex}
        value={square}
        onClick={() => onClick(squareIndex)}
      />
    ))}
  </div>
);

export default Board;
