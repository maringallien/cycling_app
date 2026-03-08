import { useState, useEffect } from 'react'
import OnboardingOverlay from './OnboardingOverlay'
import { communityTour } from '../config/tours'

// Sub-components
import ReportForm from '../components/community/ReportForm'
import BikeDetail from '../components/community/BikeDetail'
import BattleDetail from '../components/community/BattleDetail'
import GroupHome from '../components/community/GroupHome'

// Mock Data
import { 
  initialMyGroups, 
  initialStolenBikes, 
  allGroups, 
  groupDetails, 
  battleDetails 
} from '../data/mockCommunityData'

function CommunityScreen({ onStartDefending }) { 
  // Navigation State
  const [view, setView] = useState('list') 
  const [activeTab, setActiveTab] = useState('my-groups') 
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [selectedBattle, setSelectedBattle] = useState(null)
  const [selectedBike, setSelectedBike] = useState(null)
  
  // Search States
  const [bikeSearchTerm, setBikeSearchTerm] = useState('') 
  const [groupSearchTerm, setGroupSearchTerm] = useState('') 

  // UI Notification & Modal States
  const [toastMessage, setToastMessage] = useState(null)
  const [groupToLeave, setGroupToLeave] = useState(null) 

  // Data States
  const [myGroups, setMyGroups] = useState(initialMyGroups)
  const [stolenBikes, setStolenBikes] = useState(initialStolenBikes)

  // Onboarding Tour State
  const [tourReady, setTourReady] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setTourReady(true), 150)
    return () => clearTimeout(timer)
  }, [])

  // Derived / Filtered Data
  const filteredStolenBikes = stolenBikes.filter(bike => 
    bike.name.toLowerCase().includes(bikeSearchTerm.toLowerCase()) ||
    bike.color.toLowerCase().includes(bikeSearchTerm.toLowerCase()) ||
    bike.location.toLowerCase().includes(bikeSearchTerm.toLowerCase())
  )

  const filteredGroups = allGroups.filter(group => 
    group.name.toLowerCase().includes(groupSearchTerm.toLowerCase()) ||
    group.type.toLowerCase().includes(groupSearchTerm.toLowerCase())
  )

  // Actions
  const showToast = (message) => {
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleJoinGroup = (group) => {
    if (myGroups.some(g => g.id === group.id)) {
      showToast(`You are already a member of ${group.name}!`)
      return
    }
    const newGroup = { id: group.id, name: group.name, role: 'Member', nextRide: group.nextRide, battles: 0 }
    setMyGroups([newGroup, ...myGroups])
    showToast(`Successfully joined ${group.name}!`)
  }

  const handleBack = () => {
    if (view === 'bike-detail') setView('list')
    else if (view === 'battle-detail') setView('group-home')
    else if (view === 'group-home') setView('list')
    else if (view === 'report-form') setView('list')
  }

  const submitStolenReport = (formData) => {
    const newBike = { id: Date.now(), ...formData, image: '🚲', status: 'Stolen' }
    setStolenBikes([newBike, ...stolenBikes])
    setView('list')
    showToast("Bike reported successfully. Community alerted!")
  }

  // --- Sub-View Renders ---
  if (view === 'report-form') {
    return <ReportForm handleBack={handleBack} onSubmit={submitStolenReport} />
  }
  if (view === 'bike-detail') {
    return <BikeDetail bike={selectedBike} handleBack={handleBack} />
  }
  if (view === 'battle-detail') {
    return <BattleDetail battle={selectedBattle} handleBack={handleBack} onStartDefending={onStartDefending} />
  }
  if (view === 'group-home') {
    return (
      <GroupHome 
        group={selectedGroup} 
        handleBack={handleBack} 
        handleViewBattle={(battle) => {
          setSelectedBattle(battleDetails)
          setView('battle-detail')
        }} 
      />
    )
  }

  // --- Main List View ---
  return (
    <div id="community-screen-container" className="flex flex-col h-full bg-gray-50 relative overflow-hidden">
      
      {/* Modals & Overlays */}
      {groupToLeave && (
        <div className="absolute inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-fade-in-up">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Leave Group?</h3>
            <p className="text-gray-600 text-sm mb-6">Are you sure you want to leave this group? You will lose access to group chats, rides, and battles.</p>
            <div className="flex gap-3">
              <button onClick={() => setGroupToLeave(null)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors">Cancel</button>
              <button onClick={() => {
                setMyGroups(prev => prev.filter(g => g.id !== groupToLeave));
                setGroupToLeave(null);
                showToast("You have left the group.");
              }} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-md transition-colors">Leave</button>
            </div>
          </div>
        </div>
      )}

      {tourReady && view === 'list' && activeTab === 'my-groups' && (
        <OnboardingOverlay screenKey="community_tour" steps={communityTour} containerId="community-screen-container" />
      )}

      {toastMessage && (
        <div className="absolute top-0 left-0 right-0 w-full bg-green-600 text-white px-4 py-3 shadow-md z-[2000] text-sm font-bold text-center transition-all duration-300">
          {toastMessage}
        </div>
      )}

      {/* Header & Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800 p-4 pb-2">Community</h1>
        <div className="flex px-4 gap-6 overflow-x-auto">
          <div id="tour-community-tabs" className="flex gap-6">
            <button onClick={() => setActiveTab('my-groups')} className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'my-groups' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}>My Groups</button>
            <button onClick={() => setActiveTab('find-groups')} className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'find-groups' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400'}`}>Find Groups</button>
          </div>
          <button id="tour-community-theft-tab" onClick={() => setActiveTab('stolen-bikes')} className={`pb-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'stolen-bikes' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-400'}`}>🚨 Stolen Bikes</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* My Groups */}
        {activeTab === 'my-groups' && (
          <div className="space-y-4">
            {myGroups.length === 0 ? (
               <div className="text-center py-10">
                   <span className="text-4xl block mb-2">🚴</span>
                   <p className="text-sm font-bold text-gray-500">You haven't joined any groups yet.</p>
               </div>
            ) : (
              myGroups.map((group, index) => (
                <div key={group.id} id={index === 0 ? 'tour-community-group' : undefined} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl text-gray-800">{group.name}</h3>
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{group.role}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-4 space-y-1">
                    <div>📅 Next Ride: <span className="text-gray-800 font-medium">{group.nextRide}</span></div>
                    <div>⚔️ Active Battles: <span className={`${group.battles > 0 ? 'text-red-500' : 'text-gray-400'} font-bold`}>{group.battles}</span></div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setSelectedGroup(groupDetails); setView('group-home'); }} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm shadow-sm active:bg-blue-700">View Group</button>
                    <button onClick={() => setGroupToLeave(group.id)} className="px-4 py-2 border border-gray-300 text-gray-500 rounded-lg font-bold text-sm bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">Leave</button>
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
        
        {/* Find Groups */}
        {activeTab === 'find-groups' && (
          <div className="space-y-4">
             <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all border border-gray-200 shadow-sm">
                 <span className="text-gray-400 text-lg">🔍</span>
                 <input type="text" placeholder="Search groups by name or type..." value={groupSearchTerm} onChange={(e) => setGroupSearchTerm(e.target.value)} className="bg-transparent border-none outline-none text-sm font-medium flex-1 text-gray-800 placeholder-gray-500 h-full"/>
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
                   <div className="text-xs text-blue-600 font-medium mt-2">📅 Ride: {group.nextRide}</div>
                 </div>
                 <button onClick={() => handleJoinGroup(group)} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">Join</button>
               </div>
             ))}
          </div>
        )}

        {/* Stolen Bikes */}
        {activeTab === 'stolen-bikes' && (
            <div className="space-y-4">
                <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-red-500 transition-all border border-gray-200 shadow-sm">
                    <span className="text-gray-400 text-lg">🔍</span>
                    <input type="text" placeholder="Search by model, color, or location..." value={bikeSearchTerm} onChange={(e) => setBikeSearchTerm(e.target.value)} className="bg-transparent border-none outline-none text-sm font-medium flex-1 text-gray-800 placeholder-gray-500 h-full"/>
                </div>
                <button onClick={() => setView('report-form')} className="w-full bg-red-600 text-white p-4 rounded-xl shadow-md flex items-center justify-center gap-2 font-bold active:bg-red-700 transition-colors">
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
                    <button key={bike.id} onClick={() => { setSelectedBike(bike); setView('bike-detail'); }} className="w-full bg-white p-3 rounded-xl shadow-sm border border-gray-200 flex gap-3 text-left transition-transform active:scale-[0.98]">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl shrink-0">{bike.image}</div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800 truncate">{bike.name}</h3>
                                {bike.status === 'Recovered' && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">FOUND</span>}
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