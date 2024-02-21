import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function RestListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const storedToken = localStorage.getItem("authToken");

  const getAllRestaurants = () => {
    axios
      .get(`${API_URL}/restaurants/read`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRestaurants();
  }, [] );

  return (
    <div className="RestListPage">
      
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <Link to={`/restaurants/read/${restaurant._id}`}>
            <h3>{restaurant.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RestListPage;
