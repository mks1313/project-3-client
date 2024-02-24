import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditRestPage.css";

const EditRestPage = () => {
    const { id } = useParams();
    
    const [restaurant, setRestaurant] = useState({});
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [image, setImage] = useState("");
    const [location, setLocation] = useState({ type: "", coordinates: [] });
    const [phone, setPhone] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("other");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [openingHours, setOpeningHours] = useState([]);
    
    const navigate = useNavigate();
    
    useEffect(() => {
      axios
        .get(`/api/restaurants/read/${id}`)
        .then((response) => {
          console.log(response);
          const fetchedRestaurant = response.data;
          setRestaurant(fetchedRestaurant);
          setName(fetchedRestaurant.name);
          setCapacity(fetchedRestaurant.capacity);
          setImage(fetchedRestaurant.image);
          setLocation(fetchedRestaurant.location);
          setPhone(fetchedRestaurant.phone);
          setPrice(fetchedRestaurant.price);
          setDescription(fetchedRestaurant.description);
          setCategory(fetchedRestaurant.category);
          setCity(fetchedRestaurant.city);
          setPostcode(fetchedRestaurant.postcode);
          setOpeningHours(fetchedRestaurant.openingHours);
        })
        .catch((error) => console.log(error));
    }, [id]);
    
    
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const updatedRestaurant = {
        name,
        capacity,
        image,
        location,
        phone,
        price,
        description,
        category,
        city,
        postcode,
        openingHours,
      };
    
      axios
        .put(`/api/restaurants/update/${id}`, updatedRestaurant)
        .then((response) => {
          console.log(response);
          navigate(`/restaurants/${id}`);
        })
        .catch((error) => console.log(error));
    };
    
    return (
      <div className="EditRestaurantPage">
        <h3>Edit Restaurant</h3>
        <form className="EditRestForm" onSubmit={handleFormSubmit}>
          <label className="edit-name">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
    
          <label className="edit-capacity">Capacity:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
    
          <label className="edit-image">Image:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
    
          <label className="edi-loc">Location:</label>
          <input
            type="text"
            value={location.type} // Modificar aquí
            onChange={(e) => setLocation({ ...location, type: e.target.value })} // Modificar aquí
          />
    
          <label className="edit-phone">Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
    
          <label className="edit-price">Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
    
          <label className="edit-description">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
    
          <label className="edit-category">Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
    
          <label className="edit-city">City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
    
          <label className="edit-postcode">Postcode:</label>
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
    
          <button className="EditButton" type="submit">
            Update Restaurant
          </button>
        </form>
      </div>
    );
}

export default EditRestPage;



