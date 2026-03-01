import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' 
import RoutePreview from './RoutePreview'
import ActiveNavigation from './ActiveNavigation'

function HomeScreen() {
  const [selectedMode, setSelectedMode] = useState('safe')
  const [startText, setStartText] = useState('Current Location')
  const [searchText, setSearchText] = useState('') 
  const [showHeatMap, setShowHeatMap] = useState(false)
  const [showTheftMap, setShowTheftMap] = useState(false) 
  const [searchError, setSearchError] = useState('')
  const [currentView, setCurrentView] = useState('home') 

  const mapCenter = [49.2827, -123.1207]

  const heatMapZones = [
    { center: [49.295, -123.135], radius: 800, color: '#ef4444' }, 
    { center: [49.273, -123.104], radius: 600, color: '#f97316' }, 
    { center: [49.270, -123.155], radius: 700, color: '#eab308' }, 
  ]

  const theftMapZones = [
    { center: [49.283, -123.100], radius: 500, color: '#9333ea' }, 
    { center: [49.260, -123.113], radius: 450, color: '#4f46e5' }, 
  ]

  function handleSearch() {
    if (searchText.trim() === '') {
      setSearchError('Please enter a destination')
      return
    }
    if (startText.trim() === '') {
      setStartText('Current Location')
    }
    setSearchError('')
    setCurrentView('preview')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  function handleSwapLocations() {
    const temp = startText
    setStartText(searchText)
    setSearchText(temp)
  }

  function handleBack() {
    setCurrentView('home')
  }

  function handleStartRide() {
    setCurrentView('riding')
  }

  function handleEndRide() {
    setCurrentView('home')
  }

  if (currentView === 'riding') {
    return (
      <ActiveNavigation
        origin={startText}
        destination={searchText}
        mode={selectedMode}
        onEndRide={handleEndRide}
      />
    )
  }

  if (currentView === 'preview') {
    return (
      <RoutePreview
        origin={startText}
        destination={searchText}
        mode={selectedMode}
        onStartRide={handleStartRide}
        onBack={handleBack}
      />
    )
  }

  const modes = [
    { id: 'direct', label: '🛤️ Direct', color: 'bg-blue-200', desc: 'Fastest route, may include busy roads' },
    { id: 'safe', label: '🛡️ Safe', color: 'bg-green-200', desc: 'Only designated bike paths & quiet streets' },
    { id: 'discovery', label: '🧭 Discover', color: 'bg-yellow-200', desc: 'Scenic routes through attractive areas' },
  ]

  return (
    <div className="relative h-full flex flex-col bg-gray-100">
      
      {/* Search & Routing UI */}
      <div className="px-3 pt-3">
        <div className="flex gap-2 items-stretch">
          
          <div className="flex-1 flex flex-col gap-2 relative border-2 border-gray-800 rounded-lg bg-white p-2 shadow-sm">
            
            <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-300 z-0"></div>

            <div className="flex items-center gap-2 relative z-10 bg-white">
              <span className="text-xs">📍</span>
              <input
                type="text"
                placeholder="From..."
                value={startText}
                onChange={(e) => setStartText(e.target.value)}
                className="flex-1 outline-none text-sm bg-gray-50 rounded px-2 py-1"
              />
            </div>
            
            <div className="flex items-center gap-2 relative z-10 bg-white">
              <span className="text-xs">🔍</span>
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  if (searchError) setSearchError('')
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none text-sm bg-gray-50 rounded px-2 py-1"
              />
            </div>

            {/* Added z-20 and shadow-md so it overlaps the input backgrounds */}
            <button 
              onClick={handleSwapLocations}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full border border-gray-300 transition-colors shadow-md text-sm font-bold"
            >
              ⇅
            </button>
          </div>

          <button
            onClick={handleSearch}
            className="border-2 border-gray-800 rounded-lg bg-blue-500 text-white px-4 py-2 text-sm font-bold shadow-sm active:bg-blue-600 transition-colors flex items-center"
          >
            Go
          </button>
        </div>
        {searchError && (
          <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{searchError}</p>
        )}
      </div>

      <div className="px-3 pt-3">
        <div className="flex gap-1">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`flex-1 border-2 rounded-lg text-center py-1.5 text-xs font-bold transition-all
                ${selectedMode === mode.id
                  ? `${mode.color} border-gray-800 shadow-inner`
                  : 'bg-white border-gray-300 shadow-sm'}`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1.5 ml-1 font-medium">
          {modes.find((m) => m.id === selectedMode)?.desc}
        </p>
      </div>

      <div className="flex-1 mx-3 mt-2 mb-3 border-2 border-gray-800 rounded-lg bg-gray-200 relative overflow-hidden z-0 shadow-sm">
        
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          zoomControl={false} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {showHeatMap && heatMapZones.map((zone, i) => (
            <Circle key={`heat-${i}`} center={zone.center} radius={zone.radius} pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.4, stroke: false }} />
          ))}

          {showTheftMap && theftMapZones.map((zone, i) => (
            <Circle key={`theft-${i}`} center={zone.center} radius={zone.radius} pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.5, stroke: false }} />
          ))}

          <CircleMarker center={mapCenter} radius={7} pathOptions={{ color: 'white', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
        </MapContainer>

        <div className="absolute top-2 right-2 flex flex-col gap-2 items-end z-[400]">
            <button onClick={() => setShowHeatMap(!showHeatMap)} className={`border-2 border-gray-800 rounded px-2 py-1 text-xs font-bold transition-all shadow-md ${showHeatMap ? 'bg-red-100 text-red-700' : 'bg-white text-gray-700'}`}>
                🔥 Activity {showHeatMap ? 'ON' : 'OFF'}
            </button>
            <button onClick={() => setShowTheftMap(!showTheftMap)} className={`border-2 border-gray-800 rounded px-2 py-1 text-xs font-bold transition-all shadow-md ${showTheftMap ? 'bg-purple-100 text-purple-700' : 'bg-white text-gray-700'}`}>
                🚨 Theft {showTheftMap ? 'ON' : 'OFF'}
            </button>
        </div>

        <button onClick={() => alert('Centering on your location...')} className="absolute bottom-2 right-2 border-2 border-gray-800 rounded-full bg-white w-10 h-10 flex items-center justify-center text-lg shadow-md z-[400] active:bg-gray-100 transition-colors">📍</button>

      </div>
    </div>
  )
}

export default HomeScreen