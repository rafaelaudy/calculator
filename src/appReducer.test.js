import {
  NUMBER_CLICK_TYPE,
  numberClick,
  SUM_CLICK_TYPE,
  sumClick,
  SUBTRACTION_CLICK,
  subtractionClick,
  calculateClick,
  MULTIPLICATION_CLICK,
  multiplicationClick,
  divisionClick,
  RESET_CLICK,
  resetClick
} from "./ActionCreators";
import appReducer from "./appReducer";

describe("Can chain operations", () => {
  it("can isolated operations", () => {
    let state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("10");
    state = appReducer(state, numberClick("1"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("1"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("2");
  });

  it("can chain multiple operations in sequence", () => {
    let state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, subtractionClick());
    expect(state.resultForDisplay).toBe("10");
    state = appReducer(state, numberClick("2"));
    state = appReducer(state, sumClick());
    expect(state.resultForDisplay).toBe("8");
  });

  it("Can chain result calculations and operations in sequence", () => {
    let state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("3"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("13");
    state = appReducer(state, subtractionClick());
    state = appReducer(state, numberClick("3"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("10");
  });
});

describe("Exception scenarios", () => {
  it("Should restrict the length of numbers calculated", () => {
    let state = appReducer({ input: "" }, numberClick("999999999"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("2"));
    state = appReducer(state, calculateClick());
    expect(state.error).toBe("Out of limits");

    state = appReducer({ input: "" }, numberClick("999999999"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("2"));
    state = appReducer(state, sumClick());
    expect(state.error).toBe("Out of limits");
  });

  it("Should only have a precision of two", () => {
    let state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, divisionClick());
    state = appReducer(state, numberClick("3"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("1.67");
  });

  it("Should show not a number string when divided by 0", () => {
    let state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, divisionClick());
    state = appReducer(state, numberClick("0"));
    state = appReducer(state, calculateClick());
    expect(state.error).toBe("Not a number");

    state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, divisionClick());
    state = appReducer(state, numberClick("0"));
    state = appReducer(state, divisionClick());
    expect(state.error).toBe("Not a number");
  });

  it("should ignore inexting types", () => {
    const newState = appReducer(undefined, { type: "INEXISTING" });
    expect(newState).toEqual({
      input: "",
      memory: undefined,
      memoryOperation: undefined
    });
  });

  it("Should ignore multiple result calculatios", () => {
    let state = appReducer({ input: "" }, numberClick("5"));
    state = appReducer(state, sumClick());
    state = appReducer(state, numberClick("5"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("10");
    state = appReducer(state, calculateClick());
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("10");
    state = appReducer(state, subtractionClick());
    state = appReducer(state, numberClick("3"));
    state = appReducer(state, calculateClick());
    expect(state.resultForDisplay).toBe("7");
  });
});

describe(`${NUMBER_CLICK_TYPE}`, () => {
  it("removes 0 on the start of the string when a number is added", () => {
    const newState = appReducer({ input: "" }, numberClick("1"));
    expect(newState.input).toBe("1");
  });

  it("keeps only one 0 at the beggining of the string", () => {
    const newState = appReducer({ input: "" }, numberClick("0"));
    expect(newState.input).toBe("0");
  });

  it("concatenates the selected number correctly", () => {
    const newState = appReducer({ input: "1" }, numberClick("1"));
    expect(newState.input).toBe("11");
  });
});

describe(`${RESET_CLICK}`, () => {
  it("resets the state", () => {
    const newState = appReducer(
      { input: "10", resultForDisplay: "150", error: "random" },
      resetClick()
    );
    expect(newState.input).toBe("");
    expect(newState.resultForDisplay).toBe(undefined);
    expect(newState.error).toBe(undefined);
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
  },
  {
    type: MULTIPLICATION_CLICK,
    method: multiplicationClick,
    operation: "*",
    result: "6"
  }
].map(scenario => {
  describe(scenario.type, () => {
    it("clears current input and store as temporary", () => {
      const newState = appReducer({ input: "5" }, scenario.method());
      expect(newState.input).toBe("");
      expect(newState.memory).toBe("5");
    });

    it("stores operation as +", () => {
      const newState = appReducer({}, scenario.method());
      expect(newState.memoryOperation).toBe(scenario.operation);
    });

    it(`calculates ${scenario.operation} in case a temporary input and operation are present`, () => {
      const newState = appReducer(
        {
          input: "3",
          memory: "2",
          memoryOperation: scenario.operation
        },
        scenario.method()
      );
      expect(newState.memory).toBe(scenario.result);
      expect(newState.memoryOperation).toBe(scenario.operation);
      expect(newState.input).toBe("");
    });
  });
});
