import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("App is correctly loaded", () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});
