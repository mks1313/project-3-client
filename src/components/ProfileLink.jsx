
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import "./ProfileLink.css";

function ProfileLink() {
  return (
    <NavLink to="/profile" className="profile-link">
      <FaUser className="profile-icon" />
    </NavLink>
  );
}

export default ProfileLink;

