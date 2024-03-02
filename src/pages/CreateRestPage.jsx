import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateRestPage.css";

const CreateRestPage = () => {
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      menus: [],
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/restaurants/create", formData, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(() => {
        navigate("/restaurants");
      })
      .catch((error) => {
        console.error("Error al crear el restaurante:", error);
      });
  };
  return (
    <div className="form">
      <h2>New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name of the Restaurant:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
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
        <div>
          <label>Opening Hours:</label>
          {formData.openingHours.map((day, index) => (
            <div key={index}>
              <label>{day.day}</label>
              <input
                type="time"
                value={day.open}
                onChange={(e) => {
                  const newOpeningHours = [...formData.openingHours];
                  newOpeningHours[index].open = e.target.value;
                  setFormData({ ...formData, openingHours: newOpeningHours });
                }}
              />
              <input
                type="time"
                value={day.close}
                onChange={(e) => {
                  const newOpeningHours = [...formData.openingHours];
                  newOpeningHours[index].close = e.target.value;
                  setFormData({ ...formData, openingHours: newOpeningHours });
                }}
              />
            </div>
          ))}
        </div>
        <button className="btn-create" type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default CreateRestPage;



