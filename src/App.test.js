import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import appReducer from "./appReducer";
import {
  numberClick,
  sumClick,
  subtractionClick,
  divisionClick,
  multiplicationClick,
  calculateClick,
  resetClick
} from "./ActionCreators";

jest.mock("./appReducer", () => jest.fn());

beforeEach(() => {
  jest.clearAllMocks();
  appReducer.mockReturnValue({});
});

afterAll(() => {
  jest.unmock("./appReducer");
});

it("App is correctly loaded", () => {
  const app = shallow(<App />);
  expect(app).toMatchSnapshot();
});

it("Numbers buttons are working correctly", () => {
  const app = shallow(<App />);
  const buttons = app.find("button");
  const state = {};

  [...Array(10).keys()].map(index => {
    buttons.at(index).simulate("click");

    expect(appReducer).toHaveBeenLastCalledWith(state, numberClick(index));
  });

  expect(appReducer).toHaveBeenCalledTimes(10);
});

it("Operation buttons are working correctly", () => {
  const app = shallow(<App />);
  const buttons = app.find("button");
  const state = {};

  buttons.at(10).simulate("click");
  expect(appReducer).toHaveBeenLastCalledWith(state, sumClick());

  buttons.at(11).simulate("click");
  expect(appReducer).toHaveBeenLastCalledWith(state, subtractionClick());

  buttons.at(12).simulate("click");
  expect(appReducer).toHaveBeenLastCalledWith(state, divisionClick());

  buttons.at(13).simulate("click");
  expect(appReducer).toHaveBeenLastCalledWith(state, multiplicationClick());

  buttons.at(14).simulate("click");
  expect(appReducer).toHaveBeenLastCalledWith(state, calculateClick());

  buttons.at(15).simulate("click");
  expect(appReducer).toHaveBeenLastCalledWith(state, resetClick());

  expect(appReducer).toHaveBeenCalledTimes(6);
});

it("shows calculated values", () => {
  appReducer.mockReturnValue({ resultForDisplay: "One million", input: "" });
  const app = mount(<App />);
  app.update();
  expect(app).toMatchSnapshot();
});

it("shows error messages and block inputs", () => {
  appReducer.mockReturnValue({ error: "Random" });
  const app = mount(<App />);
  app.update();
  expect(app).toMatchSnapshot();
});
