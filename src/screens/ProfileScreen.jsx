import { useState } from 'react'

// Import Sub-components
import RideDetail from '../components/profile/RideDetail'
import ProfileBattleDetail from '../components/profile/ProfileBattleDetail'

// Import Mock Data
import { 
  userProfile, 
  bikes, 
  weeklyData, 
  rideHistory, 
  personalTerritories, 
  dummyBattleDetails 
} from '../data/mockProfileData'

function ProfileScreen({ onStartDefending }) {
  // --- State Definitions ---
  const [notifications, setNotifications] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  
  // Navigation State
  const [view, setView] = useState('profile') // 'profile', 'ride-detail', or 'battle-detail'
  const [selectedRide, setSelectedRide] = useState(null)
  const [selectedBattle, setSelectedBattle] = useState(null)

  // --- Actions ---
  const handleRideClick = (ride) => {
    setSelectedRide(ride)
    setView('ride-detail')
  }

  const handleTerritoryClick = (territory) => {
    setSelectedBattle({
      zone: territory.name,
      enemy: 'Rival Crew',
      ...dummyBattleDetails
    })
    setView('battle-detail')
  }

  const handleBackToProfile = () => {
    setSelectedRide(null)
    setSelectedBattle(null)
    setView('profile')
  }

  // --- Render Sub-Views ---
  if (view === 'battle-detail') {
    return <ProfileBattleDetail battle={selectedBattle} handleBack={handleBackToProfile} onStartDefending={onStartDefending} />
  }

  if (view === 'ride-detail') {
    return <RideDetail ride={selectedRide} handleBack={handleBackToProfile} />
  }

  // --- Render: Main Profile View ---
  return (
    <div className="bg-gray-50 min-h-full pb-8">
      
      {/* Header Profile Card */}
      <div className="bg-white p-6 border-b border-gray-200 shadow-sm flex flex-col items-center">
        <div className={`w-24 h-24 rounded-full ${userProfile.avatarColor} flex items-center justify-center text-4xl mb-3 shadow-inner`}>
          <span role="img" aria-label="user avatar">👩🏽</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{userProfile.name}</h1>
        <div className="text-blue-600 font-medium text-sm px-3 py-1 bg-blue-50 rounded-full mt-1">
          {userProfile.type}
        </div>
        
        {/* Quick Stats Row */}
        <div className="flex w-full justify-between mt-6 px-4 divide-x divide-gray-200">
          <div className="flex-1 text-center">
            <div className="font-bold text-gray-800">{userProfile.stats.rides}</div>
            <div className="text-xs text-gray-500">Rides</div>
          </div>
          <div className="flex-1 text-center">
            <div className="font-bold text-gray-800">{userProfile.stats.distance}</div>
            <div className="text-xs text-gray-500">Distance</div>
          </div>
          <div className="flex-1 text-center">
            <div className="font-bold text-gray-800">{userProfile.stats.contributions}</div>
            <div className="text-xs text-gray-500">Reviews</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Weekly Activity Chart */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Weekly Activity</h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-end h-24">
                {weeklyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1 w-8">
                    <div className="w-full bg-gray-100 rounded-t-sm relative h-16 flex items-end overflow-hidden">
                    <div 
                        className="w-full bg-blue-500 rounded-t-sm"
                        style={{ height: d.height }}
                    ></div>
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold">{d.day}</span>
                </div>
                ))}
            </div>
          </div>
        </section>

        {/* My Territories Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">My Territories</h2>
          <div className="max-h-60 overflow-y-auto pr-1 space-y-3 pb-1">
              {personalTerritories.map((territory) => (
              <button 
                  key={territory.id}
                  onClick={() => handleTerritoryClick(territory)}
                  className="w-full bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 text-left transition-transform active:scale-[0.98]"
              >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 shadow-inner text-white"
                    style={{ backgroundColor: territory.color }}
                  >
                    🚩
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-bold text-gray-800 text-sm">{territory.name}</div>
                    <div className="text-[10px] text-gray-500">{territory.detail}</div>
                  </div>

                  <div className="text-right">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${territory.status === 'Claimed' ? 'bg-green-100 text-green-700' : territory.status === 'Lost' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'}`}>
                        {territory.status}
                    </span>
                  </div>
              </button>
              ))}
          </div>
        </section>

        {/* My Garage Section */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">My Garage</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {bikes.map((bike, index) => (
              <div key={bike.id} className={`p-4 flex items-center justify-between ${index !== bikes.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl" role="img" aria-label="bicycle">🚲</span>
                  <div>
                    <div className="font-bold text-gray-800">{bike.name}</div>
                    <div className="text-xs text-gray-500">{bike.type}</div>
                  </div>
                </div>
                {bike.primary && (
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Primary</span>
                )}
              </div>
            ))}
            <button className="w-full py-3 text-center text-blue-600 text-sm font-bold bg-gray-50 hover:bg-gray-100 border-t border-gray-100 transition-colors">
              + Add New Bike
            </button>
          </div>
        </section>

        {/* Recent Rides */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Recent Rides</h2>
          <div className="max-h-64 overflow-y-auto pr-1 space-y-3 pb-1">
              {rideHistory.map((ride) => (
              <button 
                  key={ride.id}
                  onClick={() => handleRideClick(ride)}
                  className="w-full bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 text-left transition-transform active:scale-[0.98]"
              >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0
                  ${ride.mode === 'Safe' ? 'bg-green-100' : ride.mode === 'Direct' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                  {ride.mode === 'Safe' ? '🛡️' : ride.mode === 'Direct' ? '🛤️' : '🧭'}
                  </div>
                  
                  <div className="flex-1">
                  <div className="font-bold text-gray-800 text-xs">{ride.route}</div>
                  <div className="text-[10px] text-gray-500">{ride.date}</div>
                  </div>

                  <div className="text-right">
                  <div className="font-bold text-gray-800 text-xs">{ride.distance}</div>
                  </div>
              </button>
              ))}
          </div>
        </section>

        {/* Preferences / Settings */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Preferences</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Default Navigation</div>
                <div className="text-xs text-gray-500">Preferred routing style</div>
              </div>
              <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                Safe Mode <span role="img" aria-label="shield">🛡️</span>
              </span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Safety Alerts</div>
                <div className="text-xs text-gray-500">Warn about high traffic areas</div>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${notifications ? 'translate-x-5' : ''}`}></div>
              </button>
            </div>
             <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Offline Maps</div>
                <div className="text-xs text-gray-500">Save data usage</div>
              </div>
              <button 
                onClick={() => setOfflineMode(!offlineMode)}
                className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${offlineMode ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${offlineMode ? 'translate-x-5' : ''}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Account Actions */}
        <section className="pb-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
            <button className="w-full p-4 text-left font-medium text-gray-800 flex justify-between hover:bg-gray-50 transition-colors">
              Privacy Settings <span className="text-gray-400">›</span>
            </button>
            <button className="w-full p-4 text-left font-medium text-red-600 flex justify-between hover:bg-red-50 transition-colors">
              Log Out
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ProfileScreen