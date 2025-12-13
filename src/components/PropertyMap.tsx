"use client";

import { useEffect, useState } from "react";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import dynamic from "next/dynamic";

// Dynamically import all Leaflet components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const AttributionControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.AttributionControl),
  { ssr: false }
);

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  title: string;
  city?: string;
}

export default function PropertyMap({ latitude, longitude, title, city }: PropertyMapProps) {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full z-10"
      attributionControl={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl position="bottomright" prefix={false} />
      <Marker
        position={latitude && longitude ? [latitude, longitude] : [51.505, -0.09]}
        icon={
          new Icon({
            iconUrl: typeof markerIconPng === "string" ? markerIconPng : markerIconPng.src,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [0, -41],
          })
        }>
        <Popup>
          {title}
          {city ? `, ${city}` : ""}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
