import { useState, useEffect } from "react";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("authToken");

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
                setUserData(user); // Aunque haya ocurrido un error, establecemos userData con el usuario sin los detalles de los restaurantes
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
    </div>
  );
  
}

export default ProfilePage;
