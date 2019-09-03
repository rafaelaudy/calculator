import React from "react";

const ButtonNumber = ({ number, clickHandler }) => (
  <button onClick={clickHandler}>{number}</button>
);

export default ButtonNumber;
