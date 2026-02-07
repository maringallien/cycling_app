import { useState, useEffect } from 'react'

function ActiveNavigation({ destination, mode, onEndRide }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [speed, setSpeed] = useState(18)
  const [distanceLeft, setDistanceLeft] = useState(7.2)
  const [timeLeft, setTimeLeft] = useState(24)
  const [showWarning, setShowWarning] = useState(false)

  // Simulate speed changes every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 10) + 14) // 14–23 km/h
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Route steps per mode
  const steps = {
    direct: [
      { instruction: 'Head north on Main St', distance: '1.4 km', icon: '⬆️', warning: null },
      { instruction: 'Turn right onto Highway Ave', distance: '2.1 km', icon: '➡️', warning: '⚠️ High-speed traffic ahead — no bike lane' },
      { instruction: 'Continue on Industrial Rd', distance: '1.8 km', icon: '⬆️', warning: '⚠️ Heavy truck traffic — stay alert' },
      { instruction: 'Turn left onto Park Blvd', distance: '1.2 km', icon: '⬅️', warning: null },
      { instruction: 'Arrive at destination', distance: '0 m', icon: '🏁', warning: null },
    ],
    safe: [
      { instruction: 'Head north on Oak St bike lane', distance: '1.2 km', icon: '⬆️', warning: null },
      { instruction: 'Turn right onto Riverside Path', distance: '3.4 km', icon: '➡️', warning: null },
      { instruction: 'Continue on Park Trail', distance: '2.8 km', icon: '⬆️', warning: null },
      { instruction: 'Turn left onto School Lane', distance: '1.0 km', icon: '⬅️', warning: null },
      { instruction: 'Arrive at destination', distance: '0 m', icon: '🏁', warning: null },
    ],
    discovery: [
      { instruction: 'Head north on Oak St bike lane', distance: '1.2 km', icon: '⬆️', warning: null },
      { instruction: 'Turn right onto Waterfront Path', distance: '3.8 km', icon: '➡️', warning: null },
      { instruction: 'Continue through Botanical Gardens', distance: '2.4 km', icon: '⬆️', warning: null },
      { instruction: 'Turn onto Heritage District trail', distance: '2.2 km', icon: '⬅️', warning: null },
      { instruction: 'Continue on Park Blvd', distance: '1.5 km', icon: '⬆️', warning: '⚠️ Short stretch on busy road' },
      { instruction: 'Arrive at destination', distance: '0 m', icon: '🏁', warning: null },
    ],
  }

  const currentSteps = steps[mode] || steps.safe
  const currentStep = currentSteps[currentStepIndex]
  const nextStep = currentSteps[currentStepIndex + 1] || null
  const progress = ((currentStepIndex) / (currentSteps.length - 1)) * 100

  function handleNextStep() {
    if (currentStepIndex < currentSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
      setDistanceLeft((prev) => Math.max(0, prev - 1.5).toFixed(1))
      setTimeLeft((prev) => Math.max(0, prev - 5))
    }
  }

  function handlePrevStep() {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
      setDistanceLeft((prev) => (parseFloat(prev) + 1.5).toFixed(1))
      setTimeLeft((prev) => prev + 5)
    }
  }

  // Check if current step has a warning
  useEffect(() => {
    if (currentStep?.warning) {
      setShowWarning(true)
    } else {
      setShowWarning(false)
    }
  }, [currentStepIndex, currentStep])

  const modeColors = {
    direct: { bg: 'bg-blue-600', text: 'Direct' },
    safe: { bg: 'bg-green-600', text: 'Safe' },
    discovery: { bg: 'bg-yellow-600', text: 'Discovery' },
  }
  const modeStyle = modeColors[mode] || modeColors.safe

  return (
    <div className="relative h-full flex flex-col bg-gray-900 text-white">

      {/* --- Header Bar --- */}
      <div className={`flex items-center justify-between px-3 py-2 ${modeStyle.bg}`}>
        <span className="text-xs font-bold">🚴 {modeStyle.text} Mode</span>
        <span className="text-xs font-bold">→ {destination || 'Destination'}</span>
        <button
          onClick={() => {
            if (window.confirm('End this ride?')) {
              onEndRide()
            }
          }}
          className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold"
        >
          ✕ End
        </button>
      </div>

      {/* --- Progress Bar --- */}
      <div className="w-full bg-gray-700 h-1.5">
        <div
          className={`h-1.5 transition-all duration-500 ${modeStyle.bg}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* --- Map Area (simulated) --- */}
      <div className="flex-1 relative bg-gray-800 overflow-hidden" style={{ minHeight: '200px' }}>
        <svg className="absolute inset-0 w-full h-full">
          {/* Simulated road grid */}
          <line x1="0" y1="100" x2="340" y2="100" stroke="#555" strokeWidth="1" />
          <line x1="0" y1="200" x2="340" y2="200" stroke="#555" strokeWidth="1" />
          <line x1="170" y1="0" x2="170" y2="400" stroke="#555" strokeWidth="1" />

          {/* Active route line */}
          <path
            d="M 170 350 Q 170 200 170 150 Q 170 100 250 100"
            stroke="#3B82F6"
            strokeWidth="5"
            fill="none"
            strokeDasharray={mode === 'direct' ? '0' : '10,5'}
          />

          {/* User position */}
          <circle cx="170" cy="200" r="10" fill="#3B82F6" stroke="white" strokeWidth="3" />
          <circle cx="170" cy="200" r="16" fill="none" stroke="#3B82F6" strokeWidth="2" opacity="0.5">
            <animate attributeName="r" from="16" to="28" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
          </circle>

          {/* Direction arrow */}
          {currentStep?.icon === '⬆️' && (
            <polygon points="170,160 160,180 180,180" fill="white" opacity="0.7" />
          )}
          {currentStep?.icon === '➡️' && (
            <polygon points="200,200 180,190 180,210" fill="white" opacity="0.7" />
          )}
          {currentStep?.icon === '⬅️' && (
            <polygon points="140,200 160,190 160,210" fill="white" opacity="0.7" />
          )}
        </svg>

        {/* Speed overlay */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-70 rounded-lg px-3 py-2 text-center">
          <div className="text-2xl font-bold">{speed}</div>
          <div className="text-xs text-gray-300">km/h</div>
        </div>

        {/* ETA overlay */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-70 rounded-lg px-3 py-2 text-center">
          <div className="text-sm font-bold">{distanceLeft} km</div>
          <div className="text-xs text-gray-300">~{timeLeft} min left</div>
        </div>
      </div>

      {/* --- Warning Banner (conditional) --- */}
      {showWarning && (
        <div className="bg-red-600 px-3 py-2 flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <span className="text-xs font-bold flex-1">{currentStep.warning}</span>
          <button
            onClick={() => setShowWarning(false)}
            className="text-xs bg-red-800 px-2 py-0.5 rounded"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* --- Current Direction Card --- */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="px-4 py-3">
          {/* Current step */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">{currentStep?.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-sm">{currentStep?.instruction}</div>
              <div className="text-xs text-gray-400">In {currentStep?.distance}</div>
            </div>
            <div className="text-xs text-gray-500">
              Step {currentStepIndex + 1}/{currentSteps.length}
            </div>
          </div>

          {/* Next step preview */}
          {nextStep && (
            <div className="mt-2 pt-2 border-t border-gray-700 flex items-center gap-3 opacity-60">
              <div className="text-lg">{nextStep.icon}</div>
              <div className="text-xs">Then: {nextStep.instruction} ({nextStep.distance})</div>
            </div>
          )}
        </div>

        {/* Navigation controls (for demo purposes — simulate moving through steps) */}
        <div className="flex border-t border-gray-700">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`flex-1 py-2 text-center text-xs font-bold border-r border-gray-700
              ${currentStepIndex === 0 ? 'text-gray-600' : 'text-blue-400 active:bg-gray-700'}`}
          >
            ← Previous Step
          </button>
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === currentSteps.length - 1}
            className={`flex-1 py-2 text-center text-xs font-bold
              ${currentStepIndex === currentSteps.length - 1 ? 'text-gray-600' : 'text-blue-400 active:bg-gray-700'}`}
          >
            Next Step →
          </button>
        </div>
      </div>
    </div>
  )
}

export default ActiveNavigation