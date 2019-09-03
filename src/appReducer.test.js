import {
  NUMBER_CLICK_TYPE,
  numberClick,
  SUM_CLICK_TYPE,
  sumClick
} from "./ActionCreators";
import appReducer from "./appReducer";

describe(`${NUMBER_CLICK_TYPE}`, () => {
  it("removes 0 on the start of the string when a number is added", () => {
    const newState = appReducer({ value: "0" }, numberClick("1"));
    expect(newState.value).toBe("1");
  });

  it("keep only one 0 at the beggining of the string", () => {
    const newState = appReducer({ value: "0" }, numberClick("0"));
    expect(newState.value).toBe("0");
  });

  it("concatenates the selected number correctly", () => {
    const newState = appReducer({ value: "1" }, numberClick("1"));
    expect(newState.value).toBe("11");
  });
});

describe(`${SUM_CLICK_TYPE}`, () => {
  it("clears current value", () => {
    const newState = appReducer(
      { value: "5", temporaryValue: "1" },
      sumClick()
    );
    expect(newState.value).toBe("0");
  });

  it("sum current value with the temporary one", () => {
    const newState = appReducer(
      { value: "5", temporaryValue: "1" },
      sumClick()
    );
    expect(newState.temporaryValue).toBe("6");
  });

  it("if no temporary value is stored, value is stored as temporary", () => {
    const newState = appReducer(
      { value: "5", temporaryValue: undefined },
      sumClick()
    );
    expect(newState.temporaryValue).toBe("5");
  });
});
