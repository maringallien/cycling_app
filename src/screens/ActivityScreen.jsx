import { useState } from 'react'

function ActivityScreen() {
    const [view, setView] = useState('list')
    const [selectedRide, setSelectedRide] = useState(null)

    // --- Dummy data ---
    const userStats = {
        totalDistance: '1,240 km',
        totalTime: '64h 20m',
        totalElevation: '8,400 m',
        calories: '32,500 kcal',
    }

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
        { id: 5, date: 'Wed, Oct 21', route: 'Rainy Commute', distance: '8.4 km', time: '35 min', avgSpeed: '14.4 km/h', mode: 'Safe', elevation: '45m' },
    ]

    const handleRideClick = (ride) => {
        setSelectedRide(ride)
        setView('detail')
    }

    const handleBack = () => {
        setSelectedRide(null)
        setView('list')
    }

    if (view === 'detail' && selectedRide) {
        return (
        <div className="flex flex-col h-full bg-gray-100">
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 sticky top-0">
            <button onClick={handleBack} className="text-blue-600 font-bold text-sm">
                ← Back
            </button>
            <span className="flex-1 text-center font-bold">Ride Details</span>
            <div className="w-8"></div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-300 h-48 relative flex items-center justify-center">
            <div className="text-gray-500 font-bold text-sm flex flex-col items-center">
                <span className="text-3xl">🗺️</span>
                <span>Route Map Visual</span>
            </div>
            <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold shadow">
                {selectedRide.mode} Mode
            </div>
            </div>

            {/* Main Stats */}
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

            {/* Social / Action Buttons */}
            <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold shadow-md active:bg-blue-700 transition-colors">
                Share Ride
                </button>
                <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-bold shadow-sm active:bg-gray-50 transition-colors">
                Export GPX
                </button>
            </div>
            </div>
        </div>
        )
    }

    // --- Main List View ---
    return (
        <div className="flex flex-col h-full bg-gray-50">
        <div className="px-4 py-4 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">My Activity</h1>
            <p className="text-gray-500 text-sm">Keep up the momentum!</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Weekly Progress Chart */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-end mb-2">
                <h3 className="font-bold text-gray-700">This Week</h3>
                <span className="text-xs text-blue-600 font-bold">132 km total</span>
            </div>
            <div className="flex justify-between items-end h-32 pt-2">
                {weeklyData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1 w-8">
                    <div className="w-full bg-gray-100 rounded-t-sm relative h-24 flex items-end overflow-hidden">
                    <div 
                        className="w-full bg-blue-500 rounded-t-sm transition-all duration-500"
                        style={{ height: d.height }}
                    ></div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{d.day}</span>
                </div>
                ))}
            </div>
            </div>

            {/* Lifetime Stats */}
            <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                <div className="text-gray-400 text-xs uppercase font-bold">Total Dist</div>
                <div className="text-lg font-bold text-gray-800">{userStats.totalDistance}</div>
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                <div className="text-gray-400 text-xs uppercase font-bold">Total Time</div>
                <div className="text-lg font-bold text-gray-800">{userStats.totalTime}</div>
            </div>
            </div>

            {/* Recent History */}
            <div>
            <h3 className="font-bold text-gray-700 mb-2">Recent Rides</h3>
            <div className="space-y-3">
                {rideHistory.map((ride) => (
                <button 
                    key={ride.id}
                    onClick={() => handleRideClick(ride)}
                    className="w-full bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex items-center gap-3 text-left transition-transform active:scale-[0.98]"
                >
                    {/* Mode Icon/Badge */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0
                    ${ride.mode === 'Safe' ? 'bg-green-100' : ride.mode === 'Direct' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                    {ride.mode === 'Safe' ? '🛡️' : ride.mode === 'Direct' ? '🛤️' : '🧭'}
                    </div>
                    
                    <div className="flex-1">
                    <div className="font-bold text-gray-800 text-sm">{ride.route}</div>
                    <div className="text-xs text-gray-500">{ride.date}</div>
                    </div>

                    <div className="text-right">
                    <div className="font-bold text-gray-800 text-sm">{ride.distance}</div>
                    <div className="text-xs text-gray-500">{ride.time}</div>
                    </div>
                </button>
                ))}
            </div>
            </div>

        </div>
        </div>
    )
}

export default ActivityScreen
