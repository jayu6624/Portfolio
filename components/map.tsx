"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useTheme } from "next-themes"

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const mapInstanceRef = useRef<L.Map | null>(null)
  
  // Rajkot, Gujarat coordinates
  const latitude = 22.3039
  const longitude = 70.8022

  // Check if window is defined (client-side only)
  if (typeof window === 'undefined') {
    return <div className="h-[300px] bg-muted flex items-center justify-center">Map loading...</div>
  }

  useEffect(() => {
    if (!mapRef.current) return

    // If map already initialized, return
    if (mapInstanceRef.current) return

    // Initialize map
    const map = L.map(mapRef.current).setView([latitude, longitude], 13)
    mapInstanceRef.current = map

    // Use appropriate tile layer based on theme
    const tileLayer = theme === "dark" 
      ? L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
      : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    
    tileLayer.addTo(map)

    // Add marker for location
    const marker = L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("<b>Jaydeep Rathod</b><br>Rajkot, Gujarat, India")
      .openPopup()

    // Refresh map size after rendering
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    // Cleanup on unmount
    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  // Update map theme when theme changes
  useEffect(() => {
    if (!mapInstanceRef.current) return
    
    const map = mapInstanceRef.current
    
    // Remove existing tile layers
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer)
      }
    })
    
    // Add appropriate tile layer based on theme
    const tileLayer = theme === "dark" 
      ? L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
      : L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        })
    
    tileLayer.addTo(map)
  }, [theme])

  return (
    <div 
      ref={mapRef} 
      className="h-[300px] w-full rounded-lg z-0" 
      aria-label="Map showing Rajkot, Gujarat, India"
    />
  )
}

export default Map