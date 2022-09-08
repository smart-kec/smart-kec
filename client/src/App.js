import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/homePage";
import HomeInterface from "./interface/HomeInterface";
import Login from "./components/loginComponent";
import StudentEmailSignup from "./components/StudentSignup/studentSignupEmailComponent";
import OTPBox from "./components/StudentSignup/studentSignupOtpComponent";
import Signup from "./components/StudentSignup/studentSignupDetailsComponent";
import SignupInterface from "./interface/SignupInterface";
import AdminInterface from "./interface/AdminInterface";
import AdminLogin from "./components/adminLogin";
import Dashboard from "./pages/Dashboard";
import Testing from "./pages/Testing";
// import { Provider } from "react-redux";
// import { createStore } from "redux";
// import SignupStoreApp from "./store/signupStore";

// const signupStore = createStore(SignupStoreApp);

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />}>
          <Route path="" element={<HomeInterface />} />
          <Route path="signup" element={<SignupInterface />}>
            <Route>
              <Route path="email" element={<StudentEmailSignup />} />
              <Route path="verify" element={<OTPBox />} />
              <Route path="details" element={<Signup />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<AdminInterface />}>
            <Route>
              <Route path="login" element={<AdminLogin />} />
              <Route path="dept" element={<Dashboard />} />
            </Route>
          </Route>
        </Route>

        <Route path="testing" element={<Testing />}></Route>
      </Routes>
    </>
  );
}

export default App;
