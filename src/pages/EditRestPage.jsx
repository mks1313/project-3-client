import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRestPage.css";
import { Link } from "react-router-dom";

const EditRestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    name: "",
    capacity: 0,
    image: "",
    location: "", 
    phone: "",
    price: "",
    description: "",
    category: "other",
    city: "",
    postcode: "",
    openingHours: [],
  });
  
  useEffect(() => {
    axios
    .get(`/api/restaurants/read/${id}`)
    .then((response) => {
        console.log(response);
        const fetchedRestaurant = response.data;
        setRestaurant(fetchedRestaurant);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/restaurants/update/${id}`, restaurant)
      .then((response) => {
        console.log(response);
        navigate(`/restaurants/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant(prevRestaurant => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  return (
    <div className="EditRestaurantPage">
      <h3>Edit Restaurant</h3>
      <form className="EditRestForm" onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={restaurant.name}
          onChange={handleInputChange}
        />

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={restaurant.capacity}
          onChange={handleInputChange}
        />

        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={restaurant.image}
          onChange={handleInputChange}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={restaurant.location}
          onChange={handleInputChange}
        />

        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={restaurant.phone}
          onChange={handleInputChange}
        />

        <label>Price:</label>
        <input
          type="text"
          name="price"
          value={restaurant.price}
          onChange={handleInputChange}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={restaurant.description}
          onChange={handleInputChange}
        />

        <label>Category:</label>
        <select
          name="category"
          value={restaurant.category}
          onChange={handleInputChange}
        >
          <option value="italian">Italian</option>
          <option value="mexican">Mexican</option>
          <option value="chinese">Chinese</option>
          <option value="turkish">Turkish</option>
          <option value="russian">Russian</option>
          <option value="french">French</option>
          <option value="japanese">Japanese</option>
          <option value="american">American</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="fast food">Fast Food</option>
          <option value="sushi">Sushi</option>
          <option value="bbq">BBQ</option>
          <option value="indian">Indian</option>
          <option value="thai">Thai</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="brazilian">Brazilian</option>
          <option value="african">African</option>
          <option value="fusion">Fusion</option>
          <option value="other">Other</option>
          <option value="spanish">Spanish</option>
          <option value="german">German</option>
          <option value="greek">Greek</option>
        </select>

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={restaurant.city}
          onChange={handleInputChange}
        />

        <label>Postcode:</label>
        <input
          type="text"
          name="postcode"
          value={restaurant.postcode}
          onChange={handleInputChange}
        />

        <button type="submit">Update Restaurant</button> .
        <button>
          <Link to={`/restaurants/${id}`}>Discard</Link>
        </button>
      </form>
    </div>
  );
};

export default EditRestPage;
