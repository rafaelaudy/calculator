/*eslint-disable no-eval */

import {
  NUMBER_CLICK_TYPE,
  SUM_CLICK_TYPE,
  SUBTRACTION_CLICK,
  CALCULATE_CLICK,
  MULTIPLICATION_CLICK,
  DIVISION_CLICK
} from "./ActionCreators";

const calculate = ({ memoryOperation, memory, input }) => {
  return input && memoryOperation
    ? eval(memory + memoryOperation + input) + ""
    : input;
};

const reduceOperation = (state, operation) => ({
  ...state,
  memory: state.memoryOperation
    ? calculate(state)
    : state.input || state.memory,
  memoryOperation: operation,
  input: "",
  resultForDisplay: calculate(state)
});

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
      return { ...state, input };
    }

    case CALCULATE_CLICK: {
      if (!state.memoryOperation) return { ...state };

      return {
        ...state,
        memory: state.memoryOperation
          ? calculate(state)
          : state.input || state.memory,
        memoryOperation: undefined,
        input: "",
        resultForDisplay: state.memoryOperation ? calculate(state) : state.input
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
      return { ...state };
    }
  }
};

export default appReducer;
