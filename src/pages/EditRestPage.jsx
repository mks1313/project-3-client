import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRestPage.css";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const EditRestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("authToken");

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
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
      .get(`${API_BASE_URL}/restaurants/read/${id}`, {
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

    // Crear FormData para enviar los datos del restaurante + imagen
    const uploadData = new FormData();
    
    // Añadir todos los campos del formulario
    uploadData.append("name", formData.name);
    uploadData.append("capacity", formData.capacity);
    uploadData.append("phone", formData.phone);
    uploadData.append("price", formData.price);
    uploadData.append("description", formData.description);
    uploadData.append("category", formData.category);
    uploadData.append("address.street", formData.address.street);
    uploadData.append("address.number", formData.address.number);
    uploadData.append("address.city", formData.address.city);
    uploadData.append("address.postcode", formData.address.postcode);

    // Si hay una imagen, añadirla al FormData
    if (image) {
      uploadData.append("image", image);
    }

    // Realizar la solicitud PUT
    axios
      .put(`${API_BASE_URL}/restaurants/update/${id}`, uploadData, {
        headers: { 
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "multipart/form-data" 
        },
      })
      .then(() => {
        navigate(`/restaurants/${id}`);
      })
      .catch((error) => {
        console.log("Error updating restaurant:", error);
      });
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
    <div className="create-genral">
      <div className="form create-rest-form">
        <form className="EditRestForm" onSubmit={handleFormSubmit}>
          <h1 className="create-h">Edit Restaurant</h1>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Capacity:</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="create-rest-input"
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
                <option value="spanish">Spanish</option>
                <option value="german">German</option>
                <option value="greek">Greek</option>
              </select>
            </div>
          </div>
          <h1 className="create-h">Address</h1>
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
          <div className="form-row">
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
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
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
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            className="btn-create"
            type="submit"
            style={{ marginRight: "20px", marginTop: "20px" }}
          >
            Update Restaurant
          </button>
          <Link to={`/restaurants/${id}`}>
            <button className="btn-create btn-discart">Discard</button>
          </Link>
        </form>
      </div>
      <div
        className="image-preview"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
          marginTop: "5rem",
        }}
      >
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              border: "5px solid gray",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EditRestPage;
