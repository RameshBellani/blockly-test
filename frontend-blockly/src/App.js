import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';
import './App.css';

const containerStyle = {
  width: '100vw',
  height: '100vh',
  position: 'relative'
};

const center = {
  lat: 17.385044,
  lng: 78.486671
};

const App = () => {
  const [path, setPath] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://localhost:5000/api/location');
        const coordinates = result.data.map(point => ({
          lat: point.latitude,
          lng: point.longitude
        }));
        setPath(prevPath => [...prevPath, ...coordinates]);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyAm-Z8JmQETClOX_0Z6BUn483av8LwoMZo">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          {path.length > 0 && (
            <>
              <Marker
                position={path[path.length - 1]}
                icon="https://img.icons8.com/color/48/000000/car.png"
              />
              <Polyline path={path} options={{ strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2 }} />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default App;
