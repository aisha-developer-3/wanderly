export interface Destination {
  id: string;
  name: string;
  country: string;
  rating: number;
  staysCount: string;
  image: string;
  category: string;
  tagline: string;
  highlights: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  destinationId: string;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  image: string;
  gallery: string[];
  amenities: string[];
  description: string;
  category: string;
  badge?: string;
  roomTypes: {
    name: string;
    price: number;
    capacity: string;
    features: string[];
  }[];
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  duration: string;
  nights: string;
  discountBadge: string;
  originalPrice: number;
  discountedPrice: number;
  image: string;
  includedServices: string[];
  departureDates: string[];
  description: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  price: number;
  classType: string;
}

export interface Deal {
  id: string;
  title: string;
  code: string;
  discount: string;
  description: string;
  validUntil: string;
  category: string;
}

// Visual assets from generation
export const IMAGES = {
  hero: '/src/assets/images/hero_tropical_resort_1790260465462.jpg',
  banner: '/src/assets/images/banner_summer_deals_1790260482757.jpg',
  bali: '/src/assets/images/dest_bali_temple_1790260497168.jpg',
  dubai: '/src/assets/images/dest_dubai_skyline_1790260509835.jpg',
  santorini: '/src/assets/images/dest_santorini_suites_1790260524027.jpg',
  paris: '/src/assets/images/dest_paris_eiffel_1790260572356.jpg',
  maldives: '/src/assets/images/dest_maldives_bungalows_1790260586022.jpg',
  istanbul: '/src/assets/images/dest_istanbul_mosque_1790260599162.jpg',
  london: '/src/assets/images/dest_london_bigben_1790260820457.jpg',
  tokyo: '/src/assets/images/dest_bali_temple_1790260497168.jpg',
};

export const CATEGORIES = [
  { id: 'beach', name: 'Beach Holidays', icon: 'Palmtree', count: '450+ Stays' },
  { id: 'adventure', name: 'Adventure', icon: 'Compass', count: '320+ Tours' },
  { id: 'luxury', name: 'Luxury', icon: 'Gem', count: '210+ Villas' },
  { id: 'city', name: 'City Breaks', icon: 'Building2', count: '680+ Hotels' },
  { id: 'family', name: 'Family Trips', icon: 'Users', count: '390+ Resorts' },
  { id: 'honeymoon', name: 'Honeymoon', icon: 'Heart', count: '180+ Escapes' },
  { id: 'cruises', name: 'Cruises', icon: 'Ship', count: '95+ Voyages' },
  { id: 'wildlife', name: 'Wildlife', icon: 'Footprints', count: '140+ Safaris' },
];

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.8,
    staysCount: '1,250+ stays',
    image: IMAGES.dubai,
    category: 'luxury',
    tagline: 'Futuristic luxury, desert safaris & iconic skylines',
    highlights: ['Burj Khalifa', 'Palm Jumeirah', 'Desert Dunes Safari', 'Dubai Marina']
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    rating: 4.7,
    staysCount: '980+ stays',
    image: IMAGES.paris,
    category: 'city',
    tagline: 'Art, haute couture, world-class bakeries & romance',
    highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River Cruise', 'Montmartre']
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    rating: 4.8,
    staysCount: '1,100+ stays',
    image: IMAGES.bali,
    category: 'beach',
    tagline: 'Tropical temples, cascading waterfalls & serene retreats',
    highlights: ['Uluwatu Cliffs', 'Ubud Rice Terraces', 'Seminyak Beach', 'Nusa Penida']
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    rating: 4.9,
    staysCount: '760+ stays',
    image: IMAGES.maldives,
    category: 'honeymoon',
    tagline: 'Private overwater bungalows & crystal sapphire lagoons',
    highlights: ['Overwater Villas', 'Coral Atoll Diving', 'Sunset Dolphin Cruises', 'Bioluminescent Beach']
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    rating: 4.7,
    staysCount: '1,050+ stays',
    image: IMAGES.istanbul,
    category: 'city',
    tagline: 'Where continents converge, Byzantine palaces & spice bazaars',
    highlights: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Bosphorus Sunset']
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    rating: 4.6,
    staysCount: '1,300+ stays',
    image: IMAGES.london,
    category: 'city',
    tagline: 'Royal heritage, West End theatre & iconic riverside charm',
    highlights: ['Big Ben & Westminster', 'Tower Bridge', 'Hyde Park', 'Covent Garden']
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    rating: 4.9,
    staysCount: '640+ stays',
    image: IMAGES.santorini,
    category: 'honeymoon',
    tagline: 'Whitewashed cliffside villas & world-famous caldera sunsets',
    highlights: ['Oia Sunsets', 'Red Beach', 'Wine Tastings', 'Volcanic Boat Tour']
  }
];

