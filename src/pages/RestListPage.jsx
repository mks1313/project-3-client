// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// // const API_URL = import.meta.env.VITE_API_URL;

// function RestListPage() {
//   // console.log(API_URL);
//   const [restaurants, setRestaurants] = useState([]);
//   // const storedToken = localStorage.getItem("authToken");

//   const getAllRestaurants = () => {
//     axios
//       .get(`/api/restaurants/read`)
//       .then(response => { 
//         setRestaurants(response.data) 
       
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getAllRestaurants();
//   }, [] );

//   return (
//     <div className="RestListPage">
      
//       {restaurants.map((restaurant) => (
//         <div key={restaurant._id}>
//           <Link to={`/api/restaurants/read/${restaurant._id}`}>
//           <div>
//             <h3>{restaurant.name}</h3>
//             <img src={restaurant.image} alt={restaurant.name} /> 
//           </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default RestListPage;
import  { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "antd";

function RestListPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/restaurants/read`)
      .then((response) => {
        setRestaurants(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="RestListPage">
      {restaurants.map((restaurant) => (
        <Link to={`/details/${restaurant._id}`} key={restaurant._id}>
          <Card title={restaurant.name} style={{ width: 300, margin: 10 }}>
            <div className="image-container" style={{ backgroundImage: `url(${restaurant.image})` }} />
            <p>{restaurant.city}</p>
            {/* Puedes agregar más información aquí si es necesario */}
          </Card>
        </Link>
      ))}
    </div>
  );
  
}

export default RestListPage;
