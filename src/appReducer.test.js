import {
  NUMBER_CLICK_TYPE,
  numberClick,
  SUM_CLICK_TYPE,
  sumClick,
  SUBTRACTION_CLICK,
  subtractionClick,
  calculateClick
} from "./ActionCreators";
import appReducer from "./appReducer";

describe("Calc operations used in conjuction", () => {
  it("Always use the stored operation to do the calculation", () => {
    let state = appReducer({ value: "0" }, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, subtractionClick());
    expect(state.temporaryValue).toBe("10");
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, sumClick());
    expect(state.temporaryValue).toBe("5");
  });

  it("Can continue operations after using the calculate function", () => {
    let state = appReducer({ value: "0" }, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, calculateClick());
    expect(state.temporaryValue).toBe("10");
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, calculateClick());
    expect(state.temporaryValue).toBe("15");
  });
});

describe("Exception scenarios", () => {
  it("should ignore inexting types", () => {
    const newState = appReducer(undefined, { type: "INEXISTING" });
    expect(newState).toEqual({
      value: "0",
      temporaryValue: undefined,
      temporaryOperation: undefined
    });
  });
});

describe(`${NUMBER_CLICK_TYPE}`, () => {
  it("removes 0 on the start of the string when a number is added", () => {
    const newState = appReducer({ value: "0" }, numberClick("1"));
    expect(newState.value).toBe("1");
  });

  it("keeps only one 0 at the beggining of the string", () => {
    const newState = appReducer({ value: "0" }, numberClick("0"));
    expect(newState.value).toBe("0");
  });

  it("concatenates the selected number correctly", () => {
    const newState = appReducer({ value: "1" }, numberClick("1"));
    expect(newState.value).toBe("11");
  });
});

[
  {
    type: SUM_CLICK_TYPE,
    method: sumClick,
    operation: "+",
    result: "5"
  },
  {
    type: SUBTRACTION_CLICK,
    method: subtractionClick,
    operation: "-",
    result: "-1"
  }
].map(scenario => {
  describe(scenario.type, () => {
    it("clears current value and store as temporary", () => {
      const newState = appReducer({ value: "5" }, scenario.method());
      expect(newState.value).toBe("0");
      expect(newState.temporaryValue).toBe("5");
    });

    it("stores operation as +", () => {
      const newState = appReducer({}, scenario.method());
      expect(newState.temporaryOperation).toBe(scenario.operation);
    });

    it(`calculates ${scenario.operation} in case a temporary value and operation are present`, () => {
      const newState = appReducer(
        {
          value: "3",
          temporaryValue: "2",
          temporaryOperation: scenario.operation
        },
        scenario.method()
      );
      expect(newState.temporaryValue).toBe(scenario.result);
      expect(newState.temporaryOperation).toBe(scenario.operation);
      expect(newState.value).toBe("0");
    });
  });
});
