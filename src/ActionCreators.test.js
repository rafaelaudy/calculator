import { numberClick } from "./ActionCreators";

it("numberClick action creator exports the correct format", () => {
  expect(numberClick(1)).toMatchSnapshot();
});
