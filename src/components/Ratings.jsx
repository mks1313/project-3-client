import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import "./Ratings.css";

const API_BASE_URL = "/api";

function Ratings({ restaurantId, onAverageRatingChange }) {
  const [averageRating, setAverageRating] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [hasUserRated, setHasUserRated] = useState(false);
  const storedToken = localStorage.getItem("authToken");
  const { isLoggedIn, user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (isLoggedIn && user && storedToken) {
      axios
        .get(`${API_BASE_URL}/ratings/${restaurantId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // console.log(response.data);
          const { averageRating, ratings } = response.data;
          onAverageRatingChange(averageRating);
          setAverageRating(averageRating);

          const userRatingData = ratings.find(
            (rating) => rating.author._id === user._id
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
  }, [isLoggedIn, user, storedToken, restaurantId, onAverageRatingChange]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = () => {
    if (isLoggedIn) {
      axios
        .post(
          `${API_BASE_URL}/ratings/rate`,
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
      <p className="rating-text">
        <span className="average-rating">
          {averageRating !== null ? averageRating.toFixed(1) : "0"} /10 
        </span>
      </p>
      {!hasUserRated && isLoggedIn && (
        <div className="rating-input">
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={handleRatingChange}
          />
          <button className="rating-button" onClick={handleRatingSubmit}>
            Rate this restaurant
          </button>
        </div>
      )}
      {hasUserRated && (
        <p className="user-rating">Your rate is: {userRating}</p>
      )}
    </div>
  );
}

export default Ratings;



