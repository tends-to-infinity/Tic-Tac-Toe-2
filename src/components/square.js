import React from "react";
import Button from "./button";

const Square = ({ value, onClick }) => {

  const style = value ? `sq219Squares ${value}` : `sq219Squares`;

  return (
    <Button
      className={style}
      value={value}
      onClick={onClick}
    />
  );
};

export default Square;
