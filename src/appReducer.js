import { NUMBER_CLICK_TYPE, SUM_CLICK_TYPE } from "./ActionCreators";

const appReducer = (
  state = { value: "0", temporaryValue: undefined },
  { type, payload }
) => {
  switch (type) {
    case NUMBER_CLICK_TYPE: {
      const value =
        state.value === "0" ? payload.value : state.value + payload.value;
      return { ...state, value };
    }

    case SUM_CLICK_TYPE: {
      return {
        ...state,
        temporaryValue: state.temporaryValue
          ? Number(state.temporaryValue) + Number(state.value) + ""
          : state.value,
        value: "0"
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default appReducer;
