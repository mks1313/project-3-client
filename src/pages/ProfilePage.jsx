import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      axios
        .get("/api/users/profile", {
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
                const restaurants = restaurantResponses.map(
                  (restaurantResponse) => restaurantResponse.data
                );
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
    axios
      .delete("/api/users/profile/delete", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        localStorage.removeItem("authToken");
        logOutUser();
        navigate("/");
        toast.success("Profile deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting profile:", error);
        toast.error("An error occurred while deleting the profile");
      });
  };

  const cancelDeleteProfile = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="container-main" id="profile-main">
      <div className="profile-page container-main">
        <h1 id="user-card">Welcome, {userData && userData.name} </h1>
        {userData ? (
          <div className="user-info">
            <div className="user-avatar">
              <img src={userData.profileImage} alt="Profile" />
            </div>
            <div className="user-details">
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Sex:</strong> {userData.sex}</p>
              <p><strong>Birthday:</strong> {new Date(userData.birthday).toLocaleDateString()}</p>
              <p><strong>Owner:</strong> {userData.isOwner ? "Yes" : "No"}</p>
              {userData.isOwner && userData.restaurantDetails && (
                <div>
                  <p>
                    <strong>Restaurants:</strong>{" "}
                    {userData.restaurantDetails
                      .map((restaurant) => restaurant.name)
                      .join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
      ) : (
        <p className="loading-message">Loading user data...</p>
      )}
      <div className="buttons">
        <Link to="/edit-profile"
        style={{ marginRight: "20px" }}>
          <button className="edit-button">Edit Profile</button>
        </Link>
        <button className="delete-button" onClick={handleDeleteProfile}>
          Delete Profile
        </button>
        
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete your profile? This action can not be undone."
          onConfirm={confirmDeleteProfile}
          onCancel={cancelDeleteProfile}
        />
      )}
      <ToastContainer autoClose={5000} />
    </div>
    </div>
  );
};

export default ProfilePage;
