// import { combineReducers } from "redux";
import { createStore } from "redux";
import { LOADING_TOGGLE_ACTION, SET_EMAIL } from "./action";

const initialState = { data: "nill", showLoading: false };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        data: action.UserEmail,
      };
    case LOADING_TOGGLE_ACTION: {
      return {
        ...state,
        showLoading: action.payload,
      };
    }
    default:
      return state;
  }
};

// const SignupStoreApp = combineReducers({
//   SignupStore,
// });

export default createStore(rootReducer);