export const FEATURED_HOTELS: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Oceanview Resort',
    location: 'Maldives',
    destinationId: 'maldives',
    rating: 4.9,
    reviewCount: 328,
    startingPrice: 249,
    image: IMAGES.hero,
    gallery: [IMAGES.hero, IMAGES.maldives, IMAGES.banner],
    amenities: ['Free WiFi', 'Infinity Pool', 'Beachfront', 'Spa & Wellness', 'Airport Shuttle'],
    description: 'Perched over vibrant coral reefs in the North Malé Atoll, Oceanview Resort delivers luxury overwater villas with glass floor panels, sun decks, private infinity plunge pools, and open-air dining.',
    category: 'beach',
    badge: 'Guest Favorite',
    roomTypes: [
      { name: 'Lagoon Overwater Villa', price: 249, capacity: '2 Guests', features: ['Ocean view', 'Direct sea ladder', 'King Bed', 'Breakfast included'] },
      { name: 'Sunset Ocean Pool Suite', price: 379, capacity: '2-3 Guests', features: ['Private plunge pool', 'Glass floor panel', 'Butler service'] },
      { name: 'Two-Bedroom Royal Pavilion', price: 590, capacity: '4 Guests', features: ['Panoramic ocean terrace', 'Outdoor hot tub', 'Private chef'] }
    ]
  },
  {
    id: 'hotel-2',
    name: 'The Lagoon Retreat',
    location: 'Bali, Indonesia',
    destinationId: 'bali',
    rating: 4.8,
    reviewCount: 276,
    startingPrice: 189,
    image: IMAGES.bali,
    gallery: [IMAGES.bali, IMAGES.hero, IMAGES.santorini],
    amenities: ['Free WiFi', 'Jungle Pool', 'Free Breakfast', 'Yoga Shala', 'Airport Shuttle'],
    description: 'A sanctuary tucked inside the tranquil river valleys of Ubud. Boasting private plunge pool villas, Balinese open-air pavilions, floating morning breakfast, and holistic herbal wellness treatments.',
    category: 'adventure',
    badge: 'Top Rated',
    roomTypes: [
      { name: 'River View Deluxe Villa', price: 189, capacity: '2 Guests', features: ['Valley view', 'Marble tub', 'Breakfast included'] },
      { name: 'Private Pool Jungle Suite', price: 260, capacity: '2 Guests', features: ['Private infinity pool', 'Floating breakfast', 'Canopy bed'] }
    ]
  },
  {
    id: 'hotel-3',
    name: 'City Prime Hotel',
    location: 'Dubai, UAE',
    destinationId: 'dubai',
    rating: 4.8,
    reviewCount: 512,
    startingPrice: 159,
    image: IMAGES.dubai,
    gallery: [IMAGES.dubai, IMAGES.banner, IMAGES.hero],
    amenities: ['Free WiFi', 'Rooftop Pool', 'Fitness Club', 'Valet Parking', 'Cocktail Lounge'],
    description: 'Located in Downtown Dubai with panoramic skyline views of Burj Khalifa. Features state-of-the-art marble suites, Michelin-star dining, rooftop pool deck, and direct walkway access to Dubai Mall.',
    category: 'luxury',
    roomTypes: [
      { name: 'Downtown Skyline Room', price: 159, capacity: '2 Guests', features: ['Burj Khalifa view', 'High floor', 'Espresso bar'] },
      { name: 'Executive Club Suite', price: 235, capacity: '2-3 Guests', features: ['Club lounge access', 'Complimentary afternoon tea', 'Deep soaking tub'] }
    ]
  },
  {
    id: 'hotel-4',
    name: 'Santorini Blue Suites',
    location: 'Santorini, Greece',
    destinationId: 'santorini',
    rating: 4.9,
    reviewCount: 418,
    startingPrice: 159,
    image: IMAGES.santorini,
    gallery: [IMAGES.santorini, IMAGES.maldives, IMAGES.paris],
    amenities: ['Free WiFi', 'Caldera View', 'Heated Jacuzzi', 'Artisan Breakfast', 'Wine Bar'],
    description: 'Carved directly into the volcanic cliffs of Oia. Santorini Blue Suites features traditional Cycladic cave suites with whitewashed curves, private heated caldera-view jacuzzis, and world-class sunset views.',
    category: 'honeymoon',
    badge: 'Romantic Choice',
    roomTypes: [
      { name: 'Cave Suite with Sea View', price: 159, capacity: '2 Guests', features: ['Caldera panoramic deck', 'Hydromassage tub', 'Daily Greek breakfast'] },
      { name: 'Honeymoon Pool Villa', price: 320, capacity: '2 Guests', features: ['Private heated plunge pool', 'Sunset terrace', 'Champagne on arrival'] }
    ]
  },
  {
    id: 'hotel-5',
    name: 'The Palace London',
    location: 'London, UK',
    destinationId: 'london',
    rating: 4.7,
    reviewCount: 818,
    startingPrice: 219,
    image: IMAGES.london,
    gallery: [IMAGES.london, IMAGES.paris, IMAGES.dubai],
    amenities: ['Free WiFi', 'Afternoon Tea', 'Historic Bar', '24/7 Concierge', 'Gym & Spa'],
    description: 'Historic landmark elegance overlooking royal parklands. Refined British craftsmanship, bespoke velvet furnishings, traditional English high tea lounge, and prime walking distance to world-class museums.',
    category: 'city',
    roomTypes: [
      { name: 'Deluxe Heritage King', price: 219, capacity: '2 Guests', features: ['Park view', 'Goose down bedding', 'Marble bathroom'] },
      { name: 'Royal Victoria Suite', price: 410, capacity: '2-4 Guests', features: ['Separate drawing room', 'Fireplace', 'Complimentary champagne'] }
    ]
  },
  {
    id: 'hotel-6',
    name: 'Istanbul Harmony Hotel',
    location: 'Istanbul, Turkey',
    destinationId: 'istanbul',
    rating: 4.7,
    reviewCount: 329,
    startingPrice: 149,
    image: IMAGES.istanbul,
    gallery: [IMAGES.istanbul, IMAGES.santorini, IMAGES.bali],
    amenities: ['Free WiFi', 'Turkish Hammam', 'Bosphorus View', 'Rooftop Terrace', 'Boutique Spa'],
    description: 'Ottoman-inspired waterfront sanctuary overlooking the shimmering Bosphorus Strait. Traditional marble hammam, rooftop breakfast terrace with views of historic minarets, and private yacht charters.',
    category: 'city',
    roomTypes: [
      { name: 'Bosphorus View Room', price: 149, capacity: '2 Guests', features: ['Sea view', 'Turkish tea set', 'Rain shower'] },
      { name: 'Ottoman Grand Suite', price: 245, capacity: '2-3 Guests', features: ['Authentic tilework', 'Private balcony', 'Hammam bath'] }
    ]
  }
];

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-1',
    title: 'Maldives Paradise',
    destination: 'Maldives',
    duration: '5 Days',
    nights: '4 Nights',
    discountBadge: '20% OFF',
    originalPrice: 1699,
    discountedPrice: 1299,
    image: IMAGES.maldives,
    includedServices: ['Overwater Villa', 'Breakfast', 'Airport Transfer', 'Seaplane Ride'],
    departureDates: ['Oct 12, 2026', 'Nov 05, 2026', 'Dec 01, 2026'],
    description: 'The ultimate tropical dream getaway. Fly by scenic twin-otter seaplane to a secluded private island atoll. Unwind in an overwater villa with direct ladder into turquoise coral gardens, daily champagne breakfast, and guided stingray snorkeling.'
  },
  {
    id: 'pkg-2',
    title: 'Bali Adventure',
    destination: 'Bali, Indonesia',
    duration: '7 Days',
    nights: '6 Nights',
    discountBadge: '15% OFF',
    originalPrice: 1059,
    discountedPrice: 899,
    image: IMAGES.bali,
    includedServices: ['Luxury Hotel', 'Daily Breakfast', 'Sightseeing', 'Airport Transfer'],
    departureDates: ['Oct 18, 2026', 'Nov 14, 2026', 'Dec 10, 2026'],
    description: 'Immerse yourself in Balinese culture, lush emerald jungle valleys, and world-class surfing beaches. Includes private chauffeur tours to UNESCO rice terraces, sacred water temples, sunrise volcano trekking, and seaside seafood dinners.'
  },
  {
    id: 'pkg-3',
    title: 'Greek Getaway',
    destination: 'Santorini & Athens, Greece',
    duration: '6 Days',
    nights: '5 Nights',
    discountBadge: '25% OFF',
    originalPrice: 1459,
    discountedPrice: 1099,
    image: IMAGES.santorini,
    includedServices: ['4 Star Hotel', 'Breakfast', 'Island Tour', 'Transfers'],
    departureDates: ['Oct 22, 2026', 'Nov 10, 2026', 'Dec 05, 2026'],
    description: 'Sail the azure waters of the Aegean. Discover the Acropolis of Athens before taking a high-speed catamaran to Santorini for caldera cliffside stays, private volcanic catamaran cruise, and wine tasting at sunset.'
  },
  {
    id: 'pkg-4',
    title: 'Dubai Explorer',
    destination: 'Dubai, UAE',
    duration: '4 Days',
    nights: '3 Nights',
    discountBadge: '20% OFF',
    originalPrice: 879,
    discountedPrice: 699,
    image: IMAGES.dubai,
    includedServices: ['5 Star Hotel', 'Desert Safari', 'City Tour', 'Breakfast'],
    departureDates: ['Oct 15, 2026', 'Nov 01, 2026', 'Nov 25, 2026'],
    description: 'Experience futuristic luxury and golden Arabian sand dunes. Features 5-star downtown hotel accommodations, 4x4 dune bashing safari with Bedouin barbecue camp, Burj Khalifa top observatory passes, and Marina dhow dinner cruise.'
  }
];

