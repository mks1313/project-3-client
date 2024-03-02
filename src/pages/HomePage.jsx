import "./HomePage.css"; 
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage">
    <div className="content">
    <Link to="/restaurants">
    <h1 className="title"> Nyam Nyam😋
      <div className="aurora">
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
        <div className="aurora__item"></div>
      </div>
    </h1>
    <h3 className="subtitle">Hungry Today?</h3>
    <p>Find Your Favorite Restaurant!</p>
    </Link>
  </div>
    </div>
  );
}

export default HomePage;


// import "./HomePage.css"; 
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Carousel from "../components/Carousel";

// function HomePage() {
//   const [restaurants, setRestaurants] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/restaurants")
//       .then((response) => {
//         setRestaurants(response.data);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   // Filtrar los restaurantes por tipo, popularidad, calificación o favoritos
//   const filterByType = (type) => {
//     return axios.get(`/api/restaurants?type=${type}`)
//       .then(response => response.data)
//       .catch(error => {
//         console.error("Error al filtrar restaurantes por tipo:", error);
//         return [];
//       });
//   };

//   const filterByPopularity = () => {
//     return axios.get("/api/restaurants/popular")
//       .then(response => response.data)
//       .catch(error => {
//         console.error("Error al filtrar restaurantes por popularidad:", error);
//         return [];
//       });
//   };

//   const filterByRating = (minRating) => {
//     return axios.get(`/api/restaurants/rating?minRating=${minRating}`)
//       .then(response => response.data)
//       .catch(error => {
//         console.error("Error al filtrar restaurantes por calificación:", error);
//         return [];
//       });
//   };

//   const filterByFavorites = () => {
//     return axios.get("/api/restaurants/favorites")
//       .then(response => response.data)
//       .catch(error => {
//         console.error("Error al filtrar restaurantes por favoritos:", error);
//         return [];
//       });
//   };

//   const [restaurantByType, setRestaurantByType] = useState([]);
//   const [restaurantByPopularity, setRestaurantByPopularity] = useState([]);
//   const [restaurantByRating, setRestaurantByRating] = useState([]);
//   const [restaurantByFavorites, setRestaurantByFavorites] = useState([]);

//   useEffect(() => {
//     filterByType("italiano").then(restaurants => setRestaurantByType(restaurants));
//     filterByPopularity().then(restaurants => setRestaurantByPopularity(restaurants));
//     filterByRating(4.5).then(restaurants => setRestaurantByRating(restaurants));
//     filterByFavorites().then(restaurants => setRestaurantByFavorites(restaurants));
//   }, []);

//   return (
//     <div className="HomePage">
//       <h2>Tipos de restaurante</h2>
//       <Carousel restaurants={restaurantByType} />

//       <h2>Más populares</h2>
//       <Carousel restaurants={restaurantByPopularity} />

//       <h2>Mejor calificados</h2>
//       <Carousel restaurants={restaurantByRating} />

//       <h2>Favoritos</h2>
//       <Carousel restaurants={restaurantByFavorites} />
//     </div>
//   );
// }

// export default HomePage;
