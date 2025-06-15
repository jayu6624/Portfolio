"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in react-leaflet
function fixLeafletIcon() {
  // Use type assertion to tell TypeScript about this property
  const DefaultIcon = L.Icon.Default as any;
  const prototype = DefaultIcon.prototype as any;
  delete prototype._getIconUrl;
  
  L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  })
}

export default function Map() {
  useEffect(() => {
    fixLeafletIcon()
  }, [])

  // Coordinates for Rajkot, Gujarat, India
  const position: [number, number] = [22.3039, 70.8022]

  return (
    <div className="h-[250px] sm:h-[300px] w-full rounded-lg overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="dark:filter dark:brightness-[0.7] dark:contrast-[1.2]"
        />
        <Marker position={position}>
          <Popup className="text-black">
            Rajkot, Gujarat, India
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}