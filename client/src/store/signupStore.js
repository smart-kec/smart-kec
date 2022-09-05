// import { combineReducers } from "redux";
const SET_EMAIL = "SET_EMAIL";

export const storeEmail = (UserEmail) => {
  console.log("Store Data");
  console.log(UserEmail);
  return {
    type: SET_EMAIL,
    UserEmail,
  };
};

const defaultStore = { UserEmail: "gandhamathanv.20cse@kongu.edu", age: "20" };

const SignupStoreApp = (state = defaultStore, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        userEmail: action.UserEmail,
      };

    default:
      return state;
  }
};

// const SignupStoreApp = combineReducers({
//   SignupStore,
// });

export default SignupStoreApp;
