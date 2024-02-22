
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul className='nav-ul'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/signUp">SignUp</Link></li>
        <li><Link to="/login">LogIn</Link></li>
        <li><Link to="/about">About us</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
