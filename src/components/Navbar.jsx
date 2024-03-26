// Navbar.jsx
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";
import HomeLink from "./HomeLink";
import ProfileLink from "./ProfileLink";
import RestaurantIcon from "./RestaurantIcon"; 
import { GrRestaurant } from "react-icons/gr";
import { TbLogin2 } from "react-icons/tb";


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
            <div className="get-in-container">
              <HomeLink />
            </div>
          </li>

          <li>
            <NavLink to="/restaurants">
              <RestaurantIcon />{" "}
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
  <div className="get-in-container">
    <NavLink to="/login">
      <span>
        <TbLogin2 style={{ width: '40px', height: '40px', color: '#b0bfd8' }}/>
      </span>
    </NavLink>
  </div>
</li>

          )}
          {isLoggedIn && (
            <>
            <li>
                <NavLink to="/create">
                  Register my: <GrRestaurant style={{ width: '40px', height: '40px', color: '#b0bfd8' }}/>
                </NavLink>
              </li>

              <ul className="profile-logout">
                <li>
                  <ProfileLink />
                </li>
                <li className="button-logout-container">
                  <button className="button-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

