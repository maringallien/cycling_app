import { useState } from 'react'

function CommunityScreen() {
  // Navigation State
  const [view, setView] = useState('list') // 'list', 'group-home', 'battle-detail', 'bike-detail'
  const [activeTab, setActiveTab] = useState('my-groups') // 'my-groups', 'find-groups', 'stolen-bikes'
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedBattle, setSelectedBattle] = useState(null)
  const [selectedBike, setSelectedBike] = useState(null) // New State for theft feature

  // --- Dummy Data ---
  const myGroups = [
    { id: 1, name: 'Urban Explorers', role: 'Member', nextRide: 'Sat 10:00 AM', battles: 2 },
    { id: 2, name: 'Night Riders', role: 'Admin', nextRide: 'Tue 8:00 PM', battles: 0 }
  ]

  const allGroups = [
    { id: 3, name: 'Morning Coffee Crew', members: 45, type: 'Social', nextRide: 'Tomorrow, 6:30 AM' },
    { id: 4, name: 'Velo Racers', members: 312, type: 'Competitive', nextRide: 'Wed, 5:00 PM' },
    { id: 5, name: 'Sunday Spinners', members: 89, type: 'Casual', nextRide: 'Sun, 9:00 AM' },
    { id: 6, name: 'Mountain Goats', members: 15, type: 'Off-road', nextRide: 'Sat, 7:00 AM' }
  ]
  
  // New Dummy Data for Theft Feature
  const stolenBikes = [
    { 
        id: 1, 
        name: 'Trek Domane AL 2', 
        color: 'Red & Black',
        location: 'Downtown Metro Station', 
        date: 'Oct 24, 2023', 
        time: 'Between 2-4 PM',
        image: '🚲', 
        serial: 'WTU-192-X99',
        desc: 'Scratched left pedal. Has a distinctive yellow bottle cage attached to the frame.',
        status: 'Stolen'
    },
    { 
        id: 2, 
        name: 'Cannondale Topstone', 
        color: 'Midnight Blue',
        location: 'City Park Bike Rack', 
        date: 'Oct 22, 2023', 
        time: 'Overnight',
        image: '🚲', 
        serial: 'Unknown',
        desc: 'Gravel tires fitted. Stickers on the top tube.',
        status: 'Stolen'
    },
     { 
        id: 3, 
        name: 'Specialized Rockhopper', 
        color: 'Neon Green',
        location: 'University Campus', 
        date: 'Oct 20, 2023', 
        time: '10:00 AM',
        image: '🚲', 
        serial: 'SPZ-555-001',
        desc: 'Mint condition, brand new grips.',
        status: 'Recovered' // Example of a recovered bike
    }
  ]

  const groupDetails = {
    id: 1,
    name: 'Urban Explorers',
    announcement: '📢 Annual AGM is this Friday at the Community Center!',
    upcomingRides: [
      { id: 101, title: 'Saturday Morning Coffee', time: 'Sat, 10:00 AM', attendees: 12 },
      { id: 102, title: 'Wednesday Intervals', time: 'Wed, 6:30 PM', attendees: 5 }
    ],
    members: [
      { name: 'Marcus Chen', role: 'Admin', status: 'Online' },
      { name: 'Sarah J.', role: 'Member', status: 'Riding Now' },
      { name: 'David O.', role: 'Member', status: 'Offline' },
      { name: 'You', role: 'Member', status: 'Online' }
    ],
    battles: [
      { id: 201, zone: 'Riverside Path', enemy: 'The Road Runners', status: 'Losing', health: 35 },
      { id: 202, zone: 'High Park Loop', enemy: 'Velo City', status: 'Winning', health: 80 }
    ]
  }

  const battleDetails = {
    zone: 'Riverside Path',
    enemy: 'The Road Runners',
    yourScore: 35,
    enemyScore: 65,
    topAllies: [
      { name: 'Marcus Chen', pts: 450 },
      { name: 'Sarah J.', pts: 320 },
      { name: 'You', pts: 110 }
    ],
    topEnemies: [
      { name: 'Speedy_G', pts: 890 },
      { name: 'RoadWarrior', pts: 560 },
      { name: 'BikeMike', pts: 440 }
    ]
  }

  // --- Actions ---
  const handleViewGroup = (group) => {
    setSelectedGroup(groupDetails) // In real app, fetch by ID
    setView('group-home')
  }

  const handleViewBattle = (battle) => {
    setSelectedBattle(battleDetails) // In real app, fetch by ID
    setView('battle-detail')
  }

  const handleViewBike = (bike) => {
      setSelectedBike(bike)
      setView('bike-detail')
  }

  const handleBack = () => {
    if (view === 'bike-detail') setView('list')
    else if (view === 'battle-detail') setView('group-home')
    else if (view === 'group-home') setView('list')
  }

  const handleReportStolen = () => {
      alert("Opening Stolen Bike Report Form...")
  }

  // --- Views ---

  // 1. Bike Detail View (Theft Feature)
  if (view === 'bike-detail' && selectedBike) {
      return (
        <div className="flex flex-col h-full bg-gray-50">
            <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
                <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
                <h1 className="text-lg font-bold flex-1 text-center text-red-600">🚨 Stolen Bike Alert</h1>
                <div className="w-8"></div>
            </div>

            <div className="flex-1 overflow-y-auto pb-4">
                {/* Image Placeholder */}
                <div className="bg-gray-200 h-56 flex items-center justify-center relative">
                    <span className="text-6xl" role="img" aria-label="bike">🚲</span>
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {selectedBike.color}
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    {/* Header Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedBike.name}</h2>
                        <p className="text-gray-500 text-sm">Serial: <span className="font-mono bg-gray-100 px-1 rounded">{selectedBike.serial}</span></p>
                    </div>

                    {/* Theft Details Card */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="bg-red-50 p-2 rounded-full">📍</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-bold">Theft Location</div>
                                <div className="font-bold text-gray-800">{selectedBike.location}</div>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-50 p-2 rounded-full">📅</div>
                            <div>
                                <div className="text-xs text-gray-400 uppercase font-bold">Time of Incident</div>
                                <div className="font-bold text-gray-800">{selectedBike.date}</div>
                                <div className="text-sm text-gray-500">{selectedBike.time}</div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                         <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                         <p className="text-gray-600 text-sm leading-relaxed">
                             {selectedBike.desc}
                         </p>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-gray-200 h-40 rounded-xl relative overflow-hidden border border-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 font-bold">🗺️ Map Location Visual</span>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">📍</div>
                    </div>

                    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-[0.98]">
                        Contact Owner / Report Sighting
                    </button>
                </div>
            </div>
        </div>
      )
  }

  // 2. Battle Detail View
  if (view === 'battle-detail' && selectedBattle) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3">
          <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
          <h1 className="text-lg font-bold flex-1">Battle: {selectedBattle.zone}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Territory Map Visual */}
          <div className="bg-gray-200 h-56 rounded-xl relative overflow-hidden shadow-inner border border-gray-300 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-400 to-transparent"></div>
            {/* Simulated Zone Shape */}
            <div className="w-32 h-32 bg-red-500/80 rounded-full blur-xl absolute top-10 left-10 animate-pulse"></div>
            <div className="w-24 h-24 bg-green-500/80 rounded-full blur-xl absolute bottom-10 right-10 animate-pulse"></div>
            <span className="relative z-10 font-bold text-gray-500">🗺️ Map of {selectedBattle.zone}</span>
          </div>

          {/* Conflict Scale */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-center font-bold text-gray-700 mb-2">Control Status</h3>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-green-600">Us: {selectedBattle.yourScore}%</span>
              <span className="text-red-600">Them: {selectedBattle.enemyScore}%</span>
            </div>
            <div className="w-full h-6 bg-gray-100 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: `${selectedBattle.yourScore}%` }} className="bg-green-500 h-full"></div>
              <div style={{ width: `${selectedBattle.enemyScore}%` }} className="bg-red-500 h-full"></div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-2">Target: 100% to Capture</div>
          </div>

          {/* Top Players Lists */}
          <div className="grid grid-cols-2 gap-4">
            {/* Allies */}
            <div className="bg-green-50 p-3 rounded-xl border border-green-100">
              <h4 className="text-green-800 font-bold text-sm mb-3 border-b border-green-200 pb-1">Our Top Riders</h4>
              <div className="space-y-2">
                {selectedBattle.topAllies.map((p, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="font-medium text-green-900">{i+1}. {p.name}</span>
                    <span className="font-bold text-green-700">{p.pts}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enemies */}
            <div className="bg-red-50 p-3 rounded-xl border border-red-100">
              <h4 className="text-red-800 font-bold text-sm mb-3 border-b border-red-200 pb-1">Top Contenders</h4>
              <div className="space-y-2">
                {selectedBattle.topEnemies.map((p, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="font-medium text-red-900">{i+1}. {p.name}</span>
                    <span className="font-bold text-red-700">{p.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <button className="w-full py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform">
            Ride to Defend Area 🚴
          </button>
        </div>
      </div>
    )
  }

  // 3. Group Home Page
  if (view === 'group-home' && selectedGroup) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
          <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
          <h1 className="text-lg font-bold flex-1">{selectedGroup.name}</h1>
          <button className="text-gray-400">⚙️</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Announcement Board */}
          <section className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800 flex gap-2">
            <span>📌</span>
            <span className="font-medium">{selectedGroup.announcement}</span>
          </section>

          {/* Ongoing Battles */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">⚔️ Active Battles</h2>
            <div className="space-y-3">
              {selectedGroup.battles.map(battle => (
                <div 
                  key={battle.id}
                  onClick={() => handleViewBattle(battle)}
                  className="bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center active:bg-gray-50 transition-colors"
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

          {/* Upcoming Rides */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">📅 Upcoming Rides</h2>
            <div className="space-y-3">
              {selectedGroup.upcomingRides.map(ride => (
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

          {/* Members Preview */}
          <section>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">👥 Members ({selectedGroup.members.length})</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex flex-wrap gap-2">
              {selectedGroup.members.map((m, i) => (
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

  // 4. Main List View (My Groups + Find Groups + Stolen Bikes)
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 p-4 pb-2">Community</h1>
        <div className="flex px-4 gap-6 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('my-groups')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'my-groups' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}
          >
            My Groups
          </button>
          <button 
            onClick={() => setActiveTab('find-groups')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'find-groups' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}
          >
            Find Groups
          </button>
          <button 
            onClick={() => setActiveTab('stolen-bikes')}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'stolen-bikes' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-400'}`}
          >
            🚨 Stolen Bikes
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'my-groups' && (
          <div className="space-y-4">
            {myGroups.map(group => (
              <div key={group.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-xl text-gray-800">{group.name}</h3>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{group.role}</span>
                </div>
                
                <div className="text-sm text-gray-500 mb-4 space-y-1">
                  <div>📅 Next Ride: <span className="text-gray-800 font-medium">{group.nextRide}</span></div>
                  <div>⚔️ Active Battles: <span className={`${group.battles > 0 ? 'text-red-500' : 'text-gray-400'} font-bold`}>{group.battles}</span></div>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => handleViewGroup(group)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm shadow-sm active:bg-blue-700"
                  >
                    View Group
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg font-bold text-sm bg-white">
                    Leave
                  </button>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-8 p-4">
              <p className="text-gray-400 text-sm mb-2">Want to join more crews?</p>
              <button onClick={() => setActiveTab('find-groups')} className="text-blue-600 font-bold text-sm">Browse All Groups</button>
            </div>
          </div>
        )}
        
        {activeTab === 'find-groups' && (
          <div className="space-y-4">
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 items-center">
               <span className="text-2xl">🔍</span>
               <div className="flex-1">
                 <h3 className="text-sm font-bold text-blue-900">Find your tribe</h3>
                 <p className="text-xs text-blue-700">Search for groups by name or location</p>
               </div>
             </div>

             {allGroups.map(group => (
               <div key={group.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
                 <div>
                   <h3 className="font-bold text-gray-800">{group.name}</h3>
                   <div className="flex gap-2 text-xs text-gray-500 mt-1">
                     <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">{group.type}</span>
                     <span>• {group.members} members</span>
                   </div>
                   <div className="text-xs text-blue-600 font-medium mt-2">
                     📅 Ride: {group.nextRide}
                   </div>
                 </div>
                 <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                   Join
                 </button>
               </div>
             ))}
          </div>
        )}

        {/* Stolen Bikes Tab View */}
        {activeTab === 'stolen-bikes' && (
            <div className="space-y-4">
                {/* Report Button CTA */}
                <button 
                    onClick={handleReportStolen}
                    className="w-full bg-red-600 text-white p-4 rounded-xl shadow-md flex items-center justify-center gap-2 font-bold active:bg-red-700 transition-colors"
                >
                    <span>📣</span> Report a Stolen Bike
                </button>

                <div className="flex items-center gap-2 mt-2 mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Alerts</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {stolenBikes.map(bike => (
                    <button 
                        key={bike.id} 
                        onClick={() => handleViewBike(bike)}
                        className="w-full bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex gap-3 text-left transition-transform active:scale-[0.98]"
                    >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0">
                            {bike.image}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 truncate">{bike.name}</h3>
                                {bike.status === 'Recovered' && (
                                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">FOUND</span>
                                )}
                            </div>
                            <div className="text-xs text-red-500 font-medium mt-0.5">Stolen: {bike.date}</div>
                            <div className="text-xs text-gray-500 mt-0.5 truncate">📍 {bike.location}</div>
                        </div>
                    </button>
                ))}
            </div>
        )}

      </div>
    </div>
  )
}

export default CommunityScreen