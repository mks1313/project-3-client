// Navbar.jsx
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import './Navbar.css';
import HomeLink from './HomeLink';
import ProfileLink from './ProfileLink';

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const imageUrl = "/image/avatarImage.jpg";

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
            <NavLink to="/restaurants">Restaurants</NavLink>
          </li>
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
          {!isLoggedIn && (
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
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/create">Register my 🍽️</NavLink>
              </li>
              <li>
                <ProfileLink />
              </li>
              <li className="button-logout-container">
                <button className="button-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;




// import { useState } from 'react';
// import './Navbar.css';

// function Navbar() {
//   const [selectedNavItem, setSelectedNavItem] = useState('m-home');

//   const handleNavItemClick = (navItemId) => {
//     setSelectedNavItem(navItemId);
//   };

//   return (
//     <nav className="menu">
//       <input
//         type="radio"
//         name="nav-item"
//         id="m-home"
//         checked={selectedNavItem === 'm-home'}
//         onChange={() => handleNavItemClick('m-home')}
//       />
//       <label htmlFor="m-home">Home</label>

//       <input
//         type="radio"
//         name="nav-item"
//         id="m-search"
//         checked={selectedNavItem === 'm-search'}
//         onChange={() => handleNavItemClick('m-search')}
//       />
//       <label htmlFor="m-search">Restaurants</label>

//       <input
//         type="radio"
//         name="nav-item"
//         id="m-notification"
//         checked={selectedNavItem === 'm-notification'}
//         onChange={() => handleNavItemClick('m-notification')}
//       />
//       <label htmlFor="m-notification">Notification</label>

//       <input
//         type="radio"
//         name="nav-item"
//         id="m-favorites"
//         checked={selectedNavItem === 'm-favorites'}
//         onChange={() => handleNavItemClick('m-favorites')}
//       />
//       <label htmlFor="m-favorites">Favorites</label>

//       <input
//         type="radio"
//         name="nav-item"
//         id="m-profile"
//         checked={selectedNavItem === 'm-profile'}
//         onChange={() => handleNavItemClick('m-profile')}
//       />
//       <label htmlFor="m-profile">Profile</label>

//       <div className="selector"></div>
//     </nav>
//   );
// }

// export default Navbar;





