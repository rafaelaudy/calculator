import React, { useState } from "react";
import {
  numberClick,
  sumClick,
  subtractionClick,
  divisionClick,
  multiplicationClick,
  calculateClick
} from "./ActionCreators";
import appReducer from "./appReducer";

function App() {
  const [state, setState] = useState({ input: "" });

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

  const input =
    state.input === "" && state.resultForDisplay
      ? state.resultForDisplay
      : state.input;

  return (
    <div>
      <label>{input}</label>
      {buttonNumbers}
      <button onClick={() => reduceAndUpdateState(sumClick)}>+</button>
      <button onClick={() => reduceAndUpdateState(subtractionClick)}>-</button>
      <button onClick={() => reduceAndUpdateState(divisionClick)}>/</button>
      <button onClick={() => reduceAndUpdateState(multiplicationClick)}>
        *
      </button>
      <button onClick={() => reduceAndUpdateState(calculateClick)}>=</button>
    </div>
  );
}

export default App;
