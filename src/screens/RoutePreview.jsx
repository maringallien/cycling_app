import { useState } from 'react'

function RoutePreview({ destination, mode, onStartRide, onBack }) {
    const [showAllSteps, setShowAllSteps] = useState(false)

    // --- Mock Data ---
  // In a real app, this data would come from a backend API (like Google Maps or Mapbox)
  const routeData = {
    direct: {
      distance: '7.8 km',
      time: '24 min',
      elevation: '62 m',
      difficulty: 'Moderate',
      difficultyColor: 'bg-yellow-100',
      safety: 3, // Used for star rating (3/5)
      steps: [
        { text: 'Head north on Main St (1.4 km)', color: 'bg-blue-500' },
        { text: 'Turn right onto Highway Ave (2.1 km)', color: 'bg-red-500' }, // Red indicates danger
        { text: 'Continue on Industrial Rd (1.8 km)', color: 'bg-orange-500' },
        { text: 'Turn left onto Park Blvd (1.2 km)', color: 'bg-blue-500' },
        { text: 'Arrive at destination (1.3 km)', color: 'bg-blue-500' },
      ],
    },
    safe: {
      distance: '9.2 km',
      time: '32 min',
      elevation: '45 m',
      difficulty: 'Easy',
      difficultyColor: 'bg-green-100',
      safety: 5, // 5/5 Safety
      steps: [
        { text: 'Head north on Oak St bike lane (1.2 km)', color: 'bg-blue-500' },
        { text: 'Turn right onto Riverside Path (3.4 km)', color: 'bg-blue-500' },
        { text: 'Continue on Park Trail (2.8 km)', color: 'bg-blue-500' },
        { text: 'Turn left onto School Lane (1.0 km)', color: 'bg-blue-500' },
        { text: 'Arrive at destination (0.8 km)', color: 'bg-blue-500' },
      ],
    },
    discovery: {
      distance: '12.1 km',
      time: '45 min',
      elevation: '78 m',
      difficulty: 'Moderate',
      difficultyColor: 'bg-yellow-100',
      safety: 4,
      steps: [
        { text: 'Head north on Oak St bike lane (1.2 km)', color: 'bg-blue-500' },
        { text: 'Turn right onto Waterfront Scenic Path (3.8 km)', color: 'bg-blue-500' },
        { text: 'Continue through Botanical Gardens (2.4 km)', color: 'bg-blue-500' },
        { text: 'Turn onto Heritage District trail (2.2 km)', color: 'bg-blue-500' },
        { text: 'Continue on Park Blvd (1.5 km)', color: 'bg-orange-500' },
        { text: 'Arrive at destination (1.0 km)', color: 'bg-blue-500' },
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
  const setpsToShow = showAllSteps ? route.steps : route.steps.slice(0, 3)

  return (
    <div className="relative h-full flex flex-col bg-gray-100">
      
      {/* --- Section 1: Header --- */}
      <div className="flex items-center px-3 py-2 border-b-2 border-gray-800 bg-gray-200">
        <button onClick={onBack} className="text-sm font-bold text-blue-600">
          ← Back
        </button>
        <span className="flex-1 text-center font-bold text-sm">Route Preview</span>
        <div className="w-12" /> {/* Empty spacer div to keep title centered perfectly */}
      </div>

      <div className="flex-1 overflow-y-auto">
        
        {/* --- Section 2: Mode Card --- */}
        {/* Dynamically colors the box based on the mode (Green, Blue, or Yellow) */}
        <div className="mx-3 mt-2 border-2 border-gray-800 rounded-lg px-3 py-2" style={{ backgroundColor: modeInfo.color === 'bg-green-100' ? '#dcfce7' : modeInfo.color === 'bg-blue-100' ? '#dbeafe' : '#fef9c3' }}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-bold">{modeInfo.icon} {modeInfo.label}</span>
            <span className="bg-white px-2 rounded font-bold border border-gray-300">
              {/* Star Generator: Repeat star char based on safety score */}
              Safety: {'★'.repeat(route.safety)}{'☆'.repeat(5 - route.safety)}
            </span>
          </div>
          <div className="text-xs text-gray-600">
            Your Location → {destination || 'Unknown Destination'}
          </div>
        </div>

        {/* --- Section 3: Stats Grid --- */}
        <div className="flex mx-3 mt-2 gap-1">
          {/* Distance */}
          <div className="flex-1 border-2 border-gray-800 rounded bg-white text-center py-1.5">
            <div className="text-sm font-bold">{route.distance}</div>
            <div className="text-xs text-gray-500">Distance</div>
          </div>
          {/* Time */}
          <div className="flex-1 border-2 border-gray-800 rounded bg-white text-center py-1.5">
            <div className="text-sm font-bold">{route.time}</div>
            <div className="text-xs text-gray-500">Est. Time</div>
          </div>
          {/* Elevation */}
          <div className="flex-1 border-2 border-gray-800 rounded bg-white text-center py-1.5">
            <div className="text-sm font-bold">{route.elevation}</div>
            <div className="text-xs text-gray-500">Elevation</div>
          </div>
          {/* Difficulty (Colored background changes based on route data) */}
          <div className={`flex-1 border-2 border-gray-800 rounded text-center py-1.5 ${route.difficultyColor}`}>
            <div className="text-sm font-bold">{route.difficulty}</div>
            <div className="text-xs text-gray-500">Difficulty</div>
          </div>
        </div>

        {/* --- Section 4: Map Visualizer --- */}
        <div className="mx-3 mt-2 border-2 border-gray-800 rounded-lg bg-green-50 relative" style={{ height: '180px' }}>
          <svg className="absolute inset-0 w-full h-full">
            {/* User Start Point */}
            <circle cx="40" cy="150" r="7" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
            <text x="52" y="155" fontSize="9" fill="#333">📍 You</text>

            {/* Dynamic Route Drawing: Renders different SVG paths based on mode */}
            {mode === 'direct' ? (
              // Direct Mode: Straighter lines, Red/Orange colors indicating busy roads
              <>
                <path d="M 40 150 Q 60 130 80 120" stroke="#3B82F6" strokeWidth="4" fill="none" />
                <path d="M 80 120 Q 120 90 170 70" stroke="#EF4444" strokeWidth="4" fill="none" />
                <path d="M 170 70 Q 210 55 250 45" stroke="#F97316" strokeWidth="4" fill="none" />
                <path d="M 250 45 Q 270 40 290 35" stroke="#3B82F6" strokeWidth="4" fill="none" />
              </>
            ) : mode === 'discovery' ? (
              // Discovery Mode: Very curvy path to simulate wandering/scenic route
              <>
                <path d="M 40 150 Q 30 100 60 80 Q 100 50 150 60 Q 200 70 230 50 Q 260 35 290 35" stroke="#3B82F6" strokeWidth="4" fill="none" />
                {/* Extra labels specific to Discovery mode */}
                <text x="80" y="45" fontSize="7" fill="#22C55E">🌳 scenic</text>
                <text x="180" y="55" fontSize="7" fill="#22C55E">🌸 gardens</text>
              </>
            ) : (
              // Default (Safe) Mode: Smooth curves, consistent blue/safe color
              <>
                <path d="M 40 150 Q 70 130 100 110 Q 150 80 200 60 Q 240 45 290 35" stroke="#3B82F6" strokeWidth="4" fill="none" />
                <text x="80" y="95" fontSize="7" fill="#22C55E">🚲 bike path</text>
                <text x="190" y="50" fontSize="7" fill="#22C55E">🚲 bike path</text>
              </>
            )}

            {/* Destination Point */}
            <circle cx="290" cy="35" r="7" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
            <text x="245" y="25" fontSize="9" fill="#333">📍 {destination ? destination.slice(0, 10) : 'Dest.'}</text>
          </svg>

          {/* Map Legend overlay */}
          <div className="absolute bottom-2 left-2 bg-white border border-gray-800 rounded px-2 py-1 text-xs">
            <div className="flex items-center gap-1"><div className="w-4 h-1 bg-blue-500 rounded" /> Safe</div>
            <div className="flex items-center gap-1"><div className="w-4 h-1 bg-orange-500 rounded" /> Caution</div>
            <div className="flex items-center gap-1"><div className="w-4 h-1 bg-red-500 rounded" /> Danger</div>
          </div>
        </div>

        {/* --- Section 5: Route Steps List --- */}
        <div className="mx-3 mt-2 border-2 border-gray-800 rounded-lg bg-white px-3 py-2">
          <div className="font-bold text-xs mb-1.5">Route Steps:</div>
          {/* Map through the steps array (either full list or just top 3) */}
          {stepsToShow.map((step, i) => (
            <div key={i} className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${step.color} shrink-0`} />
              <span className="text-xs text-gray-600">{i + 1}. {step.text}</span>
            </div>
          ))}
          
          {/* Show "See all" button only if there are more than 3 steps */}
          {route.steps.length > 3 && (
            <button
              onClick={() => setShowAllSteps(!showAllSteps)}
              className="text-blue-500 text-xs mt-1"
            >
              {showAllSteps ? 'Show less ↑' : `See all ${route.steps.length} steps →`}
            </button>
          )}
        </div>

        {/* --- Section 6: Conditional Warnings --- */}
        {/* Only rendered if user selected the risky 'direct' mode */}
        {mode === 'direct' && (
          <div className="mx-3 mt-2 border-2 border-red-400 rounded-lg bg-red-50 px-3 py-2">
            <div className="font-bold text-xs text-red-700">⚠️ Route Warnings:</div>
            <div className="text-xs text-red-600 mt-1">• Highway Ave (km 1.4–3.5): High-speed traffic, no bike lane</div>
            <div className="text-xs text-red-600">• Industrial Rd (km 3.5–5.3): Heavy truck traffic</div>
          </div>
        )}

        {/* --- Section 7: Start Button --- */}
        <div className="mx-3 mt-3 mb-3">
          <button
            onClick={onStartRide}
            className="w-full border-2 border-gray-800 rounded-lg bg-green-500 text-white text-center py-3 font-bold text-lg active:bg-green-600"
          >
            ▶ START RIDE
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoutePreview
