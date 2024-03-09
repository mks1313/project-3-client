import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRestPage.css";
import { Link } from "react-router-dom";

const EditRestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    image: "",
    phone: "",
    price: "",
    description: "",
    category: "other",
    owner: "",
    address: {
      street: "",
      number: "",
      city: "",
      postcode: "",
    },
  });

  useEffect(() => {
    axios
      .get(`/api/restaurants/read/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const fetchedRestaurant = response.data;
        setFormData(fetchedRestaurant);
      })
      .catch((error) => console.log(error));
  }, [id, storedToken]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/restaurants/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate(`/restaurants/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parent]: {
          ...prevFormData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="form">
      <h1>Edit Restaurant</h1>
      <form className="EditRestForm" onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            className="create-rest-input"
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="create-rest-input"
          >
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Chinese">Chinese</option>
            <option value="Turkish">Turkish</option>
            <option value="Russian">Russian</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="American">American</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Fast food">Fast Food</option>
            <option value="Sushi">Sushi</option>
            <option value="BBQ">BBQ</option>
            <option value="Indian">Indian</option>
            <option value="Thai">Thai</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Brazilian">Brazilian</option>
            <option value="African">African</option>
            <option value="Fusion">Fusion</option>
            <option value="Other">Other</option>
            <option value="Spanish">Spanish</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
          </select>
        </div>

        <div>
          <label htmlFor="street">Street:</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={formData.address.street}
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
            value={formData.address.number}
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
            value={formData.address.city}
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
            value={formData.address.postcode}
            onChange={handleInputChange}
          />
        </div>

        <button className=" btn-create" type="submit">
          Update Restaurant
        </button>
        <button className="discard-btn">
          <Link to={`/restaurants/${id}`}>Discard</Link>
        </button>
      </form>
    </div>
  );
};

export default EditRestPage;
