const tabs = [
    {id: 'home', label: 'Map', icon: '🗺️' },
    {id: 'activity', label: 'Activity', icon: '📊' },
    {id: 'territory', label: 'Territory', icon: '🏰' },
    {id: 'community', label: 'Community', icon: '👥' },
    {id: 'profile', label: 'Profile', icon: '👤' },
]

function BottomNav({ currentTab, onTabChange }) {
    return (
        <div className="flex border-t-2 border-gray-800 bg-white">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                     className={`flex-1 text-center py-2 border-r last:border-r-0 border-gray-300 
                        ${currentTab === tab.id ? 'bg-blue-50' : ''}`}
                    >
                    <div className="text-lg">{tab.icon}</div>
                    <div className={`text-xs ${currentTab === tab.id ? 'font-bold' : ''}`}>
                        {tab.label}
                    </div>
                </button>
            ))}
        </div>
    )
}

export default BottomNav