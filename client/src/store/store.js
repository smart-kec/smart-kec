// import { combineReducers } from "redux";
import { createStore } from "redux";

const initialState = { data: "nill" };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        data: action.UserEmail,
      };

    default:
      return state;
  }
};

// const SignupStoreApp = combineReducers({
//   SignupStore,
// });

export default createStore(rootReducer);
