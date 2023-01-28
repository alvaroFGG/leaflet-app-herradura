import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";

const ZOOM = 15;
const SCROLL = true;

const Map = () => {
  const [geoData, setGeoData] = useState<LatLngExpression>([
    41.290131, -2.320729,
  ]);

  return (
    <MapContainer
      center={geoData}
      zoom={ZOOM}
      scrollWheelZoom={SCROLL}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