export const FLIGHTS_DATA: FlightOption[] = [
  {
    id: 'fl-1',
    airline: 'Emirates',
    flightNumber: 'EK 204',
    from: 'New York (JFK)',
    to: 'Dubai (DXB)',
    departureTime: '11:20 AM',
    arrivalTime: '07:50 AM (+1)',
    duration: '12h 30m',
    stops: 'Non-stop',
    price: 685,
    classType: 'Economy'
  },
  {
    id: 'fl-2',
    airline: 'Singapore Airlines',
    flightNumber: 'SQ 025',
    from: 'Frankfurt (FRA)',
    to: 'Bali (DPS)',
    departureTime: '08:45 AM',
    arrivalTime: '06:15 AM (+1)',
    duration: '15h 30m',
    stops: '1 stop (SIN)',
    price: 740,
    classType: 'Premium Economy'
  },
  {
    id: 'fl-3',
    airline: 'Air France',
    flightNumber: 'AF 083',
    from: 'San Francisco (SFO)',
    to: 'Paris (CDG)',
    departureTime: '03:10 PM',
    arrivalTime: '11:05 AM (+1)',
    duration: '10h 55m',
    stops: 'Non-stop',
    price: 610,
    classType: 'Economy'
  },
  {
    id: 'fl-4',
    airline: 'Qatar Airways',
    flightNumber: 'QR 672',
    from: 'London (LHR)',
    to: 'Maldives (MLE)',
    departureTime: '09:00 PM',
    arrivalTime: '12:30 PM (+1)',
    duration: '10h 30m',
    stops: '1 stop (DOH)',
    price: 820,
    classType: 'Economy'
  },
  {
    id: 'fl-5',
    airline: 'Turkish Airlines',
    flightNumber: 'TK 002',
    from: 'New York (JFK)',
    to: 'Istanbul (IST)',
    departureTime: '06:30 PM',
    arrivalTime: '11:45 AM (+1)',
    duration: '9h 15m',
    stops: 'Non-stop',
    price: 545,
    classType: 'Economy'
  }
];

