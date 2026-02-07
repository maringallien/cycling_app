import { useState } from 'react'
import RoutePreview from './RoutePreview'

function HomeScreen() {
  const [selectedMode, setSelectedMode] = useState('safe')
  const [searchText, setSearchText] = useState('')
  const [showHeatMap, setShowHeatMap] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [currentView, setCurrentView] = useState('home') // 'home' or 'preview'

  function handleSearch() {
    if (searchText.trim() === '') {
      setSearchError('Please enter a destination')
      return
    }
    setSearchError('')
    setCurrentView('preview')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  function handleBack() {
    setCurrentView('home')
  }

  function handleStartRide() {
    alert('Ride started! (Active navigation screen coming next)')
  }

  // Show Route Preview if user has searched
  if (currentView === 'preview') {
    return (
      <RoutePreview
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
      {/* Search bar */}
      <div className="px-3 pt-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <div className="border-2 border-gray-800 rounded-lg bg-white px-3 py-2 flex items-center gap-2">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value)
                  if (searchError) setSearchError('')
                }}
                onKeyDown={handleKeyDown}
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
            {searchError && (
              <p className="text-red-500 text-xs mt-1 ml-1">{searchError}</p>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="border-2 border-gray-800 rounded-lg bg-blue-500 text-white px-3 py-2 text-sm font-bold"
          >
            Go
          </button>
        </div>
      </div>

      {/* Mode selector */}
      <div className="px-3 pt-2">
        <div className="flex gap-1">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`flex-1 border-2 rounded-lg text-center py-1.5 text-xs font-bold transition-all
                ${selectedMode === mode.id
                  ? `${mode.color} border-gray-800`
                  : 'bg-white border-gray-300'}`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-1 ml-1">
          {modes.find((m) => m.id === selectedMode)?.desc}
        </p>
      </div>

      {/* Map area */}
      <div className="flex-1 mx-3 mt-2 mb-3 border-2 border-gray-800 rounded-lg bg-green-50 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-4xl">🗺️</div>
            <div className="text-xs mt-1">[ MAP AREA ]</div>
            <div className="text-xs">Your location: Downtown</div>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <line x1="0" y1="150" x2="340" y2="150" stroke="#888" strokeWidth="2" />
          <line x1="0" y1="250" x2="340" y2="250" stroke="#888" strokeWidth="2" />
          <line x1="100" y1="0" x2="100" y2="500" stroke="#888" strokeWidth="2" />
          <line x1="220" y1="0" x2="220" y2="500" stroke="#888" strokeWidth="2" />
        </svg>

        {showHeatMap && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <circle cx="100" cy="120" r="50" fill="rgba(239,68,68,0.3)" />
            <circle cx="100" cy="120" r="30" fill="rgba(239,68,68,0.5)" />
            <circle cx="220" cy="200" r="40" fill="rgba(249,115,22,0.3)" />
            <circle cx="220" cy="200" r="20" fill="rgba(249,115,22,0.5)" />
            <circle cx="160" cy="320" r="55" fill="rgba(234,179,8,0.2)" />
            <circle cx="160" cy="320" r="35" fill="rgba(234,179,8,0.4)" />
          </svg>
        )}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
        </div>

        <button
          onClick={() => setShowHeatMap(!showHeatMap)}
          className={`absolute top-2 right-2 border-2 border-gray-800 rounded px-2 py-1 text-xs font-bold transition-all
            ${showHeatMap ? 'bg-red-100 text-red-700' : 'bg-white text-gray-700'}`}
        >
          🔥 Heat Map {showHeatMap ? 'ON' : 'OFF'}
        </button>

        <button
          onClick={() => alert('Centering on your location...')}
          className="absolute bottom-2 right-2 border-2 border-gray-800 rounded-full bg-white w-9 h-9 flex items-center justify-center text-lg shadow"
        >
          📍
        </button>

        {showHeatMap && (
          <div className="absolute bottom-2 left-2 bg-white border border-gray-800 rounded px-2 py-1 text-xs">
            <div className="font-bold mb-0.5">Cycling Activity</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-yellow-400 opacity-60" /> Low</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-orange-400 opacity-60" /> Medium</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-red-500 opacity-60" /> High</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomeScreen