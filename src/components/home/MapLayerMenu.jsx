export default function MapLayersMenu({
  isOpen, setIsOpen,
  showHeatMap, setShowHeatMap,
  showTheftMap, setShowTheftMap,
  showTerritories, setShowTerritories,
  isCreatingTerritory, setIsCreatingTerritory
}) {
  return (
    <div className="absolute top-2 right-2 flex flex-col items-end z-[400]">
      <button 
          id="tour-layers-btn"
          onClick={() => setIsOpen(!isOpen)} 
          className={`w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-800 shadow-md transition-all active:scale-[0.95] ${isOpen ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
      >
          <span className="text-xl leading-none">🗺️</span>
      </button>

      {isOpen && (
          <div className="mt-2 w-48 bg-white border-2 border-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Map Layers
              </div>
              <div id="tour-menu-filters" className="flex flex-col">
                  <button onClick={() => setShowHeatMap(!showHeatMap)} className="px-3 py-3 text-sm font-bold flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <span className="flex items-center gap-2"><span className="w-4">🔥</span> Activity</span>
                      <div className={`w-8 h-4 rounded-full transition-colors relative ${showHeatMap ? 'bg-red-500' : 'bg-gray-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showHeatMap ? 'translate-x-4' : ''}`}></div>
                      </div>
                  </button>
                  <button onClick={() => setShowTheftMap(!showTheftMap)} className="px-3 py-3 text-sm font-bold flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <span className="flex items-center gap-2"><span className="w-4">🚨</span> Theft</span>
                      <div className={`w-8 h-4 rounded-full transition-colors relative ${showTheftMap ? 'bg-purple-500' : 'bg-gray-300'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showTheftMap ? 'translate-x-4' : ''}`}></div>
                      </div>
                  </button>
              </div>
              <button id="tour-menu-territory" onClick={() => setShowTerritories(!showTerritories)} className="px-3 py-3 text-sm font-bold flex items-center justify-between hover:bg-gray-50 border-b border-gray-100 transition-colors">
                  <span className="flex items-center gap-2"><span className="w-4">🚩</span> Territories</span>
                  <div className={`w-8 h-4 rounded-full transition-colors relative ${showTerritories ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${showTerritories ? 'translate-x-4' : ''}`}></div>
                  </div>
              </button>
              
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                  Actions
              </div>
              <button id="tour-menu-create" onClick={() => setIsCreatingTerritory(!isCreatingTerritory)} className={`px-3 py-3 text-sm font-bold flex items-center justify-between transition-colors ${isCreatingTerritory ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-800'}`}>
                  <span className="flex items-center gap-2"><span className="w-4">➕</span> {isCreatingTerritory ? 'Cancel Create' : 'New Territory'}</span>
              </button>
          </div>
      )}
    </div>
  )
}