import React, { useState } from "react";
import ButtonNumber from "./ButtonNumber";
import { numberClick } from "./ActionCreators";
import appReducer from "./appReducer";

function App() {
  const [state, setState] = useState({ result: "0" });

  const reduceAndUpdateState = (actionCreator, payload) => {
    const newState = appReducer(state, actionCreator(payload));
    setState(newState);
  };

  const buttonNumbers = [...Array(10).keys()].map(number => (
    <ButtonNumber
      key={`button-number-${number}`}
      number={number}
      clickHandler={() => reduceAndUpdateState(numberClick, number)}
    />
  ));

  return (
    <div>
      <label>{state.result}</label>
      {buttonNumbers}
    </div>
  );
}

export default App;
