import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CreateRestPage.css";

const CreateRestPage = () => {
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    phone: "",
    price: "",
    description: "",
    category: "Other",
    owner: "",
    address: {
      street: "",
      number: "",
      city: "",
      postcode: "",
    },
    image: null,
  });

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
    const uploadData = new FormData();
    uploadData.append("image", file);

    axios.post(`/api/restaurants/upload`, uploadData, {
        headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(uploadResponse => {
        const newImage = uploadResponse.data.fileURlImage;
        const updatedFormData = { ...formData, image: newImage };
        setFormData(updatedFormData);
    })
    .catch(error => {
        console.log(error);
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // if (!formData.image) {
    //     console.error("La URL de la imagen no está disponible.");
    //     return;
    // }
    
    axios
      .post("/api/restaurants/create", formData, {
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
    <div className="form create-rest-form">
      <h2>New Restaurant</h2>
      <form onSubmit={handleSubmit} id="create-rest-form">
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
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
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
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="create-rest-input"
          />
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
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => handleImageChange(e)}
            className="create-rest-input"
          />
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
        <button className="edit-button" type="submit" style={{ marginRight: '20px' }}>
          Create</button>
             <button className="delete-button">
            <Link to={`/restaurants`}>Discard</Link>
          
        </button>
           </form>
    </div>
  );
};

export default CreateRestPage;
