/*eslint-disable no-eval */

import {
  NUMBER_CLICK_TYPE,
  SUM_CLICK_TYPE,
  SUBTRACTION_CLICK,
  CALCULATE_CLICK,
  MULTIPLICATION_CLICK,
  DIVISION_CLICK
} from "./ActionCreators";

const calculate = ({ memoryOperation, memory, input }) =>
  input && memoryOperation
    ? eval(memory + memoryOperation + input) + ""
    : input;

const reduceOperation = (state, operation) => {
  const result = calculate(state);

  if (result === "Infinity") {
    return { ...defaultState, error: "Not a number" };
  }

  return {
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

const appReducer = (state = defaultState, { type, payload }) => {
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

      return {
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

    default: {
      return { ...state, error: undefined };
    }
  }
};

export default appReducer;
