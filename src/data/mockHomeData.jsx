export const heatMapZones = [
  { center: [49.295, -123.135], radius: 800, color: '#ef4444' }, 
  { center: [49.273, -123.104], radius: 600, color: '#f97316' }, 
  { center: [49.270, -123.155], radius: 700, color: '#eab308' }, 
]

export const theftMapZones = [
  { center: [49.283, -123.100], radius: 500, color: '#9333ea' }, 
  { center: [49.260, -123.113], radius: 450, color: '#4f46e5' }, 
]

export const territories = [
  { id: 't1', name: 'Downtown Core', coords: [[49.285, -123.115], [49.280, -123.110], [49.278, -123.125], [49.282, -123.130]], color: '#ef4444' },
  { id: 't2', name: 'Stanley Park', coords: [[49.305, -123.145], [49.298, -123.135], [49.292, -123.148], [49.300, -123.155]], color: '#3b82f6' },
  { id: 't3', name: 'Kitsilano Area', coords: [[49.275, -123.150], [49.268, -123.145], [49.265, -123.160], [49.272, -123.165]], color: '#10b981' },
  { id: 't4', name: 'False Creek', coords: [[49.272, -123.110], [49.265, -123.100], [49.260, -123.115], [49.268, -123.125]], color: '#f59e0b' }
]

export const modes = [
  { id: 'direct', label: '🛤️ Direct', color: 'bg-blue-200', desc: 'Fastest route, may include busy roads' },
  { id: 'safe', label: '🛡️ Safe', color: 'bg-green-200', desc: 'Only designated bike paths & quiet streets' },
  { id: 'discovery', label: '🧭 Discover', color: 'bg-yellow-200', desc: 'Scenic routes through attractive areas' },
]