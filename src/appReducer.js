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
  if (input && memoryOperation) {
    const result = eval(memory + memoryOperation + input);
    return Math.round(result * 100) / 100 + "";
  } else {
    return input;
  }
};

const checkCalculatorLimits = (result = "0", memoryOperation) => {
  const resultAfterLimits = Math.min(
    Math.max(parseFloat(result), -999999999),
    999999999
  );
  if (memoryOperation && Number(resultAfterLimits) !== Number(result)) {
    return { ...defaultState, error: "Out of limits" };
  }
};

const reduceOperation = (state, operation) => {
  const result = calculate(state);

  if (result === "Infinity") {
    return { ...defaultState, error: "Not a number" };
  }

  const error = checkCalculatorLimits(result, state.memoryOperation);

  return error
    ? error
    : {
        ...state,
        memory: state.memoryOperation ? result : state.input || state.memory,
        memoryOperation: operation,
        input: "",
        resultForDisplay: result,
        error: undefined
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

      const result = calculate(state);
      if (result === "Infinity") {
        return { ...defaultState, error: "Not a number" };
      }

      const error = checkCalculatorLimits(result, state.memoryOperation);

      return error
        ? error
        : {
            ...state,
            memory: result,
            memoryOperation: undefined,
            input: "",
            resultForDisplay: result,
            error: undefined
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
