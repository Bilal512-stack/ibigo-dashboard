"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import { mapPins } from "@/data/mockData";

const markerIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapViewer() {
  return (
    <div className="h-[300px] overflow-hidden rounded-2xl border border-[#E5E0D8]">
      <MapContainer
        center={[9.1, 18.3]}
        zoom={5}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {mapPins.map((pin: { name: string; lat: number; lng: number }) => (
          <Marker
            key={pin.name}
            position={[pin.lat, pin.lng]}
            icon={markerIcon}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-[#191E24]">{pin.name}</p>
                <p className="text-[#665F55]">Hub de transit corridor</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
