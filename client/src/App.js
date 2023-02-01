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
// import Testing from "./pages/Testing";
import LoadingComponent from "./components/LoadingPage/LoadingComponent";

  
import CreateOrganizer from "./components/createOrganizerComponent";
import Add from "./components/AddHod/Front"
import Display from "./components/Display"

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


        <Route path="testing" element={<LoadingComponent />}></Route>

      Temporary Routes 

        <Route path="createOrganizer" element={<CreateOrganizer />} />
      </Routes>
      <Routes>
      <Route path="Add" element={<Add />} />
      </Routes>
      <Routes>
        <Route path="Display"element={<Display/>}/> 
       

      </Routes>
    </>
  );
}

export default App;
