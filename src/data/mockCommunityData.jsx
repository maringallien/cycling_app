export const initialMyGroups = [
  { id: 1, name: 'Urban Explorers', role: 'Member', nextRide: 'Sat 10:00 AM', battles: 2 },
  { id: 2, name: 'Night Riders', role: 'Admin', nextRide: 'Tue 8:00 PM', battles: 0 }
]

export const initialStolenBikes = [
  { 
      id: 1, 
      name: 'Trek Domane AL 2', 
      color: 'Red & Black',
      location: 'Downtown Metro Station', 
      date: 'Oct 24, 2023', 
      time: 'Between 2-4 PM',
      image: '🚲', 
      serial: 'WTU-192-X99',
      desc: 'Scratched left pedal. Has a distinctive yellow bottle cage attached to the frame.',
      status: 'Stolen'
  },
  { 
      id: 2, 
      name: 'Cannondale Topstone', 
      color: 'Midnight Blue',
      location: 'City Park Bike Rack', 
      date: 'Oct 22, 2023', 
      time: 'Overnight',
      image: '🚲', 
      serial: 'Unknown',
      desc: 'Gravel tires fitted. Stickers on the top tube.',
      status: 'Stolen'
  },
   { 
      id: 3, 
      name: 'Specialized Rockhopper', 
      color: 'Neon Green',
      location: 'University Campus', 
      date: 'Oct 20, 2023', 
      time: '10:00 AM',
      image: '🚲', 
      serial: 'SPZ-555-001',
      desc: 'Mint condition, brand new grips.',
      status: 'Recovered' 
  }
]

export const allGroups = [
  { id: 3, name: 'Morning Coffee Crew', members: 45, type: 'Social', nextRide: 'Tomorrow, 6:30 AM' },
  { id: 4, name: 'Velo Racers', members: 312, type: 'Competitive', nextRide: 'Wed, 5:00 PM' },
  { id: 5, name: 'Sunday Spinners', members: 89, type: 'Casual', nextRide: 'Sun, 9:00 AM' },
  { id: 6, name: 'Mountain Goats', members: 15, type: 'Off-road', nextRide: 'Sat, 7:00 AM' },
  { id: 7, name: 'Downtown Commuters', members: 120, type: 'Commute', nextRide: 'Mon, 7:30 AM' }
]

export const groupDetails = {
  id: 1,
  name: 'Urban Explorers',
  announcement: '📢 Annual AGM is this Friday at the Community Center!',
  upcomingRides: [
    { id: 101, title: 'Saturday Morning Coffee', time: 'Sat, 10:00 AM', attendees: 12 },
    { id: 102, title: 'Wednesday Intervals', time: 'Wed, 6:30 PM', attendees: 5 }
  ],
  members: [
    { name: 'Marcus Chen', role: 'Admin', status: 'Online' },
    { name: 'Sarah J.', role: 'Member', status: 'Riding Now' },
    { name: 'David O.', role: 'Member', status: 'Offline' },
    { name: 'You', role: 'Member', status: 'Online' }
  ],
  battles: [
    { id: 201, zone: 'Riverside Path', enemy: 'The Road Runners', status: 'Losing', health: 35 },
    { id: 202, zone: 'High Park Loop', enemy: 'Velo City', status: 'Winning', health: 80 }
  ]
}

export const battleDetails = {
  zone: 'Riverside Path',
  enemy: 'The Road Runners',
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