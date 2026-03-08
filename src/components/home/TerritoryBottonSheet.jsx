export default function TerritoryBottomSheet({
  displayTerritory,
  isCurrentSessionActive,
  activeTerritorySession,
  isClaiming,
  handleStartCapture,
  setActiveTerritorySession,
  setSelectedTerritory
}) {
  return (
    <div 
      className={`absolute bottom-0 left-0 right-0 bg-white border-t-2 border-gray-800 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-[1000] px-4 py-4 transition-transform duration-300 ease-in-out ${
          displayTerritory ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {displayTerritory && (
          <div>
              {isCurrentSessionActive ? (
                  <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                          <h2 className="text-sm font-bold text-gray-800">🚩 Capturing {displayTerritory.name}...</h2>
                          <span className="text-xs font-bold text-gray-600">
                              {activeTerritorySession.progress} / {activeTerritorySession.target} km
                          </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden border border-gray-300">
                          <div 
                              className="h-full rounded-full transition-all duration-1000" 
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
                              className="mt-2 w-full bg-green-500 text-white font-bold py-2 rounded-lg text-sm border-2 border-green-800 shadow-sm"
                          >
                              Complete Capture! 🎉
                          </button>
                      ) : (
                          <button 
                              onClick={() => setActiveTerritorySession(null)}
                              className="mt-1 text-center text-xs text-red-500 font-bold py-1 active:scale-[0.98]"
                          >
                              Cancel Session
                          </button>
                      )}
                  </div>
              ) : (
                  <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 overflow-hidden">
                          <h2 className="text-base font-bold text-gray-800 truncate">{displayTerritory.name}</h2>
                          <p className="text-xs text-gray-500 truncate">Ride 2km to claim</p>
                      </div>
                      
                      <button 
                          onClick={handleStartCapture}
                          disabled={isClaiming || activeTerritorySession}
                          className={`font-bold text-sm px-4 py-2 rounded-xl border-2 border-gray-800 shadow-sm transition-all active:scale-[0.98] whitespace-nowrap flex items-center gap-1 ${
                              (isClaiming || activeTerritorySession)
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400' 
                                  : 'text-white'
                          }`}
                          style={{ backgroundColor: (isClaiming || activeTerritorySession) ? '' : displayTerritory.color }}
                      >
                          {isClaiming ? '⏳...' : activeTerritorySession ? 'Busy' : '🚩 Start Capture'}
                      </button>

                      {!activeTerritorySession && (
                          <button 
                              onClick={() => setSelectedTerritory(null)} 
                              className="w-8 h-8 bg-gray-50 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition-colors shrink-0 font-bold"
                          >
                              ✕
                          </button>
                      )}
                  </div>
              )}
          </div>
      )}
    </div>
  )
}