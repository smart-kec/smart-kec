import "../../assets/styles/css/DashboardSidebar.css";
import logo from "../../assets/images/logo.jpg";
const DashboardSidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div className={sidebarOpen ? "sidebar-responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={logo} alt="logo" />
          <h1>Smart KEC</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSidebar()}
        ></i>
      </div>
      <div className="side__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home"></i>
          <a href="#">Dashboard</a>
        </div>
        <h2 class="h2">Student</h2>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Department</a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Class </a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Lab/Halls Booking</a>
        </div>

        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Department</a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Class </a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#"> Lab/Halls Booking</a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Admin </a>
        </div>
        <h2 class="h2">Lab/Halls</h2>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Department</a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Class </a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#"> Lab/Hall Booking</a>
        </div>
        <div className="side__link">
          <i className="fa fa-user-secret"></i>
          <a href="#">Admin </a>
        </div>

        <div className="sidebar__logout">
          <i className="fa fa-sign-out"></i>
          <a href="#">LOG OUT </a>
        </div>
      </div>
    </div>
  );
};
export default DashboardSidebar;
