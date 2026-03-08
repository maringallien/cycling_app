import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import CommunityScreen from './screens/CommunityScreen'
import RoutesScreen from './screens/RoutesScreen'
import ActiveNavigation from './screens/ActiveNavigation'

function App() {
  const [currentTab, setCurrentTab] = useState('home')
  const [navigatingRoute, setNavigatingRoute] = useState(null)
  
  // Global states
  const [activeTerritorySession, setActiveTerritorySession] = useState(null)
  const [isTracingRoute, setIsTracingRoute] = useState(false)
  const [isDefending, setIsDefending] = useState(false) // NEW STATE

  function renderScreen() {
    switch (currentTab) {
      case 'home':
        return (
          <HomeScreen 
            activeTerritorySession={activeTerritorySession} 
            setActiveTerritorySession={setActiveTerritorySession} 
            isTracingRoute={isTracingRoute}
            onStopTracing={() => setIsTracingRoute(false)}
            isDefending={isDefending} // Pass to Home
            onStopDefending={() => setIsDefending(false)} // Pass to Home
          />
        )
      case 'routes':
        return (
          <RoutesScreen 
            onStartRoute={(route) => setNavigatingRoute(route)} 
            activeTerritorySession={activeTerritorySession}
            onCreateNewRoute={() => {
              setIsTracingRoute(true)
              setCurrentTab('home') 
            }}
          />
        )
      case 'community':
        return (
          <CommunityScreen 
            onStartDefending={() => { // NEW PROP
              setIsDefending(true)
              setCurrentTab('home')
            }}
          />
        )
      case 'profile':
        return (
          <ProfileScreen 
            onStartDefending={() => {
              setIsDefending(true)
              setCurrentTab('home')
            }}
          />
        )
      default:
        return (
          <HomeScreen 
            activeTerritorySession={activeTerritorySession} 
            setActiveTerritorySession={setActiveTerritorySession}
            isTracingRoute={isTracingRoute} 
            onStopTracing={() => setIsTracingRoute(false)}
            isDefending={isDefending} 
            onStopDefending={() => setIsDefending(false)}
          />
        )
    }
  }

  if (navigatingRoute) {
    return (
      <PhoneFrame>
        <ActiveNavigation 
          destination={navigatingRoute.name} 
          mode="safe" 
          onEndRide={() => setNavigatingRoute(null)} 
        />
      </PhoneFrame>
    )
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-200 shadow-sm z-10 shrink-0">
          <span className="font-bold text-xl tracking-tight text-blue-600 italic">CycleApp</span>
          <button 
            onClick={() => setCurrentTab('profile')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all 
              ${currentTab === 'profile' ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <span role="img" aria-label="profile" className="text-lg">👤</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {renderScreen()}
        </div>

        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </PhoneFrame>
  )
}

export default App  