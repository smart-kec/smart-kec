import { Outlet } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";
import SignupStoreApp from "../store/signupStore";

const signupStore = createStore(SignupStoreApp);

const SignupInterface = () => {
  return (
    <>
      <Provider store={signupStore}>
        <Outlet />
      </Provider>
    </>
  );
};

export default SignupInterface;
