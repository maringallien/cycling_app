import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import CommunityScreen from './screens/CommunityScreen'
import TerritoryScreen from './screens/TerritoryScreen'
import RoutesScreen from './screens/RoutesScreen'

function App() {
  const [currentTab, setCurrentTab] = useState('home')

  function renderScreen() {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />
      case 'routes':
        return <RoutesScreen />
      case 'territory':
        return <TerritoryScreen />
      case 'community':
        return <CommunityScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full bg-gray-50">
        
        {/* Top Header with Profile Icon */}
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