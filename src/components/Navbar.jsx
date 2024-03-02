import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"; 
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logOutUser(); 
    window.location.href = "/"; 
  };

  return (
    <div className="navBarDiv">
      <nav className="navbar" id="sidebar">
        <ul className="nav-ul">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/restaurants">Restaurants</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/signUp">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/login">LogIn</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/profile">Your Profile</NavLink>
              </li>
              <li className="button-logout-container">
                <button  className="button-logout" onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <NavLink to="/create">Register my restaurant</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

