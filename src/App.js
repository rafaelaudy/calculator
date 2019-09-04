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
import "./App.css";

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
      className="app__button"
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
    <div className="app">
      <div className="app__result-container">
        <label className="app__result">{state.error || input}</label>
        <button
          className="app__button"
          onClick={() => clickHandler(resetClick)}
        >
          C
        </button>
      </div>

      <div className="app__buttons-container">
        <div className="app__number-container">{buttonNumbers}</div>
        <div className="app__operation-container">
          <button
            className="app__button"
            disabled={!!state.error}
            onClick={() => clickHandler(sumClick)}
          >
            +
          </button>

          <button
            className="app__button"
            disabled={!!state.error}
            onClick={() => clickHandler(subtractionClick)}
          >
            -
          </button>
          <button
            className="app__button"
            disabled={!!state.error}
            onClick={() => clickHandler(divisionClick)}
          >
            /
          </button>
          <button
            className="app__button"
            disabled={!!state.error}
            onClick={() => clickHandler(multiplicationClick)}
          >
            *
          </button>
          <button
            className="app__button"
            disabled={!!state.error}
            onClick={() => clickHandler(calculateClick)}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
