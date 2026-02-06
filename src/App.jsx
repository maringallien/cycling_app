import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'

function App() {
  const [currentTab, setCurrentTab] = useState('home')

  function renderScreen() {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />
      case 'activity':
        return <div className="flex items-center justify-center h-full text-gray-400">Activity (coming soon) </div>
      case 'teritory':
        return <div className="flex items-center justify-center h-full text-gray-400">Territory (coming soon)</div>
      case 'community':
        return <div className="flex items-center justify-center h-full text-gray-400">Community (coming soon)</div>
      case 'profile':
        return <div className="flex items-center justify-center h-full text-gray-400">Profile (coming soon)</div>
      default:
        return <HomeScreen />
    }
  }


  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        {/* Screen content takes up all available space */}
        <div className="flex-1 overflow-y-auto">
          {renderScreen()}
        </div>
        {/* Nav bar always at the bottom */}
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </PhoneFrame>
  )
}

export default App