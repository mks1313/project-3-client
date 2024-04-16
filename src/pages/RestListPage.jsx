import  { useState, useEffect } from "react";
import axios from "axios";
import "./RestListPage.css";
import AnimatedCards from "../components/AnimatedCards";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function RestListPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/restaurants/read`, { headers: { Authorization: `Bearer ${storedToken}` } })
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
    <div className="RestListPage container-main ">
    
      <div className="search-container-restlistpage">
        <input
          className="search-input-restlistpage"
          type="text"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <AnimatedCards restaurants={filteredRestaurants} />
    </div>
  );
}

export default RestListPage;






