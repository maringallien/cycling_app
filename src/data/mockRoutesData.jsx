export const officialRoutes = [
  { 
      id: 'o1', 
      name: 'Stanley Park Seawall Loop', 
      region: 'Waterfront', 
      rating: 4.8, 
      difficulty: 'Easy', 
      time: '45 min', 
      distance: '10 km',
      description: 'A beautiful flat ride along the water. Perfect for beginners or a relaxing sunset ride. Paved path the entire way.',
      photos: ['🌊', '🌅', '🚲'],
      reviews: [
          { user: 'Alex', rating: 5, comment: 'Absolutely stunning views!' },
          { user: 'Sam', rating: 4, comment: 'Gets a bit crowded on weekends.' }
      ],
      coordinates: [
          [49.2990, -123.1306], [49.3023, -123.1436], [49.3134, -123.1447],
          [49.3132, -123.1565], [49.3006, -123.1582], [49.2903, -123.1448],
          [49.2990, -123.1306]
      ]
  },
  { 
      id: 'o2', 
      name: 'Cypress Mountain Climb', 
      region: 'North Shore', 
      rating: 4.8, 
      difficulty: 'Hard', 
      time: '1h 30m', 
      distance: '15 km',
      description: 'Challenge your legs with this classic North Shore climb. Great for training and stunning views of the city at the top.',
      photos: ['🏔️', '🥵', '🌳'],
      reviews: [
          { user: 'Chris', rating: 5, comment: 'Best workout in the city.' },
          { user: 'Jordan', rating: 3, comment: 'Incredibly tough!' }
      ],
      coordinates: [
          [49.3361, -123.1873], [49.3458, -123.1856], [49.3567, -123.1901],
          [49.3664, -123.1932], [49.3804, -123.1993], [49.3957, -123.2036]
      ]
  },
  { 
      id: 'o3', 
      name: 'Pacific Spirit Gravel', 
      region: 'Point Grey', 
      rating: 4.9, 
      difficulty: 'Medium', 
      time: '1h 15m', 
      distance: '14 km',
      description: 'Mixed terrain adventure through the park. Beautiful towering trees and quiet gravel paths.',
      photos: ['🌲', '🪨', '🦊'],
      reviews: [
          { user: 'Taylor', rating: 5, comment: 'Hidden gem.' }
      ],
      coordinates: [
          [49.2605, -123.2120], [49.2550, -123.2205], [49.2483, -123.2163],
          [49.2430, -123.2250], [49.2510, -123.2355]
      ]
  }
]

export const personalRoutes = [
  {
      id: 'p1', 
      name: 'Commute to Office', 
      region: 'Kitsilano to Downtown', 
      rating: 0, 
      difficulty: 'Medium', 
      time: '25 min', 
      distance: '6 km',
      description: 'My daily route over the Burrard Bridge avoiding major traffic.',
      photos: ['🏢', '🌉'],
      reviews: [],
      coordinates: [
          [49.2684, -123.1558], [49.2730, -123.1470], [49.2775, -123.1375],
          [49.2820, -123.1235]
      ]
  },
  {
      id: 'p2', 
      name: 'Weekend False Creek', 
      region: 'False Creek', 
      rating: 0, 
      difficulty: 'Easy', 
      time: '40 min', 
      distance: '9 km',
      description: 'Relaxed weekend loop passing Science World and Granville Island.',
      photos: ['⛵', '🔬'],
      reviews: [],
      coordinates: [
          [49.2705, -123.1360], [49.2732, -123.1190], [49.2734, -123.1030],
          [49.2680, -123.1110], [49.2665, -123.1330], [49.2705, -123.1360]
      ]
  }
]