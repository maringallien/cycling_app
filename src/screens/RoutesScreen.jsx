import { useState, useEffect } from 'react'
import OnboardingOverlay from './OnboardingOverlay'
import { routesTour } from '../config/tours'

// Import Sub-components
import MapPreview from '../components/routes/MapPreview'
import RouteDetail from '../components/routes/RouteDetail'

// Import Mock Data
import { officialRoutes, personalRoutes } from '../data/mockRoutesData'

function RoutesScreen({ onStartRoute, onCreateNewRoute }) {
    const [view, setView] = useState('list') // 'list' or 'detail'
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('official') // 'official' or 'personal'

    // --- ONBOARDING TOUR STATE ---
    const [tourReady, setTourReady] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setTourReady(true), 150)
        return () => clearTimeout(timer)
    }, [])

    const currentRoutesList = activeTab === 'official' ? officialRoutes : personalRoutes
    const filteredRoutes = currentRoutesList.filter(route => 
        route.region.toLowerCase().includes(searchTerm.toLowerCase()) || 
        route.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // --- Detail View ---
    if (view === 'detail' && selectedRoute) {
        return (
            <RouteDetail 
                route={selectedRoute} 
                handleBack={() => setView('list')} 
                onStartRoute={onStartRoute} 
            />
        )
    }

    // --- List View ---
    return (
        <div id="routes-screen-container" className="flex flex-col h-full bg-gray-50 relative">
            
            {/* --- RENDER ONBOARDING TOUR --- */}
            {tourReady && view === 'list' && (
                <OnboardingOverlay 
                    screenKey="routes_tour" 
                    steps={routesTour} 
                    containerId="routes-screen-container" 
                />
            )}

            {/* Header & Search */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="p-4 pb-2">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Routes</h1>
                        <button 
                            id="tour-routes-create"
                            onClick={onCreateNewRoute}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            + Create
                        </button>
                    </div>
                    
                    <div id="tour-routes-search" className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                        <span className="text-gray-400 text-lg">🔍</span>
                        <input 
                            type="text" 
                            placeholder="Search by region or name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent border-none outline-none text-sm font-medium flex-1 text-gray-800 placeholder-gray-500 h-full"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div id="tour-routes-tabs" className="flex px-4 mt-2">
                    <button 
                        onClick={() => setActiveTab('official')}
                        className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                            activeTab === 'official' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Official Routes
                    </button>
                    <button 
                        onClick={() => setActiveTab('personal')}
                        className={`flex-1 pb-3 text-sm font-bold border-b-2 transition-colors ${
                            activeTab === 'personal' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        My Routes
                    </button>
                </div>
            </div>

            {/* Route List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredRoutes.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                        <div className="text-4xl mb-2">🏜️</div>
                        <p className="text-sm">No routes found.</p>
                    </div>
                ) : (
                    filteredRoutes.map(route => (
                        <div 
                            key={route.id}
                            onClick={() => {
                                setSelectedRoute(route)
                                setView('detail')
                            }}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
                        >
                            <div className="h-32 bg-gray-200 relative pointer-events-none">
                                <MapPreview coordinates={route.coordinates} />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold z-10">
                                    {route.distance}
                                </div>
                            </div>
                            
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-800">{route.name}</h3>
                                    {route.rating > 0 && (
                                        <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                                            <span className="text-yellow-500 text-xs">★</span>
                                            <span className="text-xs font-bold text-yellow-700">{route.rating}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                                    <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-medium">
                                        {route.region}
                                    </span>
                                    <span>•</span>
                                    <span>{route.time}</span>
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-100 pt-2">
                                    <span className={`text-xs font-bold ${
                                        route.difficulty === 'Easy' ? 'text-green-600' :
                                        route.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                                    }`}>
                                        {route.difficulty}
                                    </span>
                                    <span className="text-xs text-blue-600 font-medium">View Details →</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default RoutesScreen