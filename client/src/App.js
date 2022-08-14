import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Deptform from "./components/form/Deptform";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const openSidebar = () => {
    setSidebarOpen(true);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  const [values, setValues] = useState({
    deptFullName: "",
    deptAliasName: "",
    deptEmail: "",
    password: "",
    noOfSemesters: "",
  });
  const inputs = [
    {
      id: 1,
      name: "deptFullName",
      type: "text",
      placeholder: "Enter Department Full Name",
      errorMessage: "Type the Department name correctly!",
      label: "Department Full Name",
      // pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "deptAliasName",
      type: "text",
      placeholder: "Enter Department Alias Name",
      errorMessage: "Check the Alias name correctly",
      label: "Department Alias Name",
      required: true,
    },
    {
      id: 3,
      name: "deptEmail",
      type: "email",
      placeholder: "Enter Department Email",
      errorMessage: "It should be a valid email address!",
      label: "Department Email",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Enter the Password",
      errorMessage:
        "Password should be strong and it should be 8-10 characters!",
      label: "Password",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "noOfSemesters",
      type: "number",
      placeholder: "Enter the Semester Number",
      errorMessage: "Check the Semester Number",
      label: "No of Semesters",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="outer">
      <div className="container">
        <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      </div>
      <div className="dept-form">
        <form onSubmit={handleSubmit}>
          <h1 class="dept-details">Department Details</h1>
          {inputs.map((input) => (
            <Deptform
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button class="dept-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
