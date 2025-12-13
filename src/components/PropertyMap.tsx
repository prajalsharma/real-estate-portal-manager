"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import all Leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
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
  const [isMounted, setIsMounted] = useState(false);
  const [leafletIcon, setLeafletIcon] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    
    // Import Leaflet Icon only on client side
    import("leaflet").then((L) => {
      import("leaflet/dist/images/marker-icon.png").then((markerIconPng) => {
        const icon = new L.Icon({
          iconUrl: typeof markerIconPng.default === "string" 
            ? markerIconPng.default 
            : markerIconPng.default.src,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [0, -41],
        });
        setLeafletIcon(icon);
      });
    });
  }, []);

  // Don't render on server or before icon is loaded
  if (!isMounted || !leafletIcon) {
    return (
      <div className="h-[420px] w-full bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full z-10"
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AttributionControl position="bottomright" prefix={false} />
      <Marker position={[latitude, longitude]} icon={leafletIcon}>
        <Popup>
          {title}{city ? `, ${city}` : ""}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

