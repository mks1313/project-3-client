import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./HomePage.css"; 

function HomePage() {
  const [cascadingText, setCascadingText] = useState('');
  const text = "Find Your Favorite Restaurant!";
  const delay = 200;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setCascadingText(prevText => prevText + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, []); 

  return (
    <div className="homepage">
      <div className="background-image">
        <div className="content-homepage">
          <Link to="/restaurants">
            <h1 className="title title-3d">Nyam Nyam😋</h1>
            <h3 className="subtitle subtitle-2d">Hungry Today?</h3>
            <p className='homep'>{cascadingText}</p> 
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;






