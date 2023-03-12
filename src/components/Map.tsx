import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IWaypoint } from "@/backend/models/interfaces/waypoint";
import { MarkerPopup } from "./MarkerPopup";
import { Button, Spinner } from "react-bootstrap";
import { ModalForm } from "./ModalForm";
import { EMarkerType, EMarkerIcon } from "@/types/enums";

const ZOOM = 15;
const SCROLL = true;
const CENTER = [41.290131, -2.320729] as LatLngExpression;
const WAYPOINTS_URL = "/api/waypoints";
const DEFAULT_ICON = new L.Icon({
  iconUrl: EMarkerIcon.DRINKER,
  iconSize: new L.Point(30, 30),
});
const DRINKER_ICON = new L.Icon({
  iconUrl: EMarkerIcon.DRINKER,
  iconSize: new L.Point(30, 30),
});
const FEEDER_ICON = new L.Icon({
  iconUrl: EMarkerIcon.FEEDER,
  iconSize: new L.Point(30, 30),
});
const HUNTING_POS_ICON = new L.Icon({
  iconUrl: EMarkerIcon.HUNTING_POSITION,
  iconSize: new L.Point(30, 30),
});

const Map = () => {
  const [waypoints, setWaypoints] = useState<IWaypoint[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [latlng, setLatlng] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mapRef = useRef<any>(null);

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
      icon: DEFAULT_ICON,
    }).addTo(mapRef.current);

    marker.bindPopup("Estas aquí").openPopup();
    setLatlng(position as number[]);

    setShowModal(true);
    setIsLoading(false);
  };

  const navigateToUserLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        addMarkerInUserLocation([latitude, longitude]);

        mapRef.current.flyTo([latitude, longitude], ZOOM, {
          animation: true,
        });
      });
    }
  };

  const selectIcon = (type: string) => {
    switch (type) {
      case EMarkerType.DRINKER:
        return DRINKER_ICON;
      case EMarkerType.FEEDER:
        return FEEDER_ICON;
      case EMarkerType.HUNTING_POSITION:
        return HUNTING_POS_ICON;
      default:
        return DEFAULT_ICON;
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
        className="position-absolute bg-success border-0 "
        style={{ zIndex: 1000, top: 80, left: 10 }}
        onClick={() => navigateToUserLocation()}
      >
        {isLoading ? (
          <Spinner size="sm" style={{ width: "12px", height: "12px" }} />
        ) : (
          <span style={{ width: "12px", height: "12px" }}>+</span>
        )}
      </Button>

      <ModalForm
        showModal={showModal}
        setShowModal={setShowModal}
        latlng={latlng}
        fetchWaypoints={fetchWaypoints}
      />

      {waypoints &&
        waypoints.length > 0 &&
        waypoints.map((waypoint) => (
          <Marker
            key={waypoint._id}
            position={waypoint.location as LatLngExpression}
            title={waypoint.name}
            icon={selectIcon(waypoint.type)}
          >
            <MarkerPopup waypoint={waypoint} />
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
