export default function GroupHome({ group, handleBack, handleViewBattle }) {
  if (!group) return null;

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
      <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
        <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
        <h1 className="text-lg font-bold flex-1">{group.name}</h1>
        <button className="text-gray-400">⚙️</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <section className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800 flex gap-2">
          <span>📌</span>
          <span className="font-medium">{group.announcement}</span>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">⚔️ Active Battles</h2>
          <div className="space-y-3">
            {group.battles.map(battle => (
              <div 
                key={battle.id}
                onClick={() => handleViewBattle(battle)}
                className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center active:bg-gray-50 transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-bold text-gray-800">{battle.zone}</div>
                  <div className="text-xs text-gray-500">vs {battle.enemy}</div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold px-2 py-1 rounded ${battle.status === 'Winning' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {battle.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">📅 Upcoming Rides</h2>
          <div className="space-y-3">
            {group.upcomingRides.map(ride => (
              <div key={ride.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
                <div className="font-bold text-gray-800">{ride.title}</div>
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <span>{ride.time}</span>
                  <span>👤 {ride.attendees} going</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">👥 Members ({group.members.length})</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-wrap gap-2">
            {group.members.map((m, i) => (
              <div key={i} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-700">
                <div className={`w-2 h-2 rounded-full ${m.status === 'Online' ? 'bg-green-500' : m.status === 'Riding Now' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                {m.name}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}