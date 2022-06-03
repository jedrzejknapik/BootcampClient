import "../SCSS/HomePage.scss";
import { FaScroll, FaDollarSign, FaListOl, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <div className="page">
      <div className="user-menu">
        <div className="menu-item">
          <div className="menu-item-icon">
            <FaScroll />
          </div>
          <NavLink className="menu-item-link" to="enrollments">
            <span>My enrollments</span>
          </NavLink>
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <FaDollarSign />
          </div>
          <NavLink className="menu-item-link" to="payments">
            <span>My payments</span>
          </NavLink>
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <FaListOl />
          </div>
          <NavLink className="menu-item-link" to="grades">
            <span>My grades</span>
          </NavLink>
        </div>
        <div className="menu-item">
          <div className="menu-item-icon">
            <FaSearch />
          </div>
          <NavLink className="menu-item-link" to="courses">
            <span>Browse courses</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
