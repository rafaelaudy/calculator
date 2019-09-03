import React from "react";
import { shallow } from "enzyme";
import ButtonNumber from "./ButtonNumber";

it("Button is correctly loaded", () => {
  const buttonNumber = shallow(<ButtonNumber number={1} />);
  expect(buttonNumber).toMatchSnapshot();
});
