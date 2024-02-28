import { useState, useEffect } from "react";
import axios from "axios";
import EditProfilePage from "./EditProfilePage";
//TODO mirar, integrar token al enviar formulario
function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  const handleSubmit = (formData) => {
    axios.put('/api/users/profile', formData)
      .then((response) => {
        setUserData(response.data.user);
        alert('User profile updated successfully.');
      })
      .catch((error) => {
        console.error('Error updating user profile:', error);
        alert('An error occurred while updating user profile.');
      });
  };

  useEffect(() => {
    const fetchUserData = () => {
      axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then(response => {
          setUserData(response.data.user); 
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    };

    fetchUserData();
  }, [storedToken]);

  return (
    <div className="profile-page">
      <h1>User Profile</h1>
      {userData ? (
        <div className="user-info">
          <img src={userData.profileImage} alt="Profile" />
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Sex: {userData.sex}</p>
          <p>Birthday: {new Date(userData.birthday).toLocaleDateString()}</p>
          <p>Owner: {userData.isOwner ? 'Yes' : 'No'}</p>
          <EditProfilePage onSubmit={handleSubmit} />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default ProfilePage;

