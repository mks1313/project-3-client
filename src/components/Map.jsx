import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoib2R6MSIsImEiOiJjbHN6d2xubTgwc3o3Mmlsb3l1bHBxY21wIn0.1soIi-jzSkHcHn3VM0kcVg";

    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            message: "My restaurant",
            iconSize: [60, 60],
          },
          geometry: {
            type: "Point",
            coordinates: [2.1765223826466493, 41.404284072641694],
          },
        },        
      ],
    };

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [2.174356, 41.403629],
      zoom: 5,
    });

    
    for (const marker of geojson.features) {
      
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = "marker";
      el.style.backgroundImage = `url(https://cdn2.vectorstock.com/i/1000x1000/01/46/fork-and-knife-icon-restaurant-symbol-vector-23190146.jpg)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";
      
      el.addEventListener("click", () => {
        window.alert(marker.properties.message);
      });

      
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    }

    
    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default Map;
