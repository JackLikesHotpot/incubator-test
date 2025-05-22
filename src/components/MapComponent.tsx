import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCsvData } from '../hooks/useCsvData';
import { regions } from '../../data/regions'


const MapComponent: React.FC = () => {
  const {csvData} = useCsvData();

const markColour = (city: string) => {

  if (csvData) {
    const randomValue = csvData.find(row => row.region === city)?.randomValue
    
    if (randomValue === 0) {
      return 'green'
    }
    else if (randomValue === 1) {
      return 'yellow'
    }
    else if (randomValue === 2) {
      return 'red'
    }
    else {
      return 'black'
    }
  }
}
  return (
    
    <MapContainer
      center={[20, 0]}
      zoom={4}
      minZoom={2}
      maxZoom={6}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      
    {Object.entries(regions).map(([city, coords]) => (
        <CircleMarker
          key={city}
          radius={10}
          center={coords}
          pathOptions={{ 
            fillColor: markColour(city), 
            color: markColour(city), 
            fillOpacity: 0.3 }}
        >
          <Popup>{city}</Popup>
        </CircleMarker>
      ))}

    </MapContainer>
  );
};


export default MapComponent;
