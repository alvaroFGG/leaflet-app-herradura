import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IWaypoint } from "@/backend/models/interfaces/waypoint";

const ZOOM = 15;
const SCROLL = true;
const CENTER = [41.290131, -2.320729] as LatLngExpression;

const Map = () => {
  const [waypoints, setWaypoints] = useState<IWaypoint[]>([]);

  const drinkerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7987/7987463.png",
    iconSize: new L.Point(30, 30),
  });

  const fetchWaypoints = async () => {
    const response = await fetch("/api/waypoints");
    const data = await response.json();
    setWaypoints(data);
  };

  useEffect(() => {
    fetchWaypoints();
  }, []);

  return (
    <MapContainer
      center={CENTER}
      zoom={ZOOM}
      scrollWheelZoom={SCROLL}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {waypoints.map((waypoint) => (
        <Marker
          key={waypoint._id}
          position={waypoint.location as LatLngExpression}
          title={waypoint.name}
          icon={drinkerIcon}
        />
      ))}
    </MapContainer>
  );
};

export default Map;
