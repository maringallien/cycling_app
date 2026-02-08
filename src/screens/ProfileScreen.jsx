import { useState } from 'react'

function ProfileScreen() {
  // --- State Definitions ---
  const [notifications, setNotifications] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // --- Dummy Data ---
  const userProfile = {
    name: 'Maria Santos',
    type: 'Commuter',
    memberSince: 'Sept 2023',
    avatarColor: 'bg-teal-600',
    stats: {
      rides: 142,
      distance: '1,240 km',
      contributions: 5
    }
  }

  const bikes = [
    { id: 1, name: 'Specialized Sirrus', type: 'Hybrid', primary: true },
    { id: 2, name: 'Brompton', type: 'Folding', primary: false }
  ]

  // --- Render ---
  return (
    <div className="flex flex-col h-full bg-gray-50">
      
      {/* Header Profile Card */}
      <div className="bg-white p-6 border-b border-gray-200 shadow-sm flex flex-col items-center">
        <div className={`w-24 h-24 rounded-full ${userProfile.avatarColor} flex items-center justify-center text-4xl mb-3 shadow-inner`}>
          <span role="img" aria-label="user avatar">👩🏽</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{userProfile.name}</h1>
        <div className="text-blue-600 font-medium text-sm px-3 py-1 bg-blue-50 rounded-full mt-1">
          {userProfile.type}
        </div>
        <p className="text-gray-400 text-xs mt-2">Member since {userProfile.memberSince}</p>

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

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
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
            <button className="w-full py-3 text-center text-blue-600 text-sm font-bold bg-gray-50 hover:bg-gray-100 border-t border-gray-100">
              + Add New Bike
            </button>
          </div>
        </section>

        {/* Preferences / Settings */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Preferences</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
            
            {/* Navigation Mode */}
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Default Navigation</div>
                <div className="text-xs text-gray-500">Preferred routing style</div>
              </div>
              <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                Safe Mode <span role="img" aria-label="shield">🛡️</span>
              </span>
            </div>

            {/* Notifications Toggle */}
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

             {/* Offline Maps Toggle */}
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
            <button className="w-full p-4 text-left font-medium text-gray-800 flex justify-between hover:bg-gray-50">
              Privacy Settings <span className="text-gray-400">›</span>
            </button>
            <button className="w-full p-4 text-left font-medium text-red-600 flex justify-between hover:bg-red-50">
              Log Out
            </button>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ProfileScreen