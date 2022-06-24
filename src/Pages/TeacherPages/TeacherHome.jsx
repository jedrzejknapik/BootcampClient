import "../../SCSS/HomePage.scss";
import { FaScroll, FaUser, FaListOl, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function TeacherHome() {
  return (
    <div className="page">
      <div className="bar-info">You are logged as a lecturer.</div>
      <div className="user-menu">
        <div className="menu-item">
          <div className="menu-item-icon">
            <FaUser />
          </div>
          <NavLink className="menu-item-link" to="user/new">
            <span>Register student</span>
          </NavLink>
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <FaListOl />
          </div>
          <NavLink className="menu-item-link" to="grades">
            <span>Manage grades</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default TeacherHome;
