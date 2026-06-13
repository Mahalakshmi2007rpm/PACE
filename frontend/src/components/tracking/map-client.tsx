"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";


const center: [number, number] = [
  51.5074,
  -0.1278,
];

export default function MapClient() {
  return (
    <MapContainer
      center={center}
      zoom={5}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[51.5074, -0.1278]}>
        <Popup>
          PACE-TRK-101 · London
        </Popup>
      </Marker>

      <Marker position={[52.4862, -1.8904]}>
        <Popup>
          PACE-TRK-205 · Birmingham
        </Popup>
      </Marker>
    </MapContainer>
  );
}