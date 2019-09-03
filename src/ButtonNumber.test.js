import React from "react";
import { shallow } from "enzyme";
import ButtonNumber from "./ButtonNumber";

it("Button is correctly loaded", () => {
  const buttonNumber = shallow(<ButtonNumber number={1} />);
  expect(buttonNumber).toMatchSnapshot();
});

it("Button click is correctly invoked", () => {
  const clickHandler = jest.fn();
  const buttonNumber = shallow(
    <ButtonNumber number={1} clickHandler={clickHandler} />
  );

  buttonNumber.find("button").simulate("click");

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
