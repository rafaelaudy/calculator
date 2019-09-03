import React, { useState } from "react";
import { numberClick, sumClick } from "./ActionCreators";
import appReducer from "./appReducer";

function App() {
  const [state, setState] = useState({ value: "0" });

  const reduceAndUpdateState = (actionCreator, payload) => {
    const newState = appReducer(state, actionCreator(payload));
    setState(newState);
  };

  const buttonNumbers = [...Array(10).keys()].map(number => (
    <button
      key={`button-number-${number}`}
      onClick={() => reduceAndUpdateState(numberClick, number)}
    >
      {number}
    </button>
  ));

  const value =
    state.value === "0" && state.temporaryValue
      ? state.temporaryValue
      : state.value;

  return (
    <div>
      <label>{value}</label>
      {buttonNumbers}
      <button onClick={() => reduceAndUpdateState(sumClick)}>+</button>
      <button onClick={() => reduceAndUpdateState(sumClick)}>-</button>
      <button onClick={() => reduceAndUpdateState(sumClick)}>/</button>
      <button onClick={() => reduceAndUpdateState(sumClick)}>*</button>
    </div>
  );
}

export default App;
