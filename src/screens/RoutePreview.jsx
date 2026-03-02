import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Polyline, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function RoutePreview({ origin, destination, mode, onStartRide, onBack }) {
  const [isStepsExpanded, setIsStepsExpanded] = useState(false)
  
  const [routeCoordinates, setRouteCoordinates] = useState([])
  const [isLoadingRoute, setIsLoadingRoute] = useState(true)
  
  const [startPos, setStartPos] = useState([49.2827, -123.1207])
  const [endPos, setEndPos] = useState([49.3000, -123.1450])
  const [mapCenter, setMapCenter] = useState([49.291, -123.132])

  useEffect(() => {
    let isMounted = true // Prevents state updates if user clicks 'back' before fetch finishes

    async function fetchRouteData() {
      setIsLoadingRoute(true)
      
      // Helper to fetch coordinates from OpenStreetMap API safely
      const getCoordinates = async (query, defaultCoords) => {
        if (!query || query.toLowerCase() === 'current location') return defaultCoords
        try {
          const searchQuery = encodeURIComponent(`${query}, Vancouver, BC`)
          const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1`)
          const data = await res.json()
          
          if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
          }
        } catch (error) {
          console.error("Geocoding error:", error)
        }
        return defaultCoords
      }

      // Default safe coordinates
      const defaultStart = { lat: 49.2827, lng: -123.1207 } 
      const defaultEnd = { lat: 49.3000, lng: -123.1450 }   

      const actualStart = await getCoordinates(origin, defaultStart)
      const actualEnd = await getCoordinates(destination, defaultEnd)

      if (!isMounted) return

      setStartPos([actualStart.lat, actualStart.lng])
      setEndPos([actualEnd.lat, actualEnd.lng])
      
      setMapCenter([
        (actualStart.lat + actualEnd.lat) / 2, 
        (actualStart.lng + actualEnd.lng) / 2
      ])

      try {
        const osrmUrl = `https://router.project-osrm.org/route/v1/bicycle/${actualStart.lng},${actualStart.lat};${actualEnd.lng},${actualEnd.lat}?geometries=geojson`
        const response = await fetch(osrmUrl)
        const data = await response.json()
        
        if (isMounted && data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]])
          setRouteCoordinates(coords)
        } else if (isMounted) {
          setRouteCoordinates([]) 
        }
      } catch (error) {
        console.error("Routing error:", error)
        if (isMounted) setRouteCoordinates([]) 
      } finally {
        if (isMounted) setIsLoadingRoute(false)
      }
    }

    fetchRouteData()

    return () => { isMounted = false }
  }, [origin, destination]) 

  const routeData = {
    direct: {
      distance: '7.8 km', time: '24 min', elevation: '62 m', difficulty: 'Moderate',
      difficultyColor: 'bg-yellow-100', safety: 3, routeColor: '#EF4444', 
      steps: [
        { text: 'Head straight along main corridor', color: 'bg-blue-500' },
        { text: 'Merge onto busy traffic lanes', color: 'bg-red-500' }, 
        { text: 'Follow direct arterial road', color: 'bg-orange-500' },
        { text: 'Arrive at destination', color: 'bg-blue-500' },
      ],
    },
    safe: {
      distance: '9.2 km', time: '32 min', elevation: '45 m', difficulty: 'Easy',
      difficultyColor: 'bg-green-100', safety: 5, routeColor: '#3B82F6', 
      steps: [
        { text: 'Head along protected bike lane', color: 'bg-blue-500' },
        { text: 'Turn onto neighborhood greenway', color: 'bg-blue-500' },
        { text: 'Follow separated path', color: 'bg-blue-500' },
        { text: 'Arrive at destination', color: 'bg-blue-500' },
      ],
    },
    discovery: {
      distance: '12.1 km', time: '45 min', elevation: '78 m', difficulty: 'Moderate',
      difficultyColor: 'bg-yellow-100', safety: 4, routeColor: '#A855F7', 
      steps: [
        { text: 'Take the scenic detour', color: 'bg-blue-500' },
        { text: 'Ride along the waterfront', color: 'bg-blue-500' },
        { text: 'Pass through local parks', color: 'bg-blue-500' },
        { text: 'Arrive at destination', color: 'bg-blue-500' },
      ],
    },
  }

  const route = routeData[mode] || routeData.safe
  const modeLabels = {
    direct: { icon: '🛤️', label: 'DIRECT MODE', color: 'bg-blue-100' },
    safe: { icon: '🛡️', label: 'SAFE MODE', color: 'bg-green-100' },
    discovery: { icon: '🧭', label: 'DISCOVERY MODE', color: 'bg-yellow-100' },
  }

  const modeInfo = modeLabels[mode] || modeLabels.safe

  return (
    <div className="relative h-full flex flex-col bg-gray-100">
      
      {/* Header */}
      <div className="flex items-center px-3 py-2 border-b-2 border-gray-800 bg-gray-200 z-10 shrink-0">
        <button onClick={onBack} className="text-sm font-bold text-blue-600">← Back</button>
        <span className="flex-1 text-center font-bold text-sm">Route Preview</span>
        <div className="w-12" /> 
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col">
        
        <div className="mx-3 mt-2 shrink-0 border-2 border-gray-800 rounded-lg px-3 py-2 shadow-sm" style={{ backgroundColor: modeInfo.color === 'bg-green-100' ? '#dcfce7' : modeInfo.color === 'bg-blue-100' ? '#dbeafe' : '#fef9c3' }}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold">{modeInfo.icon} {modeInfo.label}</span>
            <span className="bg-white px-2 rounded font-bold border border-gray-300 shadow-sm">
              Safety: {'★'.repeat(route.safety)}{'☆'.repeat(5 - route.safety)}
            </span>
          </div>
          <div className="text-xs text-gray-600 font-medium mt-1.5 flex items-center gap-1.5">
            <span className="truncate max-w-[120px] bg-white px-1.5 py-0.5 rounded border border-gray-200">
                {origin || 'Current Location'}
            </span>
            <span>→</span>
            <span className="truncate max-w-[120px] bg-white px-1.5 py-0.5 rounded border border-gray-200 font-bold text-gray-800">
                {destination || 'Destination'}
            </span>
          </div>
        </div>

        <div className="flex mx-3 mt-2 shrink-0 gap-1">
          <div className="flex-1 border-2 border-gray-800 rounded-lg bg-white text-center py-1.5 shadow-sm">
            <div className="text-sm font-bold">{route.distance}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400">Distance</div>
          </div>
          <div className="flex-1 border-2 border-gray-800 rounded-lg bg-white text-center py-1.5 shadow-sm">
            <div className="text-sm font-bold">{route.time}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400">Est. Time</div>
          </div>
          <div className="flex-1 border-2 border-gray-800 rounded-lg bg-white text-center py-1.5 shadow-sm">
            <div className="text-sm font-bold">{route.elevation}</div>
            <div className="text-[10px] uppercase font-bold text-gray-400">Elevation</div>
          </div>
          <div className={`flex-1 border-2 border-gray-800 rounded-lg text-center py-1.5 shadow-sm ${route.difficultyColor}`}>
            <div className="text-sm font-bold">{route.difficulty}</div>
            <div className="text-[10px] uppercase font-bold text-gray-600">Difficulty</div>
          </div>
        </div>

        {/* Map Visualizer
          FIX: Removed flex-1 and assigned a fixed height so Leaflet never collapses to 0px.
        */}
        <div className="mx-3 mt-2 border-2 border-gray-800 rounded-lg relative overflow-hidden z-0 shadow-sm shrink-0" style={{ height: '240px' }}>
          
          {isLoadingRoute && (
            <div className="absolute inset-0 z-50 bg-gray-100/80 backdrop-blur-sm flex items-center justify-center font-bold text-gray-800 text-sm">
              Finding Route... 🚲
            </div>
          )}

          {/* FIX: Using key={mapCenter.join(',')} forces Leaflet to completely remount 
            when the center point changes, guaranteeing it re-centers perfectly. 
          */}
          <MapContainer 
            key={mapCenter.join(',')}
            center={mapCenter} 
            zoom={13} 
            zoomControl={false}
            style={{ height: '100%', width: '100%', zIndex: 0 }}
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />

            {routeCoordinates.length > 0 && (
              <Polyline positions={routeCoordinates} pathOptions={{ color: route.routeColor, weight: 5, opacity: 0.8 }} />
            )}

            <CircleMarker center={startPos} radius={6} pathOptions={{ color: 'white', fillColor: '#3B82F6', fillOpacity: 1, weight: 2 }} />
            <CircleMarker center={endPos} radius={6} pathOptions={{ color: 'white', fillColor: '#EF4444', fillOpacity: 1, weight: 2 }} />
          </MapContainer>
        </div>

        {/* Collapsible Dropdown Route Steps */}
        <div className="mx-3 mt-2 shrink-0 border-2 border-gray-800 rounded-lg bg-white px-3 py-2 shadow-sm transition-all">
          <button 
            onClick={() => setIsStepsExpanded(!isStepsExpanded)}
            className="w-full flex justify-between items-center font-bold text-xs uppercase text-gray-800 outline-none"
          >
            <span>Route Steps ({route.steps.length})</span>
            <span className="text-gray-500">{isStepsExpanded ? '▲' : '▼'}</span>
          </button>
          
          {isStepsExpanded && (
            <div className="mt-3 pt-2 border-t border-gray-100">
              {route.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${step.color} shrink-0 shadow-sm`} />
                  <span className="text-xs text-gray-700 font-medium">{i + 1}. {step.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Start Button */}
        <div className="mx-3 mt-4 mb-6 shrink-0">
          <button
            onClick={onStartRide}
            className="w-full border-2 border-gray-800 rounded-xl bg-green-500 text-white text-center py-3.5 font-bold text-lg active:bg-green-600 shadow-[0_4px_0_rgb(31,41,55)] active:shadow-[0_0px_0_rgb(31,41,55)] active:translate-y-1 transition-all"
          >
            ▶ START RIDE
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoutePreview