import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapPreview({ coordinates }) {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            // Initialize as a static, non-interactive map for the list view
            mapInstance.current = L.map(mapRef.current, {
                zoomControl: false,
                scrollWheelZoom: false,
                dragging: false,
                touchZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                attributionControl: false
            })

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {}).addTo(mapInstance.current)

            const polyline = L.polyline(coordinates, { 
                color: '#2563EB', 
                weight: 3,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(mapInstance.current)
            
            mapInstance.current.fitBounds(polyline.getBounds(), { padding: [10, 10] })
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [coordinates])

    return <div ref={mapRef} className="w-full h-full z-0" />
}