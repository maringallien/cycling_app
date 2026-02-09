import { useState } from 'react'

function RoutesScreen() {
    const [view, setView] = useState('list') // 'list' or 'detail'
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')

    // --- Dummy Data ---
    const routes = [
        { 
            id: 1, 
            name: 'Lakeshore Scenic Loop', 
            region: 'Waterfront', 
            rating: 4.8, 
            difficulty: 'Easy', 
            time: '45 min', 
            distance: '12 km',
            description: 'A beautiful flat ride along the water. Perfect for beginners or a relaxing sunset ride. Paved path the entire way.',
            photos: ['🌊', '🌅', '🚲'],
            reviews: [
                { user: 'Alex', rating: 5, comment: 'Absolutely stunning views!' },
                { user: 'Sam', rating: 4, comment: 'Gets a bit crowded on weekends.' }
            ]
        },
        { 
            id: 2, 
            name: 'High Park Hill Climbs', 
            region: 'West End', 
            rating: 4.2, 
            difficulty: 'Hard', 
            time: '1h 10m', 
            distance: '18 km',
            description: 'Challenge your legs with these steep intervals. Great for training. Includes the famous Col de High Park.',
            photos: ['🏔️', '🥵', '🌳'],
            reviews: [
                { user: 'Chris', rating: 5, comment: 'Best workout in the city.' },
                { user: 'Jordan', rating: 3, comment: 'Too steep for my fixie!' }
            ]
        },
        { 
            id: 3, 
            name: 'Downtown Coffee Run', 
            region: 'Downtown', 
            rating: 4.5, 
            difficulty: 'Medium', 
            time: '30 min', 
            distance: '8 km',
            description: 'A quick urban dash hitting the best espresso spots. Watch out for streetcar tracks!',
            photos: ['☕', '🏙️', '🥐'],
            reviews: [
                { user: 'Pat', rating: 5, comment: 'Delicious stops.' }
            ]
        },
        { 
            id: 4, 
            name: 'Don Valley Gravel', 
            region: 'North York', 
            rating: 4.9, 
            difficulty: 'Expert', 
            time: '2h 00m', 
            distance: '35 km',
            description: 'Mixed terrain adventure through the valley. 40% gravel, 60% paved. secluded and quiet.',
            photos: ['🌲', '🪨', '🦊'],
            reviews: [
                { user: 'Taylor', rating: 5, comment: 'Hidden gem.' },
                { user: 'Morgan', rating: 5, comment: 'Muddy but fun!' }
            ]
        }
    ]

    // --- Helper to Render Stars ---
    const renderStars = (rating) => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.round(rating)) {
                stars.push(<span key={i} className="text-yellow-400">★</span>)
            } else {
                stars.push(<span key={i} className="text-gray-300">★</span>)
            }
        }
        return <span className="text-lg">{stars}</span>
    }

    // --- Actions ---
    const handleRouteClick = (route) => {
        setSelectedRoute(route)
        setView('detail')
    }

    const handleBack = () => {
        setSelectedRoute(null)
        setView('list')
    }

    const filteredRoutes = routes.filter(route => 
        route.region.toLowerCase().includes(searchTerm.toLowerCase()) || 
        route.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // --- Detail View ---
    if (view === 'detail' && selectedRoute) {
        return (
            <div className="flex flex-col h-full bg-white">
                {/* Header */}
                <div className="flex items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <button onClick={handleBack} className="text-blue-600 font-bold text-sm">← Back</button>
                    <span className="flex-1 text-center font-bold text-gray-800">Route Details</span>
                    <div className="w-8"></div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Path Snapshot (Visual Placeholder) */}
                    <div className="h-56 bg-gray-100 relative flex items-center justify-center border-b border-gray-200">
                        <div className="text-center text-gray-400">
                            <span className="text-5xl block mb-2">🗺️</span>
                            <span className="text-xs font-bold uppercase tracking-widest">Route Snapshot</span>
                        </div>
                        {/* Fake Path Line */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                            <path d="M 50 150 Q 150 50 250 150 T 350 150" stroke="#2563EB" strokeWidth="4" fill="none" />
                        </svg>
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                            {selectedRoute.distance}
                        </div>
                    </div>

                    <div className="p-5 space-y-6">
                        {/* Title & Primary Info */}
                        <div>
                            <div className="flex justify-between items-start">
                                <h1 className="text-2xl font-bold text-gray-900 leading-tight">{selectedRoute.name}</h1>
                                <div className="flex flex-col items-end">
                                    {renderStars(selectedRoute.rating)}
                                    <span className="text-xs text-gray-500 font-medium">{selectedRoute.reviews.length} reviews</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                                <span>📍 {selectedRoute.region}</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase">Difficulty</div>
                                <div className={`font-bold ${
                                    selectedRoute.difficulty === 'Easy' ? 'text-green-600' :
                                    selectedRoute.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                                }`}>{selectedRoute.difficulty}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase">Time</div>
                                <div className="font-bold text-gray-800">{selectedRoute.time}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                                <div className="text-xs text-gray-400 font-bold uppercase">Photos</div>
                                <div className="font-bold text-gray-800">{selectedRoute.photos.length}</div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">About this Route</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{selectedRoute.description}</p>
                        </div>

                        {/* Photos */}
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">Photos</h3>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {selectedRoute.photos.map((photo, i) => (
                                    <div key={i} className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center text-3xl shrink-0 border border-gray-200">
                                        {photo}
                                    </div>
                                ))}
                                <button className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 shrink-0">
                                    <span className="text-xl">+</span>
                                    <span className="text-[10px] font-bold">Add Photo</span>
                                </button>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div>
                            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">Reviews</h3>
                            <div className="space-y-3">
                                {selectedRoute.reviews.map((review, i) => (
                                    <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-sm text-gray-800">{review.user}</span>
                                            <span className="text-xs">{renderStars(review.rating)}</span>
                                        </div>
                                        <p className="text-gray-600 text-xs italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Start Button */}
                        <div className="pt-4 pb-4">
                            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                                <span>🚲</span> Start This Route
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // --- List View ---
    return (
        <div className="flex flex-col h-full bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Explore Routes</h1>
                    <button 
                        onClick={() => alert("Add New Route Flow")}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
                    >
                        + New
                    </button>
                </div>
                
                {/* Search Bar - Fixed Flex Layout */}
                <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                    <span className="text-gray-400 text-lg">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search by region (e.g., Waterfront)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-medium flex-1 text-gray-800 placeholder-gray-500 h-full"
                    />
                </div>
            </div>

            {/* Route List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredRoutes.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">
                        <div className="text-4xl mb-2">🏜️</div>
                        <p className="text-sm">No routes found in this region.</p>
                    </div>
                ) : (
                    filteredRoutes.map(route => (
                        <div 
                            key={route.id}
                            onClick={() => handleRouteClick(route)}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
                        >
                            {/* Card Image Area */}
                            <div className="h-32 bg-gray-200 relative flex items-center justify-center">
                                <span className="text-4xl opacity-50">🗺️</span>
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold">
                                    {route.distance}
                                </div>
                                <div className="absolute bottom-2 left-2 flex gap-1">
                                    {route.photos.slice(0, 3).map((p, i) => (
                                        <div key={i} className="w-6 h-6 bg-white/90 rounded-md flex items-center justify-center text-xs shadow-sm">
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Card Content */}
                            <div className="p-3">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className="font-bold text-gray-800">{route.name}</h3>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
                                        <span className="text-yellow-500 text-xs">★</span>
                                        <span className="text-xs font-bold text-yellow-700">{route.rating}</span>
                                    </div>
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
                                    <span className="text-xs text-gray-400">View Details →</span>
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