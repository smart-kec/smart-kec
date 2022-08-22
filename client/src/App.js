import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/homePage";
import HomeInterface from "./interface/HomeInterface";
import Login from "./components/loginComponent";
import StudentEmailSignup from "./components/studentSignupEmailComponent";
import OTPBox from "./components/studentSignupOtpComponent";
import Signup from "./components/studentSignupDetailsComponent";
import SignupInterface from "./interface/SignupInterface";
import AdminInterface from "./interface/AdminInterface";
import AdminLogin from "./components/adminLogin";

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
          <Route path="admin" element={<AdminInterface />}>
            <Route>
              <Route path="login" element={<AdminLogin />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
