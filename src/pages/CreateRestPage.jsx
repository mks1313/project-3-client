import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreateRestPage.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreateRestPage = () => {
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "Moloko",
    capacity: "45",
    phone: "934555666",
    price: "$",
    description: "Excelente restaurante-bar en inmediaciones de Sagrada Familia",
    category: "Other",
    owner: "",
    address: {
      street: "Balmes",
      number: "234",
      city: "Barcelona",
      postcode: "08005",
    },
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // if (!formData.image) {
    //     console.error("La URL de la imagen no está disponible.");
    //     return;
    // }
    
    axios
      .post(`${API_BASE_URL}/restaurants/create`, formData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        navigate("/restaurants");
      })
      .catch((error) => {
        console.error("Error al crear el restaurante:", error);
      });
};

  return (
    <div className="create-genral">
    <div className="form create-rest-form">
      <form onSubmit={handleSubmit} id="create-rest-form">
    <h1 className="create-h">Create Restaurant</h1>
        <div>
          <label htmlFor="name">Name of the Restaurant:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="create-rest-input"
          />
        </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
            className="create-rest-capacity"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="create-rest-capacity"
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
            className="create-rest-capacity"
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
      </div>
        <h1 className="create-h">Dirección</h1>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleInputChange}
            required
            className="create-rest-input"
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
            className="create-rest-input"
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
            className="create-rest-input"
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
            className="create-rest-input"
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
            className="create-rest-input"
          />
        </div>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="create-rest-input"
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => handleImageChange(e)}
            className="create-rest-input"
          />
        </div>
        <button className="btn-create" type="submit">
          Create Restaurant
        </button>
        <Link to={`/restaurants`}>
          <button className="btn-create" style={{ marginTop: '30px', color: "white", backgroundColor: "red" }}>Discard</button>
        </Link>
      </form>
    </div>
    <div className="preview-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '100%', marginTop: '5rem' }}>
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '200px', marginLeft: 'auto', marginRight: 'auto' }}
          />
        )}
      </div>

    </div>
  );
};

export default CreateRestPage;


       