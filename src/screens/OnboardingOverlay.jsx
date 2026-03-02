// Add this helper inside OnboardingOverlay component
  const getTargetBounds = (id) => {
    const el = document.getElementById(id)
    const parent = document.getElementById('home-screen-container') // Or whatever your main container is
    if (!el || !parent) return { top: '0px', left: '0px', width: '0px', height: '0px' }
    
    const rect = el.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()
    return {
      top: `${rect.top - parentRect.top - 4}px`, 
      left: `${rect.left - parentRect.left - 4}px`,
      width: `${rect.width + 8}px`,
      height: `${rect.height + 8}px`,
      borderRadius: '12px'
    }
  }

  // Then change `const { target } = step` to:
  const target = getTargetBounds(step.targetId)