import { Link } from 'react-router-dom';
import './AnimatedCards.css';
import Ratings from './Ratings';



const AnimatedCards = ({ restaurants }) => {
  return (
    <div className="container">
      {restaurants.map((restaurant) => (
        <div key={restaurant._id} className="card" style={{ '--clr': restaurant.color, backgroundColor: 'rgba(218, 204, 178, 1)' }}>

          <div className="img-box">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>
          <div className="content">
            <h2>{restaurant.name}</h2>
            <Ratings
                restaurantId={restaurant._id}
                averageRating={restaurant.averageRating}               
              />
            <Link to={`/restaurants/${restaurant._id}`} className="read-more-button">
              Read More
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedCards;

