import { useState } from 'react'

function TerritoryScreen() {
  const [viewMode, setViewMode] = useState('territory') // 'territory' or 'heatmap'
  const [selectedZone, setSelectedZone] = useState(null)

  // Dummy data representing map zones
  // In a real app, these would be polygons on a map (Google Maps/Mapbox)
  const zones = [
    { 
      id: 1, 
      name: 'Riverside Path', 
      owner: 'Rivals', 
      ownerName: 'The Road Runners',
      status: 'Contested',
      health: 45, // 45% health left for current owner
      color: 'bg-red-500',
      position: { top: '30%', left: '20%', width: '140px', height: '140px', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }
    },
    { 
      id: 2, 
      name: 'Downtown Core', 
      owner: 'You', 
      ownerName: 'Your Group',
      status: 'Secured',
      health: 90,
      color: 'bg-blue-500',
      position: { top: '50%', left: '50%', width: '160px', height: '120px', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }
    },
    { 
      id: 3, 
      name: 'Hilltop Park', 
      owner: 'Neutral', 
      ownerName: 'None',
      status: 'Open',
      health: 0,
      color: 'bg-gray-300',
      position: { top: '15%', left: '60%', width: '100px', height: '100px', borderRadius: '50%' }
    }
  ]

  const handleZoneClick = (e, zone) => {
    e.stopPropagation()
    setSelectedZone(zone)
  }

  const closePopup = () => setSelectedZone(null)

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden" onClick={closePopup}>
      
      {/* Header / Mode Switcher */}
      <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
        <button 
          onClick={() => setViewMode('territory')}
          className={`flex-1 py-2 rounded-full text-sm font-bold shadow-sm backdrop-blur-md border transition-all
            ${viewMode === 'territory' ? 'bg-white/90 text-blue-600 border-blue-200' : 'bg-gray-900/40 text-white border-transparent'}`}
        >
          🏰 Territories
        </button>
        <button 
          onClick={() => setViewMode('heatmap')}
          className={`flex-1 py-2 rounded-full text-sm font-bold shadow-sm backdrop-blur-md border transition-all
            ${viewMode === 'heatmap' ? 'bg-white/90 text-orange-600 border-orange-200' : 'bg-gray-900/40 text-white border-transparent'}`}
        >
          🔥 Heat Map
        </button>
      </div>

      {/* Map Visualization Area */}
      <div className="flex-1 relative bg-gray-200 overflow-hidden">
        
        {/* Decorative Grid Lines to simulate map */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* Heatmap Overlay (Conditional) */}
        {viewMode === 'heatmap' && (
          <div className="absolute inset-0 z-0 opacity-60 bg-gradient-to-tr from-transparent via-orange-300 to-red-500 mix-blend-multiply pointer-events-none"></div>
        )}

        {/* Territory Zones (Simulated Polygons) */}
        {viewMode === 'territory' && zones.map(zone => (
          <div
            key={zone.id}
            onClick={(e) => handleZoneClick(e, zone)}
            style={{ 
              ...zone.position,
              position: 'absolute',
              boxShadow: zone.id === selectedZone?.id ? '0 0 0 4px white, 0 10px 20px rgba(0,0,0,0.3)' : 'none'
            }}
            className={`${zone.color} opacity-80 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex items-center justify-center text-white font-bold text-xs shadow-lg animate-pulse-slow`}
          >
             {zone.owner === 'You' ? '👑' : zone.owner === 'Rivals' ? '⚔️' : ''}
          </div>
        ))}

        {/* User Location Marker */}
        <div className="absolute top-[55%] left-[45%] w-6 h-6 bg-blue-600 border-4 border-white rounded-full shadow-lg z-10 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Zone Details Bottom Sheet (Pop up when zone clicked) */}
      {selectedZone && (
        <div className="absolute bottom-24 left-4 right-4 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-30 animate-slide-up">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-800">{selectedZone.name}</h2>
              <div className="text-sm text-gray-500">Controlled by: <span className="font-bold">{selectedZone.ownerName}</span></div>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${
              selectedZone.status === 'Contested' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}>
              {selectedZone.status}
            </div>
          </div>

          {/* Health Bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
            <div 
              className={`h-full ${selectedZone.owner === 'You' ? 'bg-blue-500' : 'bg-red-500'}`} 
              style={{ width: `${selectedZone.health}%` }}
            ></div>
          </div>

          <div className="flex gap-3">
             <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold shadow-md active:bg-blue-700">
               {selectedZone.owner === 'You' ? 'Defend Territory' : 'Attack Territory'}
             </button>
             <button className="px-4 py-3 border border-gray-200 rounded-lg text-gray-500 font-bold bg-gray-50">
               📊 Stats
             </button>
          </div>
        </div>
      )}

      {/* Floating Action Button (Start Loop) - Visible when nothing selected */}
      {!selectedZone && (
        <div className="absolute bottom-24 right-4 z-20">
          <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg font-bold flex items-center gap-2 pr-6 hover:bg-blue-700 transition-colors">
            <span className="text-2xl">+</span>
            <span>Claim Area</span>
          </button>
        </div>
      )}

      {/* Leaderboard Ticker */}
      <div className="bg-white border-t border-gray-200 p-3 z-20">
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1">
          <span>Weekly Leaderboard</span>
          <span className="text-blue-600">View All</span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100 shrink-0">
            <span className="text-lg">🥇</span>
            <span className="font-bold text-gray-800">Marcus C.</span>
            <span className="text-yellow-600 font-bold">1400pts</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 shrink-0">
             <span className="text-lg">🥈</span>
             <span className="font-bold text-gray-800">Sarah J.</span>
             <span className="text-gray-600 font-bold">1250pts</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerritoryScreen