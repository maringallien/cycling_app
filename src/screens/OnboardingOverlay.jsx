import { useState, useEffect, useCallback } from 'react'

/**
 * OnboardingOverlay
 * 
 * A reusable first-time-visit tooltip system.
 * It takes an array of "steps" that describe UI regions to highlight,
 * and walks the user through them one at a time.
 * 
 * Props:
 *   - screenKey: string — unique key per screen (used in localStorage to track "seen" state)
 *   - steps: Array<{ target, title, description, position, icon }>
 *       target: { top, left, width, height } — the area to spotlight (in % or px)
 *       title: string
 *       description: string
 *       position: 'top' | 'bottom' | 'left' | 'right' — where the tooltip appears relative to spotlight
 *       icon: string (emoji)
 *   - onComplete: () => void — called when the user finishes or skips
 */

const STORAGE_PREFIX = 'cycleapp_onboarding_'

function OnboardingOverlay({ screenKey, steps, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [animatingOut, setAnimatingOut] = useState(false)
  const [tooltipAnim, setTooltipAnim] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_PREFIX + screenKey)
    if (!seen) {
      setVisible(true)
      // Small delay before tooltip animates in
      setTimeout(() => setTooltipAnim(true), 300)
    }
  }, [screenKey])

  const finish = useCallback(() => {
    setAnimatingOut(true)
    setTooltipAnim(false)
    setTimeout(() => {
      localStorage.setItem(STORAGE_PREFIX + screenKey, 'true')
      setVisible(false)
      setAnimatingOut(false)
      onComplete?.()
    }, 400)
  }, [screenKey, onComplete])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setTooltipAnim(false)
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        setTimeout(() => setTooltipAnim(true), 50)
      }, 200)
    } else {
      finish()
    }
  }

  const handleSkip = () => {
    finish()
  }

  if (!visible) return null

  const step = steps[currentStep]
  const { target } = step

  // Calculate tooltip position based on step.position
  const getTooltipStyle = () => {
    const base = {}
    
    switch (step.position) {
      case 'bottom':
        base.top = `calc(${target.top} + ${target.height} + 12px)`
        base.left = target.left
        base.width = `min(280px, 85vw)`
        break
      case 'top':
        base.bottom = `calc(100% - ${target.top} + 12px)`
        base.left = target.left
        base.width = `min(280px, 85vw)`
        break
      case 'right':
        base.top = target.top
        base.left = `calc(${target.left} + ${target.width} + 12px)`
        base.width = `min(240px, 70vw)`
        break
      case 'left':
        base.top = target.top
        base.right = `calc(100% - ${target.left} + 12px)`
        base.width = `min(240px, 70vw)`
        break
      default:
        base.top = `calc(${target.top} + ${target.height} + 12px)`
        base.left = target.left
        base.width = `min(280px, 85vw)`
    }

    return base
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div 
      className="absolute inset-0 z-50"
      style={{ 
        opacity: animatingOut ? 0 : 1, 
        transition: 'opacity 0.4s ease' 
      }}
    >
      {/* Dark overlay with cutout effect using CSS clip-path */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'rgba(0, 0, 0, 0.72)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />

      {/* Spotlight cutout - a transparent "hole" over the target area */}
      <div 
        className="absolute border-2 border-white/60 shadow-lg"
        style={{
          top: target.top,
          left: target.left,
          width: target.width,
          height: target.height,
          borderRadius: target.borderRadius || '12px',
          boxShadow: '0 0 0 4000px rgba(0,0,0,0.72), 0 0 20px 4px rgba(59,130,246,0.5)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 51,
        }}
      >
        {/* Pulsing ring around spotlight */}
        <div 
          className="absolute inset-0 border-2 border-blue-400 animate-ping"
          style={{ borderRadius: target.borderRadius || '12px', opacity: 0.4 }}
        />
      </div>

      {/* Tooltip Card */}
      <div 
        className="absolute z-52"
        style={{
          ...getTooltipStyle(),
          transform: tooltipAnim ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.95)',
          opacity: tooltipAnim ? 1 : 0,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 52,
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Progress bar */}
          <div className="h-1 bg-gray-100">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-4">
            {/* Icon + Title */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{step.title}</h3>
                <span className="text-[10px] text-gray-400 font-medium">
                  {currentStep + 1} of {steps.length}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 leading-relaxed mb-3.5 pl-0.5">
              {step.description}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleSkip}
                className="text-xs text-gray-400 font-medium hover:text-gray-600 transition-colors px-1 py-1"
              >
                Skip tour
              </button>
              <button 
                onClick={handleNext}
                className="bg-blue-600 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-sm active:scale-95 transition-transform"
              >
                {currentStep < steps.length - 1 ? 'Next →' : 'Got it! ✓'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingOverlay

/**
 * Helper hook: useOnboardingReset
 * Call this to reset onboarding for a specific screen (for testing)
 */
export function resetOnboarding(screenKey) {
  localStorage.removeItem(STORAGE_PREFIX + screenKey)
}

export function resetAllOnboarding() {
  Object.keys(localStorage)
    .filter(k => k.startsWith(STORAGE_PREFIX))
    .forEach(k => localStorage.removeItem(k))
}
