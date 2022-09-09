export const SET_EMAIL = "SET_EMAIL";

export const setData = (email) => {
  return {
    type: SET_EMAIL,
    UserEmail: email,
  };
};
export default setData;
