import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IWaypoint } from "@/backend/models/interfaces/waypoint";
import { MarkerPopup } from "./MarkerPopup";
import { Button } from "react-bootstrap";

const ZOOM = 15;
const SCROLL = true;
const CENTER = [41.290131, -2.320729] as LatLngExpression;
const WAYPOINTS_URL = "/api/waypoints";

const Map = () => {
  const [waypoints, setWaypoints] = useState<IWaypoint[]>([]);

  const mapRef = useRef<any>(null);

  const drinkerIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/7987/7987463.png",
    iconSize: new L.Point(30, 30),
  });

  const fetchWaypoints = async () => {
    const response = await fetch(WAYPOINTS_URL);
    const data = await response.json();
    setWaypoints(data);
  };

  useEffect(() => {
    fetchWaypoints();
  }, []);

  const addMarkerInUserLocation = (position: LatLngExpression) => {
    const marker = L.marker(position, {
      icon: drinkerIcon,
    }).addTo(mapRef.current);

    marker.bindPopup("You are here").openPopup();

    // abrir un modal de formilario, pasarle la posicion y desde el componente del modal hacer el post
  };

  const navigateToUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        mapRef.current.flyTo([latitude, longitude], ZOOM, {
          animation: true,
        });

        addMarkerInUserLocation([latitude, longitude]);
      });
    }
  };

  return (
    <MapContainer
      center={CENTER}
      zoom={ZOOM}
      scrollWheelZoom={SCROLL}
      style={{ height: "100vh", zIndex: 0 }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Button
        className="position-absolute bg-success border-0"
        style={{ zIndex: 1000, top: 80, left: 10 }}
        onClick={() => navigateToUserLocation()}
      >
        +
      </Button>

      {waypoints &&
        waypoints.length > 0 &&
        waypoints.map((waypoint) => (
          <Marker
            key={waypoint._id}
            position={waypoint.location as LatLngExpression}
            title={waypoint.name}
            icon={drinkerIcon}
          >
            <MarkerPopup waypoint={waypoint} />
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
