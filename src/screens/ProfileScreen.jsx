import { useState } from 'react'

function ProfileScreen() {
  // --- State Definitions ---
  const [notifications, setNotifications] = useState(true)
  const [offlineMode, setOfflineMode] = useState(false)
  const [view, setView] = useState('profile') // 'profile' or 'ride-detail'
  const [selectedRide, setSelectedRide] = useState(null)

  // --- Dummy Data (Profile) ---
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

  // --- Dummy Data (Activity) ---
  const weeklyData = [
    { day: 'M', km: 12, height: '40%' },
    { day: 'T', km: 0, height: '5%' },
    { day: 'W', km: 24, height: '70%' },
    { day: 'T', km: 8, height: '25%' },
    { day: 'F', km: 15, height: '50%' },
    { day: 'S', km: 45, height: '100%' },
    { day: 'S', km: 30, height: '75%' },
  ]

  const rideHistory = [
    { id: 1, date: 'Today, 8:30 AM', route: 'Morning Commute', distance: '8.4 km', time: '28 min', avgSpeed: '18.2 km/h', mode: 'Direct', elevation: '45m' },
    { id: 2, date: 'Yesterday, 5:15 PM', route: 'Ride Home', distance: '8.5 km', time: '32 min', avgSpeed: '16.5 km/h', mode: 'Safe', elevation: '42m' },
    { id: 3, date: 'Sat, Oct 24', route: 'Weekend Loop', distance: '42.0 km', time: '2h 15m', avgSpeed: '19.8 km/h', mode: 'Discovery', elevation: '320m' },
    { id: 4, date: 'Fri, Oct 23', route: 'Downtown Dash', distance: '12.2 km', time: '45 min', avgSpeed: '17.1 km/h', mode: 'Direct', elevation: '80m' },
  ]

  // --- Actions ---
  const handleRideClick = (ride) => {
    setSelectedRide(ride)
    setView('ride-detail')
  }

  const handleBackToProfile = () => {
    setSelectedRide(null)
    setView('profile')
  }

  // --- Render: Ride Detail View ---
  if (view === 'ride-detail' && selectedRide) {
    return (
      <div className="flex flex-col min-h-full bg-gray-100">
        <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
          <button onClick={handleBackToProfile} className="text-blue-600 font-bold text-sm">
            ← Back
          </button>
          <span className="flex-1 text-center font-bold">Ride Details</span>
          <div className="w-8"></div>
        </div>

        <div className="bg-gray-300 h-48 relative flex items-center justify-center shrink-0">
          <div className="text-gray-500 font-bold text-sm flex flex-col items-center">
            <span className="text-3xl">🗺️</span>
            <span>Route Map Visual</span>
          </div>
          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold shadow">
            {selectedRide.mode} Mode
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-1">{selectedRide.route}</h2>
            <p className="text-gray-500 text-sm">{selectedRide.date}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedRide.distance}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Distance</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedRide.time}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Time</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded-lg">
                <div className="text-xl font-bold text-orange-600">{selectedRide.avgSpeed}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Avg Speed</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">{selectedRide.elevation}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">Elevation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // --- Render: Main Profile View ---
  return (
    // UPDATED: Changed from "flex flex-col h-full" to "min-h-full"
    // This removes the internal scroll area and lets the global page scroll handle everything.
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

      {/* UPDATED: Removed "flex-1 overflow-y-auto" so content flows naturally */}
      <div className="p-4 space-y-4">
        
        {/* Weekly Activity Chart (Merged from Activity) */}
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

        {/* Recent Rides (Merged from Activity) */}
        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1">Recent Rides</h2>
          <div className="space-y-3">
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