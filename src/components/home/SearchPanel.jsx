export default function SearchPanel({ 
  startText, setStartText, 
  searchText, setSearchText, 
  searchError, setSearchError, 
  handleSearch, handleSwapLocations 
}) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="px-3 pt-3">
      <div className="flex gap-2 items-stretch">
        <div className="flex-1 flex flex-col gap-2 relative border-2 border-gray-800 rounded-lg bg-white p-2 shadow-sm">
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-300 z-0"></div>

          <div className="flex items-center gap-2 relative z-10 bg-white">
            <span className="text-xs">📍</span>
            <input
              type="text"
              placeholder="From..."
              value={startText}
              onChange={(e) => setStartText(e.target.value)}
              className="flex-1 outline-none text-sm bg-gray-50 rounded px-2 py-1"
            />
          </div>
          
          <div className="flex items-center gap-2 relative z-10 bg-white">
            <span className="text-xs">🔍</span>
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value)
                if (searchError) setSearchError('')
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-sm bg-gray-50 rounded px-2 py-1"
            />
          </div>

          <button 
            onClick={handleSwapLocations}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-100 hover:bg-gray-200 p-1.5 rounded-full border border-gray-300 transition-colors shadow-md text-sm font-bold"
          >
            ⇅
          </button>
        </div>

        <button
          onClick={handleSearch}
          className="border-2 border-gray-800 rounded-lg bg-blue-500 text-white px-4 py-2 text-sm font-bold shadow-sm active:bg-blue-600 transition-colors flex items-center"
        >
          Go
        </button>
      </div>
      {searchError && (
        <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{searchError}</p>
      )}
    </div>
  )
}