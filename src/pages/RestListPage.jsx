import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RestListPage.css";

function RestListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`/api/restaurants/read`, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => console.log(error));
  }, [storedToken]); 

  const handleSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="RestListPage">
      <div className="search-container-restlistpage">
        <input
          className="search-input-restlistpage"
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <div className="restaurant-cards-restlistpage">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant._id} className="restaurant-card-restlistpage">
            <Link to={`/restaurants/${restaurant._id}`}>
              <div className="card-content-restlistpage">
                <h2 className="restaurant-name-restlistpage">{restaurant.name}</h2>
                <div className="image-container-restlistpage" style={{ backgroundImage: `url(${restaurant.image})` }} />
                <p className="restaurant-city-restlistpage">{restaurant.city}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestListPage;





