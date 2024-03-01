import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";
import ConfirmationDialog from "../components/ConfirmationDialog";


const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      axios.get("/api/users/profile", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const user = response.data.user;
        if (user.isOwner && user.restaurant.length > 0) {
          const restaurantPromises = user.restaurant.map((restaurantId) => {
            return axios.get(`/api/restaurants/read/${restaurantId}`, {
              headers: { Authorization: `Bearer ${storedToken}` },
            });
          });

          Promise.all(restaurantPromises)
          .then((restaurantResponses) => {
            const restaurants = restaurantResponses.map((restaurantResponse) => restaurantResponse.data);
            user.restaurantDetails = restaurants;
            setUserData(user);
          })
          .catch((error) => {
            console.error("Error fetching restaurant data:", error);
            setUserData(user);
          });
        } else {
          setUserData(user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    };

    if (storedToken) {
      fetchUserData();
    }
  }, [storedToken]);

  const handleDeleteProfile = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteProfile = () => {
    axios.delete('/api/users/profile/delete', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        localStorage.removeItem('authToken');
        logOutUser(); 
        navigate("/"); 
      })
      .catch(error => {
        console.error('Error deleting profile:', error);
      });
  };

  const cancelDeleteProfile = () => {
    setShowConfirmation(false);
  };

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
          {userData.isOwner && userData.restaurantDetails && (
            <div>
              <p>Restaurants: {userData.restaurantDetails.map((restaurant) => restaurant.name).join(', ')}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
      <Link to="/edit-profile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={handleDeleteProfile}>Delete Profile</button>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete your profile? This action can not be undone."
          onConfirm={confirmDeleteProfile}
          onCancel={cancelDeleteProfile}
        />
      )}
    </div>
  );
}

export default ProfilePage;


