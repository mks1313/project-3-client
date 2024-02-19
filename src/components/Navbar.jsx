import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About us</Link></li>
        <li><Link to="/SignUp">SignUp</Link></li>
        <li><Link to="/LogIn">LogIn</Link></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
