import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RestListPage.css";

function RestListPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/restaurants/read`)
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="RestListPage">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="restaurant-card">
          <Link to={`/restaurants/${restaurant._id}`}>
            <div className="card-content">
              <h2 className="restaurant-name">{restaurant.name}</h2>
              <div className="image-container" style={{ backgroundImage: `url(${restaurant.image})` }} />
              <p className="restaurant-city">{restaurant.city}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RestListPage;

