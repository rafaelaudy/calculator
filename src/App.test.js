import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("App is correctly loaded", () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});

describe("integration tests", () => {
  it("App, ButtonNumbers and Reducers are correctly connected", () => {
    const app = shallow(<App />);
    expect(app.find("label").text()).toBe("0");
    app
      .find("button")
      .at(1)
      .simulate("click");
    expect(app.find("label").text()).toBe("1");
  });
});
