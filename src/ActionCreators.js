export const NUMBER_CLICK_TYPE = "NUMBER_CLICK";
export const numberClick = number => ({
  type: NUMBER_CLICK_TYPE,
  payload: { value: number + "" }
});
