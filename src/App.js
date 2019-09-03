import React, { useState } from "react";
import ButtonNumber from "./ButtonNumber";
import { numberClick } from "./ActionCreators";

function App() {
  const [result] = useState("0");

  const buttonNumbers = [...Array(10).keys()].map(number => (
    <ButtonNumber
      key={`button-number-${number}`}
      number={number}
      clickHandler={() => numberClick(number)}
    />
  ));

  return (
    <div>
      <label>{result}</label>
      {buttonNumbers}
    </div>
  );
}

export default App;
