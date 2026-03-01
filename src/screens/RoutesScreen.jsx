import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// --- Mini Map Preview Component for List View ---
function MapPreview({ coordinates }) {
    const mapRef = useRef(null)
    const mapInstance = useRef(null)

    useEffect(() => {
        if (mapRef.current && !mapInstance.current) {
            // Initialize as a static, non-interactive map for the list view
            mapInstance.current = L.map(mapRef.current, {
                zoomControl: false,
                scrollWheelZoom: false,
                dragging: false,
                touchZoom: false,
                doubleClickZoom: false,
                boxZoom: false,
                keyboard: false,
                attributionControl: false
            })

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {}).addTo(mapInstance.current)

            const polyline = L.polyline(coordinates, { 
                color: '#2563EB', 
                weight: 3,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(mapInstance.current)
            
            mapInstance.current.fitBounds(polyline.getBounds(), { padding: [10, 10] })
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove()
                mapInstance.current = null
            }
        }
    }, [coordinates])

    return <div ref={mapRef} className="w-full h-full z-0" />
}

function RoutesScreen() {
    const [view, setView] = useState('list') // 'list' or 'detail'
    const [selectedRoute, setSelectedRoute] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('official') // 'official' or 'personal'
    const detailMapRef = useRef(null)

    // --- Dummy Data (Vancouver Region) ---
    const officialRoutes = [
        { 
            id: 'o1', 
            name: 'Stanley Park Seawall Loop', 
            region: 'Waterfront', 
            rating: 4.8, 
            difficulty: 'Easy', 
            time: '45 min', 
            distance: '10 km',
            description: 'A beautiful flat ride along the water. Perfect for beginners or a relaxing sunset ride. Paved path the entire way.',
            photos: ['🌊', '🌅', '🚲'],
            reviews: [
                { user: 'Alex', rating: 5, comment: 'Absolutely stunning views!' },
                { user: 'Sam', rating: 4, comment: 'Gets a bit crowded on weekends.' }
            ],
            coordinates: [
                [49.2990, -123.1306], [49.3023, -123.1436], [49.3134, -123.1447],
                [49.3132, -123.1565], [49.3006, -123.1582], [49.2903, -123.1448],
                [49.2990, -123.1306]
            ]
        },
        { 
            id: 'o2', 
            name: 'Cypress Mountain Climb', 
            region: 'North Shore', 
            rating: 4.8, 
            difficulty: 'Hard', 
            time: '1h 30m', 
            distance: '15 km',
            description: 'Challenge your legs with this classic North Shore climb. Great for training and stunning views of the city at the top.',
            photos: ['🏔️', '🥵', '🌳'],
            reviews: [
                { user: 'Chris', rating: 5, comment: 'Best workout in the city.' },
                { user: 'Jordan', rating: 3, comment: 'Incredibly tough!' }
            ],
            coordinates: [
                [49.3361, -123.1873], [49.3458, -123.1856], [49.3567, -123.1901],
                [49.3664, -123.1932], [49.3804, -123.1993], [49.3957, -123.2036]
            ]
        },
        { 
            id: 'o3', 
            name: 'Pacific Spirit Gravel', 
            region: 'Point Grey', 
            rating: 4.9, 
            difficulty: 'Medium', 
            time: '1h 15m', 
            distance: '14 km',
            description: 'Mixed terrain adventure through the park. Beautiful towering trees and quiet gravel paths.',
            photos: ['🌲', '🪨', '🦊'],
            reviews: [
                { user: 'Taylor', rating: 5, comment: 'Hidden gem.' }
            ],
            coordinates: [
                [49.2605, -123.2120], [49.2550, -123.2205], [49.2483, -123.2163],
                [49.2430, -123.2250], [49.2510, -123.2355]
            ]
        }
    ]

    const personalRoutes = [
        {
            id: 'p1', 
            name: 'Commute to Office', 
            region: 'Kitsilano to Downtown', 
            rating: 0, 
            difficulty: 'Medium', 
            time: '25 min', 
            distance: '6 km',
            description: 'My daily route over the Burrard Bridge avoiding major traffic.',
            photos: ['🏢', '🌉'],
            reviews: [],
            coordinates: [
                [49.2684, -123.1558], [49.2730, -123.1470], [49.2775, -123.1375],
                [49.2820, -123.1235]
            ]
        },
        {
            id: 'p2', 
            name: 'Weekend False Creek', 
            region: 'False Creek', 
            rating: 0, 
            difficulty: 'Easy', 
            time: '40 min', 
            distance: '9 km',
            description: 'Relaxed weekend loop passing Science World and Granville Island.',
            photos: ['⛵', '🔬'],
            reviews: [],
            coordinates: [
                [49.2705, -123.1360], [49.2732, -123.1190], [49.2734, -123.1030],
                [49.2680, -123.1110], [49.2665, -123.1330], [49.2705, -123.1360]
            ]
        }
    ]

    // --- Handle Interactive Detail Map Lifecycle ---
    useEffect(() => {
        if (view === 'detail' && selectedRoute && detailMapRef.current) {
            const map = L.map(detailMapRef.current, {
                zoomControl: false, 
                scrollWheelZoom: false,
            })

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }).addTo(map)

            const polyline = L.polyline(selectedRoute.coordinates, { 
                color: '#2563EB', 
                weight: 4,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(map)
            
            map.fitBounds(polyline.getBounds(), { padding: [20, 20] })

            return () => map.remove()
        }
    }, [view, selectedRoute])

    const renderStars = (rating) => {
        if (!rating) return <span className="text-gray-400 text-sm">Unrated</span>
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(<span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>★</span>)
        }
        return <span className="text-lg">{stars}</span>
    }

    const currentRoutesList = activeTab === 'official' ? officialRoutes : personalRoutes
    const filteredRoutes = currentRoutesList.filter(route => 
        route.region.toLowerCase().includes(searchTerm.toLowerCase()) || 
        route.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // --- Detail View ---
    if (view === 'detail' && selectedRoute) {
        return (
            <div className="flex flex-col h-full bg-white relative">
                <div className="flex items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-20">
                    <button onClick={() => setView('list')} className="text-blue-600 font-bold text-sm">← Back</button>
                    <span className="flex-1 text-center font-bold text-gray-800">Route Details</span>
                    <div className="w-8"></div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="h-56 bg-gray-100 relative border-b border-gray-200 z-0">
                        <div ref={detailMapRef} className="w-full h-full" />
                        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm z-[1000]">
                            {selectedRoute.distance}
                        </div>
                    </div>

                    <div className="p-5 space-y-6">
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

                        <div>
                            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">About this Route</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{selectedRoute.description}</p>
                        </div>

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
            {/* Header & Search */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="p-4 pb-2">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">Routes</h1>
                        <button 
                            onClick={() => alert("Add New Route Flow")}
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-blue-700 transition-colors"
                        >
                            + Create
                        </button>
                    </div>
                    
                    <div className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
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
                <div className="flex px-4 mt-2">
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
                            {/* Real Mini Map Preview */}
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