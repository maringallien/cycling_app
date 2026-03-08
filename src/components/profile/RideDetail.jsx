export default function RideDetail({ ride, handleBack }) {
  if (!ride) return null;

  return (
    <div className="flex flex-col min-h-full bg-gray-100">
      <div className="flex items-center px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
        <button onClick={handleBack} className="text-blue-600 font-bold text-sm">
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
          {ride.mode} Mode
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-1">{ride.route}</h2>
          <p className="text-gray-500 text-sm">{ride.date}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{ride.distance}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Distance</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{ride.time}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Time</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <div className="text-xl font-bold text-orange-600">{ride.avgSpeed}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Avg Speed</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">{ride.elevation}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Elevation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}