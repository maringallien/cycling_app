import { useState, useEffect } from 'react'
import OnboardingOverlay from './OnboardingOverlay'
import { communityTour } from '../config/tours'

function CommunityScreen({ onStartDefending }) { 
  // Navigation State
  const [view, setView] = useState('list') // 'list', 'group-home', 'battle-detail', 'bike-detail', 'report-form'
  const [activeTab, setActiveTab] = useState('my-groups') // 'my-groups', 'find-groups', 'stolen-bikes'
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedBattle, setSelectedBattle] = useState(null)
  const [selectedBike, setSelectedBike] = useState(null)
  
  // Search States
  const [bikeSearchTerm, setBikeSearchTerm] = useState('') 
  const [groupSearchTerm, setGroupSearchTerm] = useState('') 

  // --- UI Notification & Modal States ---
  const [toastMessage, setToastMessage] = useState(null)
  const [groupToLeave, setGroupToLeave] = useState(null) // Tracks which group ID the user is trying to leave

  // --- ONBOARDING TOUR STATE ---
  const [tourReady, setTourReady] = useState(false)

  // Give the DOM a tiny fraction of a second to paint before we measure coordinates
  useEffect(() => {
    const timer = setTimeout(() => setTourReady(true), 150)
    return () => clearTimeout(timer)
  }, [])

  // --- Data States ---
  const [myGroups, setMyGroups] = useState([
    { id: 1, name: 'Urban Explorers', role: 'Member', nextRide: 'Sat 10:00 AM', battles: 2 },
    { id: 2, name: 'Night Riders', role: 'Admin', nextRide: 'Tue 8:00 PM', battles: 0 }
  ])

  const [stolenBikes, setStolenBikes] = useState([
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
        status: 'Recovered' 
    }
  ])

  // Form state for reporting a stolen bike
  const [reportForm, setReportForm] = useState({
    name: '',
    color: '',
    location: '',
    date: '',
    time: '',
    serial: '',
    desc: ''
  })

  const allGroups = [
    { id: 3, name: 'Morning Coffee Crew', members: 45, type: 'Social', nextRide: 'Tomorrow, 6:30 AM' },
    { id: 4, name: 'Velo Racers', members: 312, type: 'Competitive', nextRide: 'Wed, 5:00 PM' },
    { id: 5, name: 'Sunday Spinners', members: 89, type: 'Casual', nextRide: 'Sun, 9:00 AM' },
    { id: 6, name: 'Mountain Goats', members: 15, type: 'Off-road', nextRide: 'Sat, 7:00 AM' },
    { id: 7, name: 'Downtown Commuters', members: 120, type: 'Commute', nextRide: 'Mon, 7:30 AM' }
  ]

  // Filter stolen bikes
  const filteredStolenBikes = stolenBikes.filter(bike => 
    bike.name.toLowerCase().includes(bikeSearchTerm.toLowerCase()) ||
    bike.color.toLowerCase().includes(bikeSearchTerm.toLowerCase()) ||
    bike.location.toLowerCase().includes(bikeSearchTerm.toLowerCase())
  )

  // Filter groups based on search term
  const filteredGroups = allGroups.filter(group => 
    group.name.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
    group.type.toLowerCase().includes(groupSearchTerm.toLowerCase())
  )

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
  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleJoinGroup = (group) => {
    if (myGroups.some(g => g.id === group.id)) {
      showToast(`You are already a member of ${group.name}!`)
      return
    }

    const newGroup = {
      id: group.id,
      name: group.name,
      role: 'Member',
      nextRide: group.nextRide,
      battles: 0 
    }
    
    setMyGroups([newGroup, ...myGroups])
    showToast(`Successfully joined ${group.name}!`)
  }

  const handleViewGroup = (group) => {
    setSelectedGroup(groupDetails) 
    setView('group-home')
  }

  // New Modal Actions
  const handleLeaveClick = (groupId) => {
    setGroupToLeave(groupId) // Opens the modal
  }

  const confirmLeaveGroup = () => {
    if (groupToLeave) {
      setMyGroups(prevGroups => prevGroups.filter(g => g.id !== groupToLeave));
      setGroupToLeave(null); // Close modal
      showToast("You have left the group.");
    }
  }

  const cancelLeaveGroup = () => {
    setGroupToLeave(null); // Close modal
  }

  const handleViewBattle = (battle) => {
    setSelectedBattle(battleDetails) 
    setView('battle-detail')
  }

  const handleViewBike = (bike) => {
      setSelectedBike(bike)
      setView('bike-detail')
  }

  const handleReportStolen = () => {
      setView('report-form')
  }

  const handleBack = () => {
    if (view === 'bike-detail') setView('list')
    else if (view === 'battle-detail') setView('group-home')
    else if (view === 'group-home') setView('list')
    else if (view === 'report-form') setView('list')
  }

  const submitStolenReport = (e) => {
    e.preventDefault()
    
    const newBike = {
      id: Date.now(), 
      ...reportForm,
      image: '🚲', 
      status: 'Stolen'
    }

    setStolenBikes([newBike, ...stolenBikes])
    setReportForm({ name: '', color: '', location: '', date: '', time: '', serial: '', desc: '' })
    setView('list')
    showToast("Bike reported successfully. Community alerted!")
  }

  // --- Views ---

  // 1. Report Stolen Bike Form View
  if (view === 'report-form') {
    return (
      <div className="flex flex-col h-full bg-gray-50 relative">
          <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
              <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
              <h1 className="text-lg font-bold flex-1 text-center text-red-600">Report Stolen Bike</h1>
              <div className="w-8"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
              <form onSubmit={submitStolenReport} className="space-y-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Bike Model / Name *</label>
                          <input required value={reportForm.name} onChange={e => setReportForm({...reportForm, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Trek Domane AL 2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Color *</label>
                            <input required value={reportForm.color} onChange={e => setReportForm({...reportForm, color: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Red & Black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Serial Number</label>
                            <input value={reportForm.serial} onChange={e => setReportForm({...reportForm, serial: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="Optional" />
                        </div>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Last Seen Location *</label>
                          <input required value={reportForm.location} onChange={e => setReportForm({...reportForm, location: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Downtown Metro Station" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Date *</label>
                            <input type="text" required value={reportForm.date} onChange={e => setReportForm({...reportForm, date: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Oct 24, 2023" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Time</label>
                            <input value={reportForm.time} onChange={e => setReportForm({...reportForm, time: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. 2:00 PM" />
                        </div>
                      </div>

                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Description / Distinct Features</label>
                          <textarea value={reportForm.desc} onChange={e => setReportForm({...reportForm, desc: e.target.value})} rows="3" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="Any stickers, scratches, or custom parts?"></textarea>
                      </div>
                  </div>

                  <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                      <span>🚨</span> Submit Theft Report
                  </button>
              </form>
          </div>
      </div>
    )
  }

  // 2. Bike Detail View (Theft Feature)
  if (view === 'bike-detail' && selectedBike) {
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
                        {selectedBike.color}
                    </div>
                </div>

                <div className="p-4 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedBike.name}</h2>
                        <p className="text-gray-500 text-sm">Serial: <span className="font-mono bg-gray-100 px-1 rounded">{selectedBike.serial || 'Unknown'}</span></p>
                    </div>

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

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                         <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                         <p className="text-gray-600 text-sm leading-relaxed">
                             {selectedBike.desc || 'No description provided.'}
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

  // 3. Battle Detail View
  if (view === 'battle-detail' && selectedBattle) {
    return (
      <div className="flex flex-col h-full bg-gray-50 relative">
        <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
          <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
          <h1 className="text-lg font-bold flex-1">Battle: {selectedBattle.zone}</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="bg-gray-200 h-56 rounded-xl relative overflow-hidden shadow-inner border border-gray-300 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-gray-400 to-transparent"></div>
            <div className="w-32 h-32 bg-red-500/80 rounded-full blur-xl absolute top-10 left-10 animate-pulse"></div>
            <div className="w-24 h-24 bg-green-500/80 rounded-full blur-xl absolute bottom-10 right-10 animate-pulse"></div>
            <span className="relative z-10 font-bold text-gray-500">🗺️ Map of {selectedBattle.zone}</span>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
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

  // 4. Group Home Page
  if (view === 'group-home' && selectedGroup) {
    return (
      <div className="flex flex-col h-full bg-gray-50 relative">
        <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
          <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
          <h1 className="text-lg font-bold flex-1">{selectedGroup.name}</h1>
          <button className="text-gray-400">⚙️</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <section className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800 flex gap-2">
            <span>📌</span>
            <span className="font-medium">{selectedGroup.announcement}</span>
          </section>

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

  // 5. Main List View (My Groups + Find Groups + Stolen Bikes)
  return (
    <div id="community-screen-container" className="flex flex-col h-full bg-gray-50 relative overflow-hidden">
      
      {/* --- IN-APP CONFIRMATION MODAL --- */}
      {groupToLeave && (
        <div className="absolute inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-in-up">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Leave Group?</h3>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to leave this group? You will lose access to group chats, rides, and battles.</p>
            <div className="flex gap-3">
              <button 
                onClick={cancelLeaveGroup} 
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLeaveGroup} 
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-colors active:scale-95"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- RENDER ONBOARDING TOUR --- */}
      {tourReady && view === 'list' && activeTab === 'my-groups' && (
        <OnboardingOverlay 
            screenKey="community_tour" 
            steps={communityTour} 
            containerId="community-screen-container"
        />
      )}

      {/* --- CLEAN BANNER NOTIFICATION --- */}
      {toastMessage && (
        <div className="absolute top-0 left-0 right-0 w-full bg-green-600 text-white px-4 py-3 shadow-md z-[2000] text-sm font-bold text-center transition-all duration-300">
          {toastMessage}
        </div>
      )}

      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 p-4 pb-2">Community</h1>
        <div className="flex px-4 gap-6 overflow-x-auto">
          
          <div id="tour-community-tabs" className="flex gap-6">
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
          </div>

          <button 
            id="tour-community-theft-tab"
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
            {myGroups.length === 0 ? (
               <div className="text-center py-10">
                   <span className="text-4xl block mb-2">🚴</span>
                   <p className="text-sm font-bold text-gray-500">You haven't joined any groups yet.</p>
               </div>
            ) : (
              myGroups.map((group, index) => (
                <div 
                  key={group.id} 
                  id={index === 0 ? 'tour-community-group' : undefined} 
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                >
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
                    <button 
                      onClick={() => handleLeaveClick(group.id)} // CHANGED HERE: Now opens modal
                      className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg font-bold text-sm bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    >
                      Leave
                    </button>
                  </div>
                </div>
              ))
            )}
            
            <div className="text-center mt-8 p-4">
              <p className="text-gray-400 text-sm mb-2">Want to join more crews?</p>
              <button onClick={() => setActiveTab('find-groups')} className="text-blue-600 font-bold text-sm">Browse All Groups</button>
            </div>
          </div>
        )}
        
        {/* Find Groups Tab View */}
        {activeTab === 'find-groups' && (
          <div className="space-y-4">
             <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all border border-gray-200 shadow-sm">
                 <span className="text-gray-400 text-lg">🔍</span>
                 <input 
                     type="text" 
                     placeholder="Search groups by name or type..." 
                     value={groupSearchTerm}
                     onChange={(e) => setGroupSearchTerm(e.target.value)}
                     className="bg-transparent border-none outline-none text-sm font-medium flex-1 text-gray-800 placeholder-gray-500 h-full"
                 />
             </div>

             {filteredGroups.length === 0 && (
                 <div className="text-center py-10">
                     <span className="text-4xl block mb-2">🕵️</span>
                     <p className="text-sm font-bold text-gray-500">No groups found matching your search.</p>
                 </div>
             )}

             {filteredGroups.map(group => (
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
                 <button 
                   onClick={() => handleJoinGroup(group)} 
                   className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors"
                 >
                   Join
                 </button>
               </div>
             ))}
          </div>
        )}

        {/* Stolen Bikes Tab View */}
        {activeTab === 'stolen-bikes' && (
            <div className="space-y-4">
                <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-red-500 transition-all border border-gray-200 shadow-sm">
                    <span className="text-gray-400 text-lg">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search by model, color, or location..." 
                        value={bikeSearchTerm}
                        onChange={(e) => setBikeSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-medium flex-1 text-gray-800 placeholder-gray-500 h-full"
                    />
                </div>

                <button 
                    onClick={handleReportStolen}
                    className="w-full bg-red-600 text-white p-4 rounded-xl shadow-md flex items-center justify-center gap-2 font-bold active:bg-red-700 transition-colors"
                >
                    <span>📣</span> Report a Stolen Bike
                </button>

                <div className="flex items-center gap-2 mt-4 mb-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent Alerts</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {filteredStolenBikes.length === 0 && (
                    <div className="text-center py-10">
                        <span className="text-4xl block mb-2">🚲</span>
                        <p className="text-sm font-bold text-gray-500">No bikes found matching your search.</p>
                    </div>
                )}

                {filteredStolenBikes.map(bike => (
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