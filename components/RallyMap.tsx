"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type RallyMapStop = {
  number: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
};

type RallyMapProps = {
  stops: RallyMapStop[];
};

function MapBounds({ stops }: RallyMapProps) {
  const map = useMap();

  useEffect(() => {
    if (!stops.length) return;

    const bounds = L.latLngBounds(
      stops.map((stop) => [stop.lat, stop.lng])
    );

    map.fitBounds(bounds, {
      padding: [35, 35],
    });
  }, [map, stops]);

  return null;
}

function createNumberIcon(number: number) {
  return L.divIcon({
    className: "rally-map-marker-wrapper",
    html: `
      <div class="rally-map-marker">
        ${number}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

export default function RallyMap({ stops }: RallyMapProps) {
  return (
    <div className="rally-map">
      <MapContainer
        center={[43.2585, -2.9265]}
        zoom={15}
        scrollWheelZoom={false}
        dragging={true}
        doubleClickZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBounds stops={stops} />

        {stops.map((stop) => (
          <Marker
            key={stop.number}
            position={[stop.lat, stop.lng]}
            icon={createNumberIcon(stop.number)}
          >
            <Popup>
              <strong>
                {stop.number}. {stop.name}
              </strong>

              <br />

              <span>{stop.location}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}