// EditProfilePage.js

import { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfilePage.css";
import { useNavigate, Link } from "react-router-dom";


const EditProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sex, setSex] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((response) => {
          setUserData(response.data.user);
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
  
    // Aquí obtienes los valores actualizados del formulario
    const updatedData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      birthday: event.target.birthday.value,
      sex: event.target.sex.value,
      image: profileImage,
    };
  
    // Realiza la solicitud PUT al backend para actualizar el perfil
    axios
      .put("/api/users/profile/update", updatedData, {
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
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Save Changes</button>
          <button className=" btn">
          <Link to={`/profile`}>Discard</Link>
        </button>
        </form>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
    </div>
  );
}

export default EditProfilePage;




