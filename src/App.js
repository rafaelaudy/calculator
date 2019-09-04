import React, { useState, useEffect } from "react";
import {
  numberClick,
  sumClick,
  subtractionClick,
  divisionClick,
  multiplicationClick,
  calculateClick,
  resetClick
} from "./ActionCreators";
import appReducer from "./appReducer";

function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    setState(appReducer());
  }, []);

  const clickHandler = (actionCreator, payload) => {
    const newState = appReducer(state, actionCreator(payload));
    setState(newState);
  };

  const buttonNumbers = [...Array(10).keys()].map(number => (
    <button
      key={`button-number-${number}`}
      disabled={!!state.error}
      onClick={() => clickHandler(numberClick, number)}
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
      <label>{state.error || input}</label>
      {buttonNumbers}

      <button disabled={!!state.error} onClick={() => clickHandler(sumClick)}>
        +
      </button>

      <button
        disabled={!!state.error}
        onClick={() => clickHandler(subtractionClick)}
      >
        -
      </button>
      <button
        disabled={!!state.error}
        onClick={() => clickHandler(divisionClick)}
      >
        /
      </button>
      <button
        disabled={!!state.error}
        onClick={() => clickHandler(multiplicationClick)}
      >
        *
      </button>
      <button
        disabled={!!state.error}
        onClick={() => clickHandler(calculateClick)}
      >
        =
      </button>

      <button onClick={() => clickHandler(resetClick)}>C</button>
    </div>
  );
}

export default App;
