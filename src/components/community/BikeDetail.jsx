export default function BikeDetail({ bike, handleBack }) {
  if (!bike) return null;

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
        <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
            <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
            <h1 className="text-lg font-bold flex-1 text-center text-red-600">🚨 Stolen Bike Alert</h1>
            <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
            <div className="bg-gray-200 h-56 flex items-center justify-center relative">
                <span className="text-6xl" role="img" aria-label="bike">🚲</span>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    {bike.color}
                </div>
            </div>

            <div className="p-4 space-y-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{bike.name}</h2>
                    <p className="text-gray-500 text-sm">Serial: <span className="font-mono bg-gray-100 px-1 rounded">{bike.serial || 'Unknown'}</span></p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="bg-red-50 p-2 rounded-full">📍</div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Theft Location</div>
                            <div className="font-bold text-gray-800">{bike.location}</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-full">📅</div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase font-bold">Time of Incident</div>
                            <div className="font-bold text-gray-800">{bike.date}</div>
                            <div className="text-sm text-gray-500">{bike.time}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                     <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                     <p className="text-gray-600 text-sm leading-relaxed">
                         {bike.desc || 'No description provided.'}
                     </p>
                </div>

                <div className="bg-gray-200 h-40 rounded-xl relative overflow-hidden border border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 font-bold">🗺️ Map Location Visual</span>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">📍</div>
                </div>

                <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-[0.98] transition-transform">
                    Contact Owner / Report Sighting
                </button>
            </div>
        </div>
    </div>
  )
}