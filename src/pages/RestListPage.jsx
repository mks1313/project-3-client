import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "antd";
import Carousel from "../components/Carousel";
import "./RestListPage.css"

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
      <Carousel>
        {restaurants.map((restaurant) => (
          <div key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>
              <Card title={restaurant.name} style={{ width: 300, margin: 5 }}>
                <div className="image-container" style={{ backgroundImage: `url(${restaurant.image})` }} />
                <p>{restaurant.city}</p>
              </Card>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default RestListPage;
