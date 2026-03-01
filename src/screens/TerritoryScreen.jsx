import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

function TerritoryScreen() {
    const mapRef = useRef(null)
    const [isClaiming, setIsClaiming] = useState(false)

    // Example coordinates for Vancouver region
    const defaultCenter = [49.2827, -123.1207] 

    useEffect(() => {
        if (!mapRef.current) return

        const map = L.map(mapRef.current, {
            zoomControl: false, // We'll hide default controls for a cleaner mobile look
        }).setView(defaultCenter, 13)

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        }).addTo(map)

        // Dummy territories
        L.polygon([
            [49.285, -123.115],
            [49.280, -123.110],
            [49.278, -123.125],
            [49.282, -123.130]
        ], { color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.2 }).addTo(map)

        return () => map.remove()
    }, [])

    const handleClaimArea = () => {
        setIsClaiming(true)
        // Simulate a network request or interaction
        setTimeout(() => {
            alert("Area Claimed Successfully!")
            setIsClaiming(false)
        }, 800)
    }

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 px-4 py-3 flex justify-between items-center shadow-sm">
                <h1 className="text-2xl font-bold text-gray-800">Territories</h1>
                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                    Your Rank: #12
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative z-0">
                <div ref={mapRef} className="w-full h-full" />

                {/* Status/Info Overlay (Top) */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md z-[1000] border border-gray-100 text-sm font-medium text-gray-700 whitespace-nowrap">
                    Ride in an area to claim it! 🚴
                </div>

                {/* Floating "Claim Area" Button (Bottom Center) */}
                <div className="absolute bottom-6 left-0 right-0 px-6 z-[1000] flex justify-center pointer-events-none">
                    <button 
                        onClick={handleClaimArea}
                        disabled={isClaiming}
                        className={`pointer-events-auto w-full max-w-sm font-bold text-lg py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                            isClaiming 
                                ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                    >
                        {isClaiming ? (
                            <span>Claiming... ⏳</span>
                        ) : (
                            <>
                                <span>🚩</span> Claim This Area
                            </>
                        )}
                    </button>
                </div>
                
                {/* Optional: Map Action Buttons (e.g., Center location) */}
                <button className="absolute bottom-24 right-4 bg-white p-3 rounded-full shadow-lg z-[1000] border border-gray-100 active:bg-gray-50 transition-colors">
                    📍
                </button>
            </div>
        </div>
    )
}

export default TerritoryScreen