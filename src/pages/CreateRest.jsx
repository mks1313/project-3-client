import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateRest.css";

const CreateRest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    capacity: 0,
    image: "",
    location: { type: "Point", coordinates: [0, 0] },
    phone: "",
    price: "",
    description: "",
    category: "other",
    city: "",
    postcode: "",
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
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/restaurants/create", formData)
      .then((response) => {
        console.log("Restaurante creado exitosamente:", response.data);
        navigate(`/restaurants/${response.data._id}`);
      })
      .catch((error) => {
        console.error("Error al crear el restaurante:", error);
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = () => {
    setShowModal(false);
  };

  return (
    <div className="form">
      <h2>New Restaurante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name of the Restaurant:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
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
          <label htmlFor="description">Descriptión:</label>
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
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="postcode">Postcode:</label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
          />
        </div>

        <button onClick={() => setShowModal(true)}>Opening Hours</button>
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select Opening Hours</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Open Hours:</label>
              <input
                type="time"
                value={formData.openingHours[0].open}
                onChange={(e) => {
                  const newOpeningHours = [...formData.openingHours];
                  newOpeningHours[0].open = e.target.value;
                  setFormData({ ...formData, openingHours: newOpeningHours });
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <button type="submit">Create Restaurant</button>
      </form>
    </div>
  );
};

export default CreateRest;

