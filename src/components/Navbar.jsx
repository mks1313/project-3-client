import { NavLink } from "react-router-dom";
import "./Navbar.css";
// import SearchBar from './SearchBar';

function Navbar() {
  return (
    <div className="navBarDiv">
      <nav className="navbar" id="sidebar">
        <ul className="nav-ul">
          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/restaurants">
              Restaurants
            </NavLink>
          </li>
          <li>
            <NavLink to="/signUp">
              SignUp
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              LogIn
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/create">
              Create Restaurant
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              Your Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
