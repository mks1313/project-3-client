import { Link } from 'react-router-dom';
import './AnimatedCards.css';


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
            <Link to={`/restaurants/${restaurant._id}`} >
            <button className="readmorebtn">
              Read More
            </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedCards;




