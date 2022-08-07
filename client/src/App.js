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

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      {/* <h1>Smart KEC</h1> */}
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <Deptform />
    </div>
  );
};

export default App;
