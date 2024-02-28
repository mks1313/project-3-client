import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import Ratings from "../components/Ratings";
import MenuComponent from "../components/MenuComponent";
import Map from "../components/Map";
import "./RestDetailsPage.css";

function RestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get(`/api/restaurants/read/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setRestaurant(response.data);
      })
      .catch((error) => console.log(error));
  }, [id, storedToken]);
  if (!restaurant) {
    return <div>Cargando...</div>;
  }
  const deleteRestaurant = (id) => {
    axios
      .delete(`/api/restaurants/delete/${id}`)
      .then(() => {
        navigate("/restaurants");
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className="RestDetailPage">
      <h2>{restaurant.name}</h2>
      <hr />
      <div className="restaurant-details">
        <div className="restaurant-image">
          <img src={restaurant.image} alt="Descripción de la imagen" />
        </div>
        <div className="restaurant-info">
          <h3>Detalles del restaurante</h3>
          <p>
            <strong>Dirección:</strong> {restaurant.address.street}{" "}
            {restaurant.address.number}, {restaurant.address.city}{" "}
            {restaurant.address.postcode}
          </p>
          <p>
            <strong>Descripción:</strong> {restaurant.description}
          </p>
          <p>
            <strong>Capacidad:</strong> {restaurant.capacity}
          </p>
          <p>
            <strong>Categoría:</strong> {restaurant.category}
          </p>
          <p>
            <strong>Teléfono:</strong> {restaurant.phone}
          </p>
          <p>
            <strong>Precio:</strong> {restaurant.price}
          </p>
          <div>
            <MenuComponent menuIds={restaurant.menus} />
          </div>
          <br />
          <button onClick={() => deleteRestaurant(id)}>
            Eliminar Restaurante
          </button>
          <Link to={`/restaurants/edit/${id}`} style={{ color: "black" }}>
            <button>Editar Restaurante</button>
          </Link>
          <Ratings ratings={restaurant.ratings} />
          <Comments restaurantId={id} />
        </div>
      </div>
      <Map coordinates={restaurant.location.coordinates} />
    </div>
  );
}
export default RestDetailPage;
