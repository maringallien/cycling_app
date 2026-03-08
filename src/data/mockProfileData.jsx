export const userProfile = {
  name: 'Maria Santos',
  type: 'Commuter',
  memberSince: 'Sept 2023',
  avatarColor: 'bg-teal-600',
  stats: {
    rides: 142,
    distance: '1,240 km',
    contributions: 5
  }
}

export const bikes = [
  { id: 1, name: 'Specialized Sirrus', type: 'Hybrid', primary: true },
  { id: 2, name: 'Brompton', type: 'Folding', primary: false }
]

export const weeklyData = [
  { day: 'M', km: 12, height: '40%' },
  { day: 'T', km: 0, height: '5%' },
  { day: 'W', km: 24, height: '70%' },
  { day: 'T', km: 8, height: '25%' },
  { day: 'F', km: 15, height: '50%' },
  { day: 'S', km: 45, height: '100%' },
  { day: 'S', km: 30, height: '75%' },
]

export const rideHistory = [
  { id: 1, date: 'Today, 8:30 AM', route: 'Morning Commute', distance: '8.4 km', time: '28 min', avgSpeed: '18.2 km/h', mode: 'Direct', elevation: '45m' },
  { id: 2, date: 'Yesterday, 5:15 PM', route: 'Ride Home', distance: '8.5 km', time: '32 min', avgSpeed: '16.5 km/h', mode: 'Safe', elevation: '42m' },
  { id: 3, date: 'Sat, Oct 24', route: 'Weekend Loop', distance: '42.0 km', time: '2h 15m', avgSpeed: '19.8 km/h', mode: 'Discovery', elevation: '320m' },
  { id: 4, date: 'Fri, Oct 23', route: 'Downtown Dash', distance: '12.2 km', time: '45 min', avgSpeed: '17.1 km/h', mode: 'Direct', elevation: '80m' },
  { id: 5, date: 'Wed, Oct 21', route: 'Coffee Run', distance: '3.1 km', time: '12 min', avgSpeed: '15.5 km/h', mode: 'Safe', elevation: '15m' },
  { id: 6, date: 'Mon, Oct 19', route: 'Morning Commute', distance: '8.4 km', time: '29 min', avgSpeed: '17.9 km/h', mode: 'Direct', elevation: '45m' },
]

export const personalTerritories = [
  { id: 1, name: 'Downtown Core', status: 'Claimed', detail: 'Claimed Oct 12, 2023', color: '#ef4444' },
  { id: 2, name: 'Kitsilano Area', status: 'Claimed', detail: 'Claimed Nov 05, 2023', color: '#10b981' },
  { id: 3, name: 'False Creek', status: 'Capturing', detail: '1.2 / 2.0 km', color: '#f59e0b' },
  { id: 4, name: 'Commercial Drive', status: 'Lost', detail: 'Overtaken 2 days ago', color: '#6b7280' }
]

export const dummyBattleDetails = {
  yourScore: 35,
  enemyScore: 65,
  topAllies: [
    { name: 'Marcus Chen', pts: 450 },
    { name: 'Sarah J.', pts: 320 },
    { name: 'You', pts: 110 }
  ],
  topEnemies: [
    { name: 'Speedy_G', pts: 890 },
    { name: 'RoadWarrior', pts: 560 },
    { name: 'BikeMike', pts: 440 }
  ]
}