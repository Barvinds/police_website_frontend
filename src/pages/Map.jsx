import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define custom icon
const customIcon = L.icon({
  iconUrl: "marker.png", // Ensure marker.png is in the public folder or use the correct path
  iconSize: [32, 32], // Adjust size as needed
  iconAnchor: [16, 32], // Center the icon properly
  popupAnchor: [0, -32], // Adjust popup position
});

const Map = () => {
  const position = [8.7244041, 77.7350118]; // Vehicle location coordinates

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapContainer center={position} zoom={15} style={{ width: "100%", height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={customIcon}>
          <Popup>Vehicle Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
