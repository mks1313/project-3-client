import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Comments from "../components/Comments";
import Ratings from "../components/Ratings";
// import MenuComponent from "../components/MenuComponent";
import "./RestDetailsPage.css";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { AuthContext } from "../context/auth.context";

function RestDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [restaurant, setRestaurant] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const storedToken = localStorage.getItem("authToken");
  const [averageRating, setAverageRating] = useState(0);

  const handleAverageRatingChange = (newAverageRating) => {
    setAverageRating(newAverageRating);
  };

  useEffect(() => {
    axios
      .get(`/api/restaurants/read/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const restaurantData = response.data;

        if (user && restaurantData.owner === user._id) {
          // console.log("El usuario puede editar el restaurante.");
        }

        setRestaurant(restaurantData);
      })
      .catch((error) => console.log(error));
  }, [id, storedToken, user]);

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
    <div className="RestDetailPage container-main">
      {restaurant && (
        <>
          <h3 id="rest-name">{restaurant.name}</h3>
          <div className="restaurant-details">
            <div className="section">
              <div className="restaurant-image">
                <img src={restaurant.image} alt="Restaurant" />
              </div>
              {user && user._id === restaurant.owner && (
                <div className="buttons">
                  <button
                    className="delete-button"
                    onClick={handleDeleteRestaurant}
                  >
                    Delete restaurant
                  </button>
                  <Link
                    to={`/restaurants/edit/${id}`}
                    style={{ color: "black", marginLeft: "20px" }}
                  >
                    <button className="edit-button">Edit Restaurant</button>
                  </Link>
                </div>
              )}
              {showConfirmation && (
                <ConfirmationDialog
                  message="Are you sure you want to delete this restaurant? This action can not be undone."
                  onConfirm={confirmDeleteRestaurant}
                  onCancel={cancelDeleteRestaurant}
                />
              )}
              <br />
              <Ratings
                restaurantId={restaurant._id}
                totalVotes={restaurant.ratings.length}
                averageRating={averageRating}
                onAverageRatingChange={handleAverageRatingChange}
              />
            </div>
            <div className="section restaurant-info-container">
              <div className="restaurant-info">
                <p>
                  <strong>
                    <span style={{ color: "black" }}>Dirección:</span>
                  </strong>{" "}
                  {restaurant.address.street} {restaurant.address.number},{" "}
                  {restaurant.address.city} {restaurant.address.postcode}
                </p>

                <p>
                  <strong>
                    <span style={{ color: "black" }}>Capacity:</span>
                  </strong>{" "}
                  {restaurant.capacity}
                </p>
                <p>
                  <strong>
                    <span style={{ color: "black" }}>Category:</span>
                  </strong>{" "}
                  {restaurant.category}
                </p>
                <p>
                  <strong>
                    <span style={{ color: "black" }}>Phone:</span>
                  </strong>{" "}
                  {restaurant.phone}
                </p>
                <p>
                  <strong>
                    <span style={{ color: "black" }}>Price:</span>
                  </strong>{" "}
                  {restaurant.price}
                </p>
                <p className="description-rest">
                  <strong>
                    <span style={{ color: "black" }}>Description:</span>
                  </strong>{" "}
                  {restaurant.description}
                </p>
              </div>
            </div>
            <div className="section">
              <div className="comments">
                {user && <Comments restaurantId={id} />}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RestDetailPage;
