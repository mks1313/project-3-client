import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
//TODO terminar con la logica de ratings
function Ratings({ restaurantId, totalVotes, averageRating }) {
  const [rating, setRating] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const { isLoggedIn, user } = useContext(AuthContext); 
  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (isLoggedIn) {
      // Verificar si el usuario logeado ya valoró este restaurante
      axios.get(`/api/ratings/${restaurantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const userRating = response.data.find(
          (rating) => rating.author === user._id
        );
        if (userRating) {
          setUserRating(userRating.value);
        }
      });
    }
  }, [isLoggedIn, restaurantId, user,storedToken]);

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = () => {
    if (isLoggedIn) {
      axios.post("/api/ratings", {
        author: user._id,
        value: rating,
        restaurant: restaurantId,
      }, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setUserRating(rating);
      })
      .catch((error) => {
        console.error("Error al enviar la valoración:", error);
      });
    } else {
      // Manejar el caso donde el usuario no está logeado
    }
  };

  return (
    <div>
      <p>Total de votes: {totalVotes}</p>
      <p>Rating: {averageRating}</p>
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
      {userRating !== null && (
        <p>Tu valoración actual: {userRating}</p>
      )}
    </div>
  );
}

export default Ratings;
