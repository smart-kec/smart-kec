export const SET_EMAIL = "SET_EMAIL";
export const LOADING_TOGGLE_ACTION = "LOADING_ACTION";
export const setData = (email) => {
  return {
    type: SET_EMAIL,
    UserEmail: email,
  };
};

export const loadingPage = (status) => {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
};
