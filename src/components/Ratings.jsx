import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

function Ratings({ restaurantId, totalVotes, averageRating }) {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const { isLoggedIn, user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  const [hasUserRated, setHasUserRated] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get(`/api/ratings/${restaurantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response);
        console.log("ID de usuario:", user._id);
        const userRating = response.data.ratings.find(
          (rating) => rating.author === user._id
        );
        if (userRating) {
          setUserRating(userRating.value);
          setHasUserRated(true);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la valoración del usuario:", error);
      });
    }
  }, [isLoggedIn, restaurantId, user, storedToken]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = () => {
    if (isLoggedIn) {
      axios.post("/api/ratings/rate", {
        author: user._id,
        value: rating,
        restaurant: restaurantId,
      }, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setUserRating(rating);
        setRating(0);
        setHasUserRated(true);
      })
      .catch((error) => {
        console.error("Error al enviar la valoración:", error);
      });
    } 
  };

  return (
    <div>
      <p>Total de votos: {totalVotes}</p>
      <p>Rating: {averageRating}</p>
      {hasUserRated ? (
        <p>Tu valoración actual: {userRating}</p>
      ) : (
        <div>
          <input
            type="number"
            min="1"
            max="10"
            value={rating}
            onChange={handleRatingChange}
          />
          <button onClick={handleRatingSubmit}>Valorar</button>
        </div>
      )}
    </div>
  );
}

export default Ratings;


