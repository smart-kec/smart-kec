import { useState } from "react";
import DashboardSidebar from "./../components/Dashboard/DashboardSidebarComponent";
import DashboardNavbar from "./../components/Dashboard/DashboardNavbarComponent";
import NewDepartment from "./../components/Department/NewDepartmentComponent";

const AdminDashboard = () => {
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
      errorMessage: "Check the Department name correctly!",
      label: "Department Full Name",
      // pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "deptAliasName",
      type: "text",
      placeholder: "Enter Department Alias Name",
      errorMessage: "Check the Alias name correctly!",
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
        "Password should be 8-10 characters,must have uppercase,lowercase and atleast 2 numbers and no spaces!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "noOfSemester",
      type: "number",
      placeholder: "Enter the Semester Number",
      errorMessage: "Check your semester number correctly! ",
      label: "No of Semester",
      required: true,
      min: 1,
      max: 8,
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
        <DashboardNavbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
        <div className="dept-form">
          <form onSubmit={handleSubmit}>
            <h1 class="dept-details">Department Details</h1>
            {inputs.map((input) => (
              <NewDepartment
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button class="dept-btn">Submit</button>
          </form>
        </div>
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          closeSidebar={closeSidebar}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