export const TRUST_HIGHLIGHTS = [
  { id: 'price', title: 'Best Price Guarantee', icon: 'ShieldCheck' },
  { id: 'stays', title: 'Handpicked Stays', icon: 'BedDouble' },
  { id: 'support', title: '24/7 Travel Support', icon: 'Headphones' },
  { id: 'secure', title: 'Secure Booking', icon: 'Lock' },
];

export const WHY_CHOOSE_ITEMS = [
  {
    id: 'why-1',
    title: 'Best Price Guarantee',
    description: 'We ensure you get the best prices for your bookings with price match protection.',
    icon: 'BadgePercent'
  },
  {
    id: 'why-2',
    title: 'Flexible Booking',
    description: 'Free cancellation and flexible date options across majority of stays and packages.',
    icon: 'CalendarSync'
  },
  {
    id: 'why-3',
    title: 'Trusted by Thousands',
    description: 'Join thousands of happy travelers worldwide who rate our verified stays 4.8/5.',
    icon: 'Users'
  },
  {
    id: 'why-4',
    title: '24/7 Customer Support',
    description: "We're here to help you anytime, anywhere with dedicated round-the-clock travel experts.",
    icon: 'Headset'
  }
];

export const DEALS_PROMOS: Deal[] = [
  {
    id: 'deal-1',
    title: 'Summer Dream Vacation',
    code: 'SUMMER30',
    discount: 'Up to 30% OFF',
    description: 'Valid on select tropical stays & packages across Maldives, Bali, and Greece.',
    validUntil: 'Nov 30, 2026',
    category: 'summer'
  },
  {
    id: 'deal-2',
    title: 'Luxury Villa Special',
    code: 'LUXURY150',
    discount: '$150 Instant Voucher',
    description: 'Applicable on private villa and 5-star hotel bookings over $900 total.',
    validUntil: 'Dec 15, 2026',
    category: 'luxury'
  },
  {
    id: 'deal-3',
    title: 'Early Bird Flight Deals',
    code: 'WANDERFLY',
    discount: '15% Off Flights',
    description: 'Save 15% on long-haul flights when booking at least 30 days in advance.',
    validUntil: 'Jan 31, 2027',
    category: 'flights'
  }
];
