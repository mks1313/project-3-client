import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';


import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1Ijoib2R6MSIsImEiOiJjbHN6d3R0bXAwcXVsMmxvZWp5YzBpZmpmIn0.YuSRnQ4tmIMRUxVZ4hhU8Q';

const Map = () => {
  useEffect(() => {
    
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', 
      center: [2.174356, 41.403629], 
      zoom: 15 
    });

    
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: '400px', height: '300px' }}></div>;
};

export default Map;
