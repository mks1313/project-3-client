import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import Ratings from "../components/Ratings";
import MenuComponent from "../components/MenuComponent";
import "./RestDetailsPage.css";
import ConfirmationDialog from "../components/ConfirmationDialog";

function RestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const storedToken = localStorage.getItem("authToken");
  const [showConfirmation, setShowConfirmation] = useState(false);
  
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
  const handleDeleteRestaurant = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteRestaurant = () => {
    axios
      .delete(`/api/restaurants/delete/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/restaurants");
      })
      .catch((err) => console.log(err));
  };

  const cancelDeleteRestaurant = () => {
    setShowConfirmation(false);
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
          <button onClick={() => handleDeleteRestaurant(id)}>
            Eliminar Restaurante
          </button>
          <Link to={`/restaurants/edit/${id}`} style={{ color: "black" }}>
            <button>Editar Restaurante</button>
          </Link>
          <Ratings ratings={restaurant.ratings} />
          <Comments restaurantId={id} />
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message="¿Estás seguro de que quieres eliminar este restaurante? Esta acción no se puede deshacer."
          onConfirm={confirmDeleteRestaurant}
          onCancel={cancelDeleteRestaurant}
        />
      )}
    </div>
  );
}
export default RestDetailPage;
