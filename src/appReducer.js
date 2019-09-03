import { NUMBER_CLICK_TYPE } from "./ActionCreators";

const appReducer = (state = { result: "0" }, { type, payload }) => {
  switch (type) {
    case NUMBER_CLICK_TYPE: {
      const result =
        state.result === "0" ? payload.value : state.result + payload.value;
      return { ...state, result };
    }

    default: {
      return { ...state };
    }
  }
};

export default appReducer;
