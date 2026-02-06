function PhoneFrame({ children }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 p-4">
      <div className="rounded-3xl p-3 shadow-xl" style={{ background: '#2D3748', width: '375px' }}>
        {/* Notch */}
        <div className="flex justify-center mb-1">
          <div className="w-20 h-3 bg-black rounded-full"></div>
        </div>
        {/* Screen */}
        <div className="rounded-xl overflow-hidden bg-white" style={{ height: '680px' }}>
          {children}
        </div>
        {/* Home indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-24 h-1 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default PhoneFrame