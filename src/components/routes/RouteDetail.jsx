import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function RouteDetail({ route, handleBack, onStartRoute }) {
    const detailMapRef = useRef(null)

    useEffect(() => {
        if (route && detailMapRef.current) {
            const map = L.map(detailMapRef.current, {
                zoomControl: false, 
                scrollWheelZoom: false,
            })

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
            }).addTo(map)

            const polyline = L.polyline(route.coordinates, { 
                color: '#2563EB', 
                weight: 4,
                lineCap: 'round',
                lineJoin: 'round'
            }).addTo(map)
            
            map.fitBounds(polyline.getBounds(), { padding: [20, 20] })

            return () => map.remove()
        }
    }, [route])

    if (!route) return null;

    const renderStars = (rating) => {
        if (!rating) return <span className="text-gray-400 text-sm">Unrated</span>
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(<span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>★</span>)
        }
        return <span className="text-lg">{stars}</span>
    }

    return (
        <div className="flex flex-col h-full bg-white relative">
            <div className="flex items-center px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-20">
                <button onClick={handleBack} className="text-blue-600 font-bold text-sm">← Back</button>
                <span className="flex-1 text-center font-bold text-gray-800">Route Details</span>
                <div className="w-8"></div>
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="h-56 bg-gray-100 relative border-b border-gray-200 z-0">
                    <div ref={detailMapRef} className="w-full h-full" />
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm z-[1000]">
                        {route.distance}
                    </div>
                </div>

                <div className="p-5 space-y-6">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">{route.name}</h1>
                            <div className="flex flex-col items-end">
                                {renderStars(route.rating)}
                                <span className="text-xs text-gray-500 font-medium">{route.reviews.length} reviews</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                            <span>📍 {route.region}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                            <div className="text-xs text-gray-400 font-bold uppercase">Difficulty</div>
                            <div className={`font-bold ${
                                route.difficulty === 'Easy' ? 'text-green-600' :
                                route.difficulty === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                            }`}>{route.difficulty}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                            <div className="text-xs text-gray-400 font-bold uppercase">Time</div>
                            <div className="font-bold text-gray-800">{route.time}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                            <div className="text-xs text-gray-400 font-bold uppercase">Photos</div>
                            <div className="font-bold text-gray-800">{route.photos.length}</div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">About this Route</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{route.description}</p>
                    </div>

                    <div className="pt-4 pb-4">
                        <button 
                            onClick={() => onStartRoute(route)}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <span>🚲</span> Start This Route
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}