import { useState } from 'react'

export default function ReportForm({ handleBack, onSubmit }) {
  const [reportForm, setReportForm] = useState({
    name: '', color: '', location: '', date: '', time: '', serial: '', desc: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(reportForm)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 relative">
        <div className="bg-white p-4 border-b border-gray-200 sticky top-0 flex items-center gap-3 z-10">
            <button onClick={handleBack} className="text-gray-500 font-bold">← Back</button>
            <h1 className="text-lg font-bold flex-1 text-center text-red-600">Report Stolen Bike</h1>
            <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Bike Model / Name *</label>
                        <input required value={reportForm.name} onChange={e => setReportForm({...reportForm, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Trek Domane AL 2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Color *</label>
                          <input required value={reportForm.color} onChange={e => setReportForm({...reportForm, color: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Red & Black" />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Serial Number</label>
                          <input value={reportForm.serial} onChange={e => setReportForm({...reportForm, serial: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="Optional" />
                      </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Last Seen Location *</label>
                        <input required value={reportForm.location} onChange={e => setReportForm({...reportForm, location: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Downtown Metro Station" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Date *</label>
                          <input type="text" required value={reportForm.date} onChange={e => setReportForm({...reportForm, date: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. Oct 24, 2023" />
                      </div>
                      <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Time</label>
                          <input value={reportForm.time} onChange={e => setReportForm({...reportForm, time: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="e.g. 2:00 PM" />
                      </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Description / Distinct Features</label>
                        <textarea value={reportForm.desc} onChange={e => setReportForm({...reportForm, desc: e.target.value})} rows="3" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-red-500 focus:bg-white transition-colors" placeholder="Any stickers, scratches, or custom parts?"></textarea>
                    </div>
                </div>

                <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                    <span>🚨</span> Submit Theft Report
                </button>
            </form>
        </div>
    </div>
  )
}