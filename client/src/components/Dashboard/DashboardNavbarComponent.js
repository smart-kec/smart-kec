import "../../assets/styles/css/DashboardNavbar.css";
// import user from "../../assets/images/user.png";
const DashboardNavbar = ({ sidebarOpen, openSidebar }) => {
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars"></i>
      </div>
      <div className="navbar__left">
        <h1>Hello AANANDHENE...!</h1>
      </div>
      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>
        {/* <a href="#">
          <img width="30" src={user} alt="adminlogo" />
        </a> */}
      </div>
    </nav>
  );
};
export default DashboardNavbar;
