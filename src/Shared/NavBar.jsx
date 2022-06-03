import { useContext } from "react";
import AppContext from "../Context/AppContext";
import "../SCSS/NavBar.scss";
import { FaGraduationCap } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function NavBar() {
  const { loggedUser, logOut } = useContext(AppContext);

  return (
    <div className="navbar">
      <div className="logo">
        <div className="icon">
          <FaGraduationCap />
        </div>
        <NavLink to="/" className="company-name">
          MyBootcamp
        </NavLink>
      </div>
      <div className="user-info">
        <span className="user-name">
          {loggedUser.firstName} {loggedUser.lastName}
        </span>
        <button className="btn-sm" onClick={logOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default NavBar;
