import React from "react";
import Square from "./square";

const Board = ({ squares, onClick }) => (
  <div className="boBoard">
    {squares.map((square, i) => (
      <Square key={i}
        value={square}
        onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
