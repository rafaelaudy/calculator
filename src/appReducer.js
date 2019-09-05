/*eslint-disable no-eval */

import {
  NUMBER_CLICK_TYPE,
  SUM_CLICK_TYPE,
  SUBTRACTION_CLICK,
  CALCULATE_CLICK,
  MULTIPLICATION_CLICK,
  DIVISION_CLICK,
  RESET_CLICK
} from "./ActionCreators";

const calculate = ({ memoryOperation, memory, input }) => {
  let result;

  if (input && memoryOperation) {
    const temporaryResult = eval(memory + memoryOperation + input);
    result = Math.round(temporaryResult * 100) / 100 + "";
  } else {
    result = input;
  }

  if (result === "Infinity") {
    return { error: "Not a number" };
  }

  if (memoryOperation && result === "") {
    return { error: "Bad calc" };
  }

  if (!insideCalculatorLimits(result, memoryOperation)) {
    return { error: "Out of limits" };
  }

  return { result: result };
};

const insideCalculatorLimits = (result = "0", memoryOperation) => {
  const resultAfterLimits = Math.min(
    Math.max(parseFloat(result), -999999999),
    999999999
  );
  return memoryOperation && Number(resultAfterLimits) !== Number(result)
    ? false
    : true;
};

const reduceOperation = (state, operation) => {
  const { result, error } = calculate(state);

  return {
    ...state,
    memory: state.memoryOperation ? result : state.input || state.memory,
    memoryOperation: operation,
    input: "",
    resultForDisplay: result,
    error
  };
};

const defaultState = {
  input: "",
  resultForDisplay: undefined,
  memory: undefined,
  memoryOperation: undefined
};

const appReducer = (state = defaultState, { type, payload } = {}) => {
  switch (type) {
    case NUMBER_CLICK_TYPE: {
      const input =
        state.input === "" ? payload.input : state.input + payload.input;
      return { ...state, input, error: undefined };
    }

    case CALCULATE_CLICK: {
      if (!state.memoryOperation) return { ...state };

      const { result, error } = calculate(state);

      return {
        ...state,
        memory: result,
        memoryOperation: undefined,
        input: "",
        resultForDisplay: result,
        error: error
      };
    }

    case SUM_CLICK_TYPE: {
      return reduceOperation(state, "+");
    }

    case SUBTRACTION_CLICK: {
      return reduceOperation(state, "-");
    }

    case MULTIPLICATION_CLICK: {
      return reduceOperation(state, "*");
    }

    case DIVISION_CLICK: {
      return reduceOperation(state, "/");
    }

    case RESET_CLICK: {
      return { ...defaultState };
    }

    default: {
      return { ...state, error: undefined };
    }
  }
};

export default appReducer;
