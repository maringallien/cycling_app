import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function TerritoryScreen({ activeTerritorySession, setActiveTerritorySession }) {
    const mapRef = useRef(null)
    const [isClaiming, setIsClaiming] = useState(false)
    const [selectedTerritory, setSelectedTerritory] = useState(null)

    const defaultCenter = [49.2827, -123.1207] 

    useEffect(() => {
        if (!mapRef.current) return

        const map = L.map(mapRef.current, {
            zoomControl: false, 
        }).setView(defaultCenter, 13)

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        }).addTo(map)

        map.on('click', () => {
            setSelectedTerritory(null)
        })

        const territories = [
            { id: 't1', name: 'Downtown Core', coords: [[49.285, -123.115], [49.280, -123.110], [49.278, -123.125], [49.282, -123.130]], color: '#ef4444' },
            { id: 't2', name: 'Stanley Park', coords: [[49.305, -123.145], [49.298, -123.135], [49.292, -123.148], [49.300, -123.155]], color: '#3b82f6' },
            { id: 't3', name: 'Kitsilano Area', coords: [[49.275, -123.150], [49.268, -123.145], [49.265, -123.160], [49.272, -123.165]], color: '#10b981' },
            { id: 't4', name: 'False Creek', coords: [[49.272, -123.110], [49.265, -123.100], [49.260, -123.115], [49.268, -123.125]], color: '#f59e0b' }
        ];

        territories.forEach(territory => {
            const polygon = L.polygon(territory.coords, { 
                color: territory.color, 
                fillColor: territory.color, 
                fillOpacity: 0.3,
                weight: 2
            }).addTo(map)

            polygon.on('click', (e) => {
                L.DomEvent.stopPropagation(e) 
                setSelectedTerritory(territory)
            })
        });

        return () => map.remove()
    }, [])

    const handleStartCapture = () => {
        setIsClaiming(true)
        setTimeout(() => {
            // Set global active session instead of alerting
            setActiveTerritorySession({
                ...selectedTerritory,
                progress: 0.0,
                target: 2.0
            })
            setIsClaiming(false)
        }, 600)
    }

    // Determine what to display in the bottom bar
    const displayTerritory = selectedTerritory || activeTerritorySession;
    const isCurrentSessionActive = activeTerritorySession && displayTerritory?.id === activeTerritorySession.id;

    return (
        <div className="flex flex-col h-full bg-white relative">
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 py-3 flex justify-between items-center shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">Territories</h1>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                    Your Rank: #12
                </div>
            </div>

            <div className="flex-1 relative z-0 overflow-hidden">
                <div ref={mapRef} className="w-full h-full" />

                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md z-[1000] border border-gray-100 text-sm font-medium text-gray-700 whitespace-nowrap">
                    Tap an area to claim it! 🚴
                </div>
                
                <button 
                    className={`absolute right-4 bg-white p-3 rounded-full shadow-lg z-[1000] border border-gray-100 active:bg-gray-50 transition-all duration-300 ${displayTerritory ? 'bottom-28' : 'bottom-6'}`}
                >
                    📍
                </button>

                {/* Bottom Bar UI */}
                <div 
                    className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-[1000] px-4 py-4 transition-transform duration-300 ease-in-out ${
                        displayTerritory ? 'translate-y-0' : 'translate-y-full'
                    }`}
                >
                    {displayTerritory && (
                        <div>
                            {/* IF ACTIVE SESSION IS RUNNING ON THIS TERRITORY */}
                            {isCurrentSessionActive ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-sm font-bold text-gray-800">🚩 Capturing {displayTerritory.name}...</h2>
                                        <span className="text-xs font-bold text-gray-600">
                                            {activeTerritorySession.progress} / {activeTerritorySession.target} km
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className="h-2.5 rounded-full transition-all duration-1000" 
                                            style={{ 
                                                width: `${Math.min((activeTerritorySession.progress / activeTerritorySession.target) * 100, 100)}%`,
                                                backgroundColor: displayTerritory.color 
                                            }}
                                        ></div>
                                    </div>
                                    {activeTerritorySession.progress >= activeTerritorySession.target ? (
                                        <button 
                                            onClick={() => {
                                                alert("Territory Claimed!")
                                                setActiveTerritorySession(null)
                                                setSelectedTerritory(null)
                                            }}
                                            className="mt-2 w-full bg-green-500 text-white font-bold py-2 rounded-lg text-sm"
                                        >
                                            Complete Capture! 🎉
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => setActiveTerritorySession(null)}
                                            className="mt-1 text-center text-xs text-red-500 font-bold py-1"
                                        >
                                            Cancel Session
                                        </button>
                                    )}
                                </div>
                            ) : (
                                /* DEFAULT CLAIM VIEW */
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex-1 overflow-hidden">
                                        <h2 className="text-base font-bold text-gray-800 truncate">{displayTerritory.name}</h2>
                                        <p className="text-xs text-gray-500 truncate">Ride 2km to claim</p>
                                    </div>
                                    
                                    <button 
                                        onClick={handleStartCapture}
                                        disabled={isClaiming || activeTerritorySession}
                                        className={`font-bold text-sm px-4 py-2 rounded-xl shadow-sm transition-all active:scale-[0.98] whitespace-nowrap flex items-center gap-1 ${
                                            (isClaiming || activeTerritorySession)
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                                : 'text-white'
                                        }`}
                                        style={{ backgroundColor: (isClaiming || activeTerritorySession) ? '' : displayTerritory.color }}
                                    >
                                        {isClaiming ? '⏳...' : activeTerritorySession ? 'Busy' : '🚩 Start Capture'}
                                    </button>

                                    {!activeTerritorySession && (
                                        <button 
                                            onClick={() => setSelectedTerritory(null)} 
                                            className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 active:bg-gray-100 transition-colors shrink-0"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TerritoryScreen