import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const imageUrl = "/image/avatarImage.jpg";
  const homeImage = "/image/restaurant.png";

  const handleLogout = () => {
    logOutUser();
    window.location.href = "/";
  };

  return (
    <div className="navBarDiv">
      <nav className="navbar" id="sidebar">
        <ul className="nav-ul">
        <li>
                <div className="get-in-container">
                  <NavLink to="/">
                    <img
                      src={homeImage}
                      alt="homeImage"
                      className="get-in-image"
                    />
                    Nyam Nyam
                  </NavLink>
                </div>
              </li>
          <li>
            <NavLink to="/restaurants">Restaurants</NavLink>
          </li>
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <div className="get-in-container">
                  <NavLink to="/login">
                    <img
                      src={imageUrl}
                      alt="Get In"
                      className="get-in-image"
                    />
                  </NavLink>
                </div>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/profile">Your Profile</NavLink>
              </li>
              <li className="button-logout-container">
                <button className="button-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
              <li>
                <NavLink to="/create">Register my restaurant</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
