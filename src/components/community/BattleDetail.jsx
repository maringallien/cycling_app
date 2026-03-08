export default function BattleDetail({ battle, handleBack, onStartDefending }) {
  if (!battle) return null;

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
        <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
        <h1 className="text-lg font-bold flex-1">Battle: {battle.zone}</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-gray-200 h-56 rounded-xl relative overflow-hidden shadow-inner border border-gray-300 flex items-center justify-center">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-400 to-transparent"></div>
          <div className="w-32 h-32 bg-red-500/80 rounded-full blur-xl absolute top-10 left-10 animate-pulse"></div>
          <div className="w-24 h-24 bg-green-500/80 rounded-full blur-xl absolute bottom-10 right-10 animate-pulse"></div>
          <span className="relative z-10 font-bold text-gray-500">🗺️ Map of {battle.zone}</span>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-center font-bold text-gray-700 mb-2">Control Status</h3>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-green-600">Us: {battle.yourScore}%</span>
            <span className="text-red-600">Them: {battle.enemyScore}%</span>
          </div>
          <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: `${battle.yourScore}%` }} className="bg-green-500 h-full"></div>
            <div style={{ width: `${battle.enemyScore}%` }} className="bg-red-500 h-full"></div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">Target: 100% to Capture</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 p-3 rounded-xl border border-green-100">
            <h4 className="text-green-800 font-bold text-sm mb-3 border-b border-green-200 pb-1">Our Top Riders</h4>
            <div className="space-y-2">
              {battle.topAllies.map((p, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="font-medium text-green-900">{i+1}. {p.name}</span>
                  <span className="font-bold text-green-700">{p.pts}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-3 rounded-xl border border-red-100">
            <h4 className="text-red-800 font-bold text-sm mb-3 border-b border-red-200 pb-1">Top Contenders</h4>
            <div className="space-y-2">
              {battle.topEnemies.map((p, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="font-medium text-red-900">{i+1}. {p.name}</span>
                  <span className="font-bold text-red-700">{p.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          onClick={onStartDefending} 
          className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform"
        >
          Ride to Defend Area 🚴
        </button>
      </div>
    </div>
  )
}