import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Circle, Polygon, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css' 

import RoutePreview from './RoutePreview'
import ActiveNavigation from './ActiveNavigation'
import OnboardingOverlay from './OnboardingOverlay'
import { homeTourPart1, homeTourPart2 } from '../config/tours'

// Sub-components
import SearchPanel from '../components/home/SearchPanel'
import MapLayersMenu from '../components/home/MapLayersMenu'
import TerritoryBottomSheet from '../components/home/TerritoryBottomSheet'

// Mock Data
import { heatMapZones, theftMapZones, territories, modes } from '../data/mockHomeData'

// Helper component to handle map clicks intelligently
function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => {
      if (e.originalEvent?.target?.tagName?.toLowerCase() === 'path') return
      onClick()
    },
  })
  return null
}

function HomeScreen({ activeTerritorySession, setActiveTerritorySession, isTracingRoute, onStopTracing, isDefending, onStopDefending }) { 
  const [selectedMode, setSelectedMode] = useState('safe')
  const [startText, setStartText] = useState('Current Location')
  const [searchText, setSearchText] = useState('') 
  
  // Map Layer States
  const [isLayersMenuOpen, setIsLayersMenuOpen] = useState(false)
  const [showHeatMap, setShowHeatMap] = useState(false)
  const [showTheftMap, setShowTheftMap] = useState(false) 
  const [showTerritories, setShowTerritories] = useState(false) 
  const [isCreatingTerritory, setIsCreatingTerritory] = useState(false) 
  
  const [searchError, setSearchError] = useState('')
  const [currentView, setCurrentView] = useState('home') 

  const [selectedTerritory, setSelectedTerritory] = useState(null)
  const [isClaiming, setIsClaiming] = useState(false)

  // Onboarding Tour States
  const [tour1Ready, setTour1Ready] = useState(false)
  const [tour2Ready, setTour2Ready] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setTour1Ready(true), 150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLayersMenuOpen) {
      const timer = setTimeout(() => setTour2Ready(true), 150)
      return () => clearTimeout(timer)
    } else {
      setTour2Ready(false)
    }
  }, [isLayersMenuOpen])

  const mapCenter = [49.2827, -123.1207]

  // Handlers
  function handleSearch() {
    if (searchText.trim() === '') {
      setSearchError('Please enter a destination')
      return
    }
    if (startText.trim() === '') setStartText('Current Location')
    setSearchError('')
    setCurrentView('preview')
  }

  function handleSwapLocations() {
    const temp = startText
    setStartText(searchText)
    setSearchText(temp)
  }

  function handleStartCapture() {
    setIsClaiming(true)
    setTimeout(() => {
        setActiveTerritorySession({ ...selectedTerritory, progress: 0.0, target: 2.0 })
        setIsClaiming(false)
    }, 600)
  }

  // Active Routing Views
  if (currentView === 'riding') {
    return <ActiveNavigation origin={startText} destination={searchText} mode={selectedMode} onEndRide={() => setCurrentView('home')} />
  }

  if (currentView === 'preview') {
    return <RoutePreview origin={startText} destination={searchText} mode={selectedMode} onStartRide={() => setCurrentView('riding')} onBack={() => setCurrentView('home')} />
  }

  const displayTerritory = selectedTerritory || activeTerritorySession;
  const isCurrentSessionActive = activeTerritorySession && displayTerritory?.id === activeTerritorySession.id;

  return (
    <div id="home-screen-container" className="relative h-full flex flex-col bg-gray-100">
      
      {tour1Ready && (
        <OnboardingOverlay screenKey="home_tour_part1" steps={homeTourPart1} onComplete={() => setIsLayersMenuOpen(true)} />
      )}
      
      {tour2Ready && isLayersMenuOpen && (
        <OnboardingOverlay screenKey="home_tour_part2" steps={homeTourPart2} onComplete={() => setIsLayersMenuOpen(false)} />
      )}

      {/* Extracted Search Component */}
      <SearchPanel 
        startText={startText} setStartText={setStartText}
        searchText={searchText} setSearchText={setSearchText}
        searchError={searchError} setSearchError={setSearchError}
        handleSearch={handleSearch} handleSwapLocations={handleSwapLocations}
      />

      {/* Modes Selection */}
      <div className="px-3 pt-3">
        <div id="tour-modes" className="flex gap-1">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`flex-1 border-2 rounded-lg text-center py-1.5 text-xs font-bold transition-all
                ${selectedMode === mode.id ? `${mode.color} border-gray-800 shadow-inner` : 'bg-white border-gray-300 shadow-sm'}`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1.5 ml-1 font-medium">
          {modes.find((m) => m.id === selectedMode)?.desc}
        </p>
      </div>

      {/* Main Map Area */}
      <div className="flex-1 mx-3 mt-2 mb-3 border-2 border-gray-800 rounded-lg bg-gray-200 relative overflow-hidden z-0 shadow-sm flex flex-col">
        
        <MapContainer center={mapCenter} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
          <MapClickHandler onClick={() => { setSelectedTerritory(null); setIsLayersMenuOpen(false); }} />
          
          <TileLayer attribution='&copy; OpenStreetMap contributors &copy; CARTO' url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {showHeatMap && heatMapZones.map((zone, i) => (
            <Circle key={`heat-${i}`} center={zone.center} radius={zone.radius} pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.4, stroke: false }} />
          ))}

          {showTheftMap && theftMapZones.map((zone, i) => (
            <Circle key={`theft-${i}`} center={zone.center} radius={zone.radius} pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.5, stroke: false }} />
          ))}

          {showTerritories && territories.map(territory => (
            <Polygon
              key={territory.id}
              positions={territory.coords}
              pathOptions={{ color: territory.color, fillColor: territory.color, fillOpacity: 0.3, weight: 2 }}
              eventHandlers={{ click: () => { setSelectedTerritory(territory); setIsLayersMenuOpen(false); } }}
            />
          ))}

          <CircleMarker center={mapCenter} radius={7} pathOptions={{ color: 'white', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
        </MapContainer>

        {/* Status Indicators */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-[400] pointer-events-none">
          {isCreatingTerritory && (
            <div className="bg-white/90 backdrop-blur-sm border border-blue-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 pointer-events-auto">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">Drawing</span>
            </div>
          )}
          {isTracingRoute && (
            <button onClick={onStopTracing} className="bg-white/90 backdrop-blur-sm border border-green-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 pointer-events-auto hover:bg-green-50 active:scale-95 transition-all cursor-pointer group">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:bg-red-500 transition-colors"></div>
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider group-hover:text-red-600 transition-colors">Tracing <span className="text-gray-400 group-hover:text-red-500">✕</span></span>
            </button>
          )}
          {isDefending && (
            <button onClick={onStopDefending} className="bg-white/90 backdrop-blur-sm border border-purple-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 pointer-events-auto hover:bg-purple-50 active:scale-95 transition-all cursor-pointer group">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse group-hover:bg-red-500 transition-colors"></div>
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider group-hover:text-red-600 transition-colors">Defending <span className="text-gray-400 group-hover:text-red-500">✕</span></span>
            </button>
          )}
        </div>

        {/* Extracted Layers Menu */}
        <MapLayersMenu 
          isOpen={isLayersMenuOpen} setIsOpen={setIsLayersMenuOpen}
          showHeatMap={showHeatMap} setShowHeatMap={setShowHeatMap}
          showTheftMap={showTheftMap} setShowTheftMap={setShowTheftMap}
          showTerritories={showTerritories} setShowTerritories={setShowTerritories}
          isCreatingTerritory={isCreatingTerritory} setIsCreatingTerritory={setIsCreatingTerritory}
        />

        <button 
          onClick={() => alert('Centering on your location...')} 
          className={`absolute right-2 border-2 border-gray-800 rounded-full bg-white w-10 h-10 flex items-center justify-center text-lg shadow-md z-[400] active:bg-gray-100 transition-all duration-300 ${displayTerritory ? 'bottom-28' : 'bottom-2'}`}
        >
          📍
        </button>

        {/* Extracted Bottom Sheet */}
        <TerritoryBottomSheet 
          displayTerritory={displayTerritory}
          isCurrentSessionActive={isCurrentSessionActive}
          activeTerritorySession={activeTerritorySession}
          isClaiming={isClaiming}
          handleStartCapture={handleStartCapture}
          setActiveTerritorySession={setActiveTerritorySession}
          setSelectedTerritory={setSelectedTerritory}
        />
      </div>
    </div>
  )
}

export default HomeScreen