export const NUMBER_CLICK_TYPE = "NUMBER_CLICK";
export const numberClick = number => ({
  type: NUMBER_CLICK_TYPE,
  payload: { input: number + "" }
});

export const SUM_CLICK_TYPE = "SUM_CLICK";
export const sumClick = () => ({
  type: SUM_CLICK_TYPE
});

export const SUBTRACTION_CLICK = "SUBTRACTION_CLICK";
export const subtractionClick = () => ({
  type: SUBTRACTION_CLICK
});

export const MULTIPLICATION_CLICK = "MULTIPLICATION_CLICK";
export const multiplicationClick = () => ({
  type: MULTIPLICATION_CLICK
});

export const DIVISION_CLICK = "DIVISION_CLICK";
export const divisionClick = () => ({
  type: DIVISION_CLICK
});

export const CALCULATE_CLICK = "CALCULATE_CLICK";
export const calculateClick = () => ({
  type: CALCULATE_CLICK
});

export const RESET_CLICK = "RESET_CLICK";
export const resetClick = () => ({
  type: RESET_CLICK
});
