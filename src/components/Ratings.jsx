import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import "./Ratings.css";

function Ratings({ restaurantId, totalVotes, onAverageRatingChange }) {
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [hasUserRated, setHasUserRated] = useState(false);
  const storedToken = localStorage.getItem("authToken");
  const { isLoggedIn, user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isLoggedIn) {
      axios
        .get(`/api/ratings/${restaurantId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log(response);
          const { averageRating, ratings } = response.data;
          onAverageRatingChange(averageRating);
          setAverageRating(averageRating);

          const userRatingData = ratings.find(
            (rating) => rating.author === user._id
          );
          if (userRatingData) {
            setUserRating(userRatingData.value);
            setHasUserRated(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching user rating:", error);
        });
    }
  }, [isLoggedIn, restaurantId, user, storedToken, onAverageRatingChange]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
//TODO, falta, extraer id de user y comparar en rating y comments, para ocultar. 
//TODO navbar, footer, arreglos estilos, pgs de editar.
  const handleRatingSubmit = () => {
    if (isLoggedIn) {
      axios
        .post(
          "/api/ratings/rate",
          {
            author: user._id,
            value: rating,
            restaurant: restaurantId,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then(() => {
          setUserRating(rating);
          setRating(0);
          setHasUserRated(true);
        })
        .catch((error) => {
          console.error("Error submitting rating:", error);
        });
    }
  };

  return (
    <div className="ratings-container">
      <p className="votes-text">Total votes: {totalVotes}</p>
      <p className="rating-text">
        Rating:{" "}
        <span className="average-rating">
          {averageRating !== null ? averageRating.toFixed(1) : "No rates yet"}
        </span>{" "}
        /10
      </p>
      {!hasUserRated && (
        <div className="rating-input">
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={handleRatingChange}
          />
          <button onClick={handleRatingSubmit}>Rate this restaurant</button>
        </div>
      )}
      {hasUserRated && (
        <p className="user-rating">Your rate is: {userRating}</p>
      )}
    </div>
  );
}

export default Ratings;

