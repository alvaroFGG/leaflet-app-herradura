import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const MAP_CENTER = [41.290131, -2.320729];
const ZOOM = 15;
const SCROLL = true;

const MapWithoutSSR = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <MapWithoutSSR />
    </main>
  );
}
