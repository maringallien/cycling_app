import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame'
import BottomNav from './components/BottomNav'
import HomeScreen from './screens/HomeScreen'
import ActivityScreen from './screens/ActivityScreen' 
import ProfileScreen from './screens/ProfileScreen'
import CommunityScreen from './screens/CommunityScreen'
import TerritoryScreen from './screens/TerritoryScreen'

function App() {
  const [currentTab, setCurrentTab] = useState('home')

  function renderScreen() {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />
      case 'activity':
        return <ActivityScreen /> 
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
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto h-full bg-gray-50">
          {renderScreen()}
        </div>
        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </PhoneFrame>
  )
}

export default App