/*eslint-disable no-eval */

import {
  NUMBER_CLICK_TYPE,
  SUM_CLICK_TYPE,
  SUBTRACTION_CLICK,
  CALCULATE_CLICK
} from "./ActionCreators";

const calculate = (
  { temporaryOperation, temporaryValue, value },
  currentOperation
) => {
  if (temporaryOperation === "=") {
    temporaryOperation = currentOperation;
  }

  return temporaryOperation
    ? eval(temporaryValue + temporaryOperation + value) + ""
    : value;
};

const defaultState = {
  value: "0",
  temporaryValue: undefined,
  temporaryOperation: undefined
};

const appReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case NUMBER_CLICK_TYPE: {
      const value =
        state.value === "0" ? payload.value : state.value + payload.value;
      return { ...state, value };
    }

    case CALCULATE_CLICK: {
      return {
        ...state,
        temporaryValue: calculate(state),
        temporaryOperation: "=",
        value: "0"
      };
    }

    case SUM_CLICK_TYPE: {
      return {
        ...state,
        temporaryValue: calculate(state, "+"),
        temporaryOperation: "+",
        value: "0"
      };
    }

    case SUBTRACTION_CLICK: {
      return {
        ...state,
        temporaryValue: calculate(state, "-"),
        temporaryOperation: "-",
        value: "0"
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default appReducer;
