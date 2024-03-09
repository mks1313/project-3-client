import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; 
import './HomeLink.css'; 

function HomeLink() {
  return (
    <NavLink to="/" className="home-link">
      <FaHome className="home-icon" />
    </NavLink>
  );
}
export default HomeLink;
