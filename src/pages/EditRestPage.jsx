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
    capacity: "",
    image: "",
    location: { type: "Point", coordinates: [0, 0] },
    phone: "",
    price: "",
    description: "",
    category: "other",
    owner: "",
    openingHours: [
      { day: "Monday", open: "", close: "" },
      { day: "Tuesday", open: "", close: "" },
      { day: "Wednesday", open: "", close: "" },
      { day: "Thursday", open: "", close: "" },
      { day: "Friday", open: "", close: "" },
      { day: "Saturday", open: "", close: "" },
      { day: "Sunday", open: "", close: "" },
    ],
    address: {
      street: "",
      number: "",
      city: "",
      postcode: "",
    },
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
    <div className="form">
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

        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={restaurant.address.street}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Number:</label>
          <input
            type="text"
            id="number"
            name="address.number"
            value={restaurant.address.number}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={restaurant.address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            id="postcode"
            name="address.postcode"
            value={restaurant.address.postcode}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Update Restaurant</button> .
        <button>
          <Link to={`/restaurants/${id}`}>Discard</Link>
        </button>
      </form>
    </div>
  );
};

export default EditRestPage;
