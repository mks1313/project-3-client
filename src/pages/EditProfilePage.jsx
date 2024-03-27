import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./EditProfilePage.css";


const API_BASE_URL = import.meta.env.VITE_API_URL;

const EditProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      axios.get(`${API_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const user = response.data.user;
        setUserData(user);
        const userBirthday = new Date(user.birthday).toISOString().split('T')[0];
        setBirthday(userBirthday);
        setName(user.name);
        setEmail(user.email);
        setSex(user.sex);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    };
  
    if (storedToken) {
      fetchUserData();
    }
  }, [storedToken]);
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const uploadData = new FormData();
    uploadData.append("image", profileImage);
    uploadData.append("name", name);
    uploadData.append("birthday", birthday);
    uploadData.append("sex", sex);
    uploadData.append("email", email);

    
     
  
    axios
      .post(`${API_BASE_URL}/users/profile/update`, uploadData, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.user);
          navigate("/profile"); 
        }
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
       
      });
  };
  
  return (
    <div className="edit-profile-page">
      <h1>Edit Profile</h1>
      {userData ? (
        <form onSubmit={handleSubmit} className="formulario-especifico">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Birthday:</label>
          <input
            type="date"
            value={birthday}
            name="birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
          <label>Sex:</label>
          <select name="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="N/A">Prefer not to say</option>
          </select>
          <label>Profile Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <button className="edit-button" type="submit" style={{ marginLeft: '60px', marginTop: '30px' }}>Save Changes</button>
            <Link to={`/profile`}>
            <button className="delete-button" style={{ marginLeft: '20px', marginTop: '30px' }}>Discard</button>
            </Link>
          
        </form>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
    </div>
  );
}

export default EditProfilePage;





