import {
  numberClick,
  sumClick,
  subtractionClick,
  multiplicationClick,
  divisionClick,
  calculateClick,
  resetClick
} from "./ActionCreators";

it("numberClick action creator exports the correct format", () => {
  expect(numberClick(1)).toMatchSnapshot();
});

it("sumClick action creator exports the correct format", () => {
  expect(sumClick()).toMatchSnapshot();
});

it("subtractionClick action creator exports the correct format", () => {
  expect(subtractionClick()).toMatchSnapshot();
});

it("multiplicationClick action creator exports the correct format", () => {
  expect(multiplicationClick()).toMatchSnapshot();
});

it("divisionClick action creator exports the correct format", () => {
  expect(divisionClick()).toMatchSnapshot();
});

it("calculateClick action creator exports the correct format", () => {
  expect(calculateClick()).toMatchSnapshot();
});

it("resetClick action creator exports the correct format", () => {
  expect(resetClick()).toMatchSnapshot();
});
