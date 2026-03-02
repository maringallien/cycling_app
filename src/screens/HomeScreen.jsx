import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Circle, Polygon, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' 
import RoutePreview from './RoutePreview'
import ActiveNavigation from './ActiveNavigation'
import OnboardingOverlay from './OnboardingOverlay'
import { homeTourPart1, homeTourPart2 } from '../config/tours' // Importing the tours!

// Helper component to handle map clicks intelligently
function MapClickHandler({ onClick }) {
  useMapEvents({
    click: (e) => {
      if (e.originalEvent?.target?.tagName?.toLowerCase() === 'path') {
        return
      }
      onClick()
    },
  })
  return null
}

function HomeScreen({ activeTerritorySession, setActiveTerritorySession }) {
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

  // --- ONBOARDING TOUR STATES ---
  const [tour1Ready, setTour1Ready] = useState(false)
  const [tour2Ready, setTour2Ready] = useState(false)

  // Give the DOM a tiny fraction of a second to paint before we measure coordinates
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

  const heatMapZones = [
    { center: [49.295, -123.135], radius: 800, color: '#ef4444' }, 
    { center: [49.273, -123.104], radius: 600, color: '#f97316' }, 
    { center: [49.270, -123.155], radius: 700, color: '#eab308' }, 
  ]

  const theftMapZones = [
    { center: [49.283, -123.100], radius: 500, color: '#9333ea' }, 
    { center: [49.260, -123.113], radius: 450, color: '#4f46e5' }, 
  ]

  const territories = [
    { id: 't1', name: 'Downtown Core', coords: [[49.285, -123.115], [49.280, -123.110], [49.278, -123.125], [49.282, -123.130]], color: '#ef4444' },
    { id: 't2', name: 'Stanley Park', coords: [[49.305, -123.145], [49.298, -123.135], [49.292, -123.148], [49.300, -123.155]], color: '#3b82f6' },
    { id: 't3', name: 'Kitsilano Area', coords: [[49.275, -123.150], [49.268, -123.145], [49.265, -123.160], [49.272, -123.165]], color: '#10b981' },
    { id: 't4', name: 'False Creek', coords: [[49.272, -123.110], [49.265, -123.100], [49.260, -123.115], [49.268, -123.125]], color: '#f59e0b' }
  ]

  function handleSearch() {
    if (searchText.trim() === '') {
      setSearchError('Please enter a destination')
      return
    }
    if (startText.trim() === '') setStartText('Current Location')
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

  function handleStartCapture() {
    setIsClaiming(true)
    setTimeout(() => {
        setActiveTerritorySession({
            ...selectedTerritory,
            progress: 0.0,
            target: 2.0
        })
        setIsClaiming(false)
    }, 600)
  }

  if (currentView === 'riding') {
    return (
      <ActiveNavigation
        origin={startText}
        destination={searchText}
        mode={selectedMode}
        onEndRide={() => setCurrentView('home')}
      />
    )
  }

  if (currentView === 'preview') {
    return (
      <RoutePreview
        origin={startText}
        destination={searchText}
        mode={selectedMode}
        onStartRide={() => setCurrentView('riding')}
        onBack={() => setCurrentView('home')}
      />
    )
  }

  const modes = [
    { id: 'direct', label: '🛤️ Direct', color: 'bg-blue-200', desc: 'Fastest route, may include busy roads' },
    { id: 'safe', label: '🛡️ Safe', color: 'bg-green-200', desc: 'Only designated bike paths & quiet streets' },
    { id: 'discovery', label: '🧭 Discover', color: 'bg-yellow-200', desc: 'Scenic routes through attractive areas' },
  ]

  const displayTerritory = selectedTerritory || activeTerritorySession;
  const isCurrentSessionActive = activeTerritorySession && displayTerritory?.id === activeTerritorySession.id;

  return (
    // 'home-screen-container' ID for measuring bounding boxes in the OnboardingOverlay
    <div id="home-screen-container" className="relative h-full flex flex-col bg-gray-100">
      
      {/* --- RENDER ONBOARDING TOURS --- */}
      {tour1Ready && (
        <OnboardingOverlay 
          screenKey="home_tour_part1" 
          steps={homeTourPart1} 
          onComplete={() => setIsLayersMenuOpen(true)} // Auto-open menu when done!
        />
      )}
      
      {tour2Ready && isLayersMenuOpen && (
        <OnboardingOverlay 
          screenKey="home_tour_part2" 
          steps={homeTourPart2} 
          onComplete={() => setIsLayersMenuOpen(false)} // Auto-close menu when done!
        />
      )}

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
        {/* Added 'tour-modes' ID here for onboarding targeting */}
        <div id="tour-modes" className="flex gap-1">
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

      <div className="flex-1 mx-3 mt-2 mb-3 border-2 border-gray-800 rounded-lg bg-gray-200 relative overflow-hidden z-0 shadow-sm flex flex-col">
        
        <MapContainer 
          center={mapCenter} 
          zoom={13} 
          zoomControl={false} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <MapClickHandler onClick={() => {
              setSelectedTerritory(null);
              setIsLayersMenuOpen(false); 
          }} />
          
          <TileLayer
            attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

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
              pathOptions={{ 
                color: territory.color, 
                fillColor: territory.color, 
                fillOpacity: 0.3, 
                weight: 2 
              }}
              eventHandlers={{
                click: () => {
                  setSelectedTerritory(territory)
                  setIsLayersMenuOpen(false)
                }
              }}
            />
          ))}

          <CircleMarker center={mapCenter} radius={7} pathOptions={{ color: 'white', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }} />
        </MapContainer>

        <div className="absolute top-2 right-2 flex flex-col items-end z-[400]">
            {/* Added 'tour-layers-btn' ID here for onboarding targeting */}
            <button 
                id="tour-layers-btn"
                onClick={() => setIsLayersMenuOpen(!isLayersMenuOpen)} 
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800 shadow-md transition-all active:scale-[0.95] ${isLayersMenuOpen ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
            >
                <span className="text-xl leading-none">🗺️</span>
            </button>

            {isLayersMenuOpen && (
                <div className="mt-2 w-48 bg-white border-2 border-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Map Layers
                    </div>
                    {/* Added 'tour-menu-filters' ID here to wrap Activity/Theft */}
                    <div id="tour-menu-filters" className="flex flex-col">
                        <button 
                            onClick={() => setShowHeatMap(!showHeatMap)} 
                            className="px-3 py-3 text-sm font-bold flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors"
                        >
                            <span className="flex items-center gap-2"><span className="w-4">🔥</span> Activity</span>
                            <div className={`w-8 h-4 rounded-full transition-colors relative ${showHeatMap ? 'bg-red-500' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showHeatMap ? 'translate-x-4' : ''}`}></div>
                            </div>
                        </button>
                        <button 
                            onClick={() => setShowTheftMap(!showTheftMap)} 
                            className="px-3 py-3 text-sm font-bold flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors"
                        >
                            <span className="flex items-center gap-2"><span className="w-4">🚨</span> Theft</span>
                            <div className={`w-8 h-4 rounded-full transition-colors relative ${showTheftMap ? 'bg-purple-500' : 'bg-gray-300'}`}>
                                <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showTheftMap ? 'translate-x-4' : ''}`}></div>
                            </div>
                        </button>
                    </div>
                    {/* Added 'tour-menu-territory' ID here */}
                    <button 
                        id="tour-menu-territory"
                        onClick={() => setShowTerritories(!showTerritories)} 
                        className="px-3 py-3 text-sm font-bold flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors"
                    >
                        <span className="flex items-center gap-2"><span className="w-4">🚩</span> Territories</span>
                        <div className={`w-8 h-4 rounded-full transition-colors relative ${showTerritories ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showTerritories ? 'translate-x-4' : ''}`}></div>
                        </div>
                    </button>
                    
                    <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                        Actions
                    </div>
                    {/* Added 'tour-menu-create' ID here */}
                    <button 
                        id="tour-menu-create"
                        onClick={() => setIsCreatingTerritory(!isCreatingTerritory)} 
                        className={`px-3 py-3 text-sm font-bold flex items-center justify-between transition-colors ${isCreatingTerritory ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-800'}`}
                    >
                        <span className="flex items-center gap-2"><span className="w-4">➕</span> {isCreatingTerritory ? 'Cancel Create' : 'New Territory'}</span>
                    </button>
                </div>
            )}
        </div>

        <button 
          onClick={() => alert('Centering on your location...')} 
          className={`absolute right-2 border-2 border-gray-800 rounded-full bg-white w-10 h-10 flex items-center justify-center text-lg shadow-md z-[400] active:bg-gray-100 transition-all duration-300 ${displayTerritory ? 'bottom-28' : 'bottom-2'}`}
        >
          📍
        </button>

        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-800 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-[1000] px-4 py-4 transition-transform duration-300 ease-in-out ${
              displayTerritory ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {displayTerritory && (
              <div>
                  {isCurrentSessionActive ? (
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                              <h2 className="text-sm font-bold text-gray-800">🚩 Capturing {displayTerritory.name}...</h2>
                              <span className="text-xs font-bold text-gray-600">
                                  {activeTerritorySession.progress} / {activeTerritorySession.target} km
                              </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden border border-gray-300">
                              <div 
                                  className="h-full rounded-full transition-all duration-1000" 
                                  style={{ 
                                      width: `${Math.min((activeTerritorySession.progress / activeTerritorySession.target) * 100, 100)}%`,
                                      backgroundColor: displayTerritory.color 
                                  }}
                              ></div>
                          </div>
                          {activeTerritorySession.progress >= activeTerritorySession.target ? (
                              <button 
                                  onClick={() => {
                                      alert("Territory Claimed!")
                                      setActiveTerritorySession(null)
                                      setSelectedTerritory(null)
                                  }}
                                  className="mt-2 w-full bg-green-500 text-white font-bold py-2 rounded-lg text-sm border-2 border-green-800 shadow-sm"
                              >
                                  Complete Capture! 🎉
                              </button>
                          ) : (
                              <button 
                                  onClick={() => setActiveTerritorySession(null)}
                                  className="mt-1 text-center text-xs text-red-500 font-bold py-1 active:scale-[0.98]"
                              >
                                  Cancel Session
                              </button>
                          )}
                      </div>
                  ) : (
                      <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 overflow-hidden">
                              <h2 className="text-base font-bold text-gray-800 truncate">{displayTerritory.name}</h2>
                              <p className="text-xs text-gray-500 truncate">Ride 2km to claim</p>
                          </div>
                          
                          <button 
                              onClick={handleStartCapture}
                              disabled={isClaiming || activeTerritorySession}
                              className={`font-bold text-sm px-4 py-2 rounded-xl border-2 border-gray-800 shadow-sm transition-all active:scale-[0.98] whitespace-nowrap flex items-center gap-1 ${
                                  (isClaiming || activeTerritorySession)
                                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400' 
                                      : 'text-white'
                              }`}
                              style={{ backgroundColor: (isClaiming || activeTerritorySession) ? '' : displayTerritory.color }}
                          >
                              {isClaiming ? '⏳...' : activeTerritorySession ? 'Busy' : '🚩 Start Capture'}
                          </button>

                          {!activeTerritorySession && (
                              <button 
                                  onClick={() => setSelectedTerritory(null)} 
                                  className="w-8 h-8 bg-gray-50 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition-colors shrink-0 font-bold"
                              >
                                  ✕
                              </button>
                          )}
                      </div>
                  )}
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomeScreen