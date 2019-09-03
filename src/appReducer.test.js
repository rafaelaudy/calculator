import { NUMBER_CLICK_TYPE, numberClick } from "./ActionCreators";
import appReducer from "./appReducer";

describe(`${NUMBER_CLICK_TYPE}`, () => {
  it("removes 0 on the start of the string when a number is added", () => {
    const newState = appReducer({ result: "0" }, numberClick("1"));
    expect(newState.result).toBe("1");
  });

  it("keep only one 0 at the beggining of the string", () => {
    const newState = appReducer({ result: "0" }, numberClick("0"));
    expect(newState.result).toBe("0");
  });

  it("concatenates the selected number correctly", () => {
    const newState = appReducer({ result: "1" }, numberClick("1"));
    expect(newState.result).toBe("11");
  });
});
