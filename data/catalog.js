const IMG = (hash) =>
  `https://media.base44.com/images/public/6ad72fd60918d0b8e738e4c3/${hash}_generated_image.png`;

export const IMG_HERO = IMG('d2255e756');
export const IMG_POLAR_NIGHT = IMG('cd118debf');
export const IMG_AURORA_HUNT = IMG('0f5343002');

export const kr = (n) => 'kr ' + Math.round(n).toLocaleString('en-US');

export const addNights = (iso, n) => {
  const d = new Date(iso + 'T12:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const prettyDate = (iso) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const regions = ['Tromsø', 'Lofoten', 'Svalbard', 'Alta', 'Narvik'];

export const hotels = [
  {
    id: 'igloo-aurora-retreat',
    name: 'Igloo Aurora Retreat',
    region: 'Tromsø',
    location: 'Kvaløya Island · 40 min from Tromsø',
    tagline: 'Sleep beneath the lights in glass-roofed suites on a protected dark-sky island.',
    image: IMG('574c3fe79'),
    lume: 5,
    rating: 4.9,
    priceFrom: 890,
    description:
      'A quiet enclave of glass igloos and timber cabins on Kvaløya, far from the city glow. Every bed faces the northern sky, and the house meteorologist knocks softly when the lights begin.',
    features: ['Glass-roof suites', 'Aurora wake-up alarm', 'Dark-sky zone', 'Wood-fired sauna', 'Airport transfer'],
    auroraNotes:
      'Zero light pollution, 270° exposure to the northern sky and a dedicated in-house aurora forecast service with private viewing decks.',
    rooms: [
      { id: 'glass-suite', name: 'Aurora Glass Suite', price: 890, capacity: 2, view: 'Panoramic northern sky' },
      { id: 'panorama-cabin', name: 'Panorama Timber Cabin', price: 1190, capacity: 3, view: 'Frozen lake & valley' },
      { id: 'sky-igloo', name: 'Sky Igloo Deluxe', price: 1450, capacity: 2, view: '360° glass dome' },
    ],
  },
  {
    id: 'reine-rorbu-manor',
    name: 'Reine Rorbu Manor',
    region: 'Lofoten',
    location: 'Reine · Lofoten Islands',
    tagline: 'Restored fisherman’s cabins on the water’s edge, beneath jagged peaks and dancing skies.',
    image: IMG('0a9ea9e43'),
    lume: 4,
    rating: 4.8,
    priceFrom: 720,
    description:
      'Historic rorbu cabins rebuilt to manor standard, standing on stilts over Reinefjorden. Heated floors, deep linen and a chef’s table that serves the day’s catch beside floor-to-ceiling fjord glass.',
    features: ['Fjord view', 'Private sauna', 'Chef’s table', 'Dark-sky zone', 'Airport transfer'],
    auroraNotes:
      'South-facing fjord terrace reflects the aurora in still water; mountains shield ambient light from the neighbouring villages.',
    rooms: [
      { id: 'waterline-suite', name: 'Rorbu Waterline Suite', price: 720, capacity: 2, view: 'Over the fjord' },
      { id: 'loft-fire-suite', name: 'Loft & Fire Suite', price: 980, capacity: 3, view: 'Mountain peaks' },
      { id: 'manor-residence', name: 'Manor Residence', price: 1380, capacity: 4, view: 'Full fjord panorama' },
    ],
  },
  {
    id: 'svalbard-polar-house',
    name: 'Svalbard Polar House',
    region: 'Svalbard',
    location: 'Longyearbyen · 78° North',
    tagline: 'The world’s northernmost luxury address — weeks of polar night, expedition-grade comfort.',
    image: IMG('d90a52bc0'),
    lume: 5,
    rating: 4.9,
    priceFrom: 940,
    description:
      'A dark-timber house of few rooms at the edge of Longyearbyen, where the sun sets in October and the lights take over. Expedition concierge, heated pool and a husky yard next door.',
    features: ['Aurora lounge', 'Heated pool', 'Expedition concierge', 'Private sauna', 'Airport transfer'],
    auroraNotes:
      'Months of continuous darkness from November to February with corona-level displays; rooftop aurora lounge with heated glass.',
    rooms: [
      { id: 'polar-double', name: 'Polar Double', price: 940, capacity: 2, view: 'Advent Valley' },
      { id: 'explorer-suite', name: 'Explorer Suite', price: 1240, capacity: 3, view: 'Glacier horizon' },
      { id: 'north-room', name: 'The North Room', price: 1590, capacity: 2, view: 'Private rooftop terrace' },
    ],
  },
  {
    id: 'alta-fjord-sanctuary',
    name: 'Alta Fjord Sanctuary',
    region: 'Alta',
    location: 'Altafjord · The City of Northern Lights',
    tagline: 'A glass-and-timber sanctuary above a frozen fjord, in Norway’s most stable aurora corridor.',
    image: IMG('321d15ad8'),
    lume: 4,
    rating: 4.7,
    priceFrom: 640,
    description:
      'Alta’s dry inland climate gives it the country’s clearest winter skies. This headland sanctuary pairs floor-to-ceiling fjord glass with a wood-fired lakeside sauna and silence you can hear.',
    features: ['Fjord view', 'Wood-fired sauna', 'Dark-sky zone', 'Aurora lounge', 'Airport transfer'],
    auroraNotes:
      'Alta sits beneath the auroral oval with exceptionally clear inland skies — historically among Norway’s highest sighting rates.',
    rooms: [
      { id: 'fjord-room', name: 'Fjord Room', price: 640, capacity: 2, view: 'Altafjord' },
      { id: 'sanctuary-suite', name: 'Sanctuary Suite', price: 920, capacity: 3, view: 'Headland & water' },
      { id: 'glass-loft', name: 'Glass Loft', price: 1180, capacity: 2, view: 'Sky-wall window' },
    ],
  },
  {
    id: 'narvik-alpine-lodge',
    name: 'Narvik Alpine Light Lodge',
    region: 'Narvik',
    location: 'Narvik · Ofoten Fjords',
    tagline: 'A warm-lit alpine lodge above an icy fjord bend, where skiing meets the lights.',
    image: IMG('29ef6e810'),
    lume: 3,
    rating: 4.6,
    priceFrom: 560,
    description:
      'Ski from the door by day, watch the sky ignite by night. The lodge looks over the Ofoten fjord bend, with a fireside bar, slope-side spa and drivers who chase clear skies on cue.',
    features: ['Fjord view', 'Ski-in access', 'Fireside bar', 'Slope-side spa', 'Airport transfer'],
    auroraNotes:
      'Elevated terrace above the fjord bend with guided “light chasing” drives when low cloud rolls in from the coast.',
    rooms: [
      { id: 'alpine-room', name: 'Alpine Room', price: 560, capacity: 2, view: 'Fjord bend' },
      { id: 'summit-suite', name: 'Summit Suite', price: 840, capacity: 3, view: 'Mountain ridgeline' },
      { id: 'lodge-apartment', name: 'Lodge Apartment', price: 1080, capacity: 4, view: 'Slopes & fjord' },
    ],
  },
];

export const activities = [
  {
    id: 'aurora-hunt',
    name: 'Aurora Hunt by Private Minibus',
    duration: '3.5 hours · evening',
    price: 1950,
    unit: 'per person',
    image: IMG('0f5343002'),
    blurb: 'A meteorologist-led drive to the clearest patch of sky, with thermal suits, tripods and hot cloudberry juice.',
    highlights: ['Live solar-wind tracking', 'Photography guidance', 'Max 8 guests'],
    regions: ['Tromsø', 'Lofoten', 'Svalbard', 'Alta', 'Narvik'],
  },
  {
    id: 'husky',
    name: 'Husky Sledding Through the Birch Forest',
    duration: '4 hours · morning',
    price: 2450,
    unit: 'per person',
    image: IMG('bf58ea5e5'),
    blurb: 'Drive your own team of eight Alaskan huskies across frozen lakes, then warm up in a wilderness lavvu.',
    highlights: ['Drive your own sled', 'Lavvu lunch by fire', 'Meet the kennel'],
    regions: ['Tromsø', 'Svalbard', 'Alta', 'Narvik'],
  },
  {
    id: 'snowmobile',
    name: 'Snowmobile Safari to the Ice Plateau',
    duration: '4 hours · afternoon',
    price: 2890,
    unit: 'per person',
    image: IMG('5ba4266e4'),
    blurb: 'Pair up on a snowmobile and climb from fjord level onto the mountain plateau as the light turns polar blue.',
    highlights: ['Fjord-to-plateau route', 'Expedition suits provided', 'Glacier viewpoint stop'],
    regions: ['Tromsø', 'Svalbard', 'Alta'],
  },
  {
    id: 'whale',
    name: 'Orca & Humpback Whale Safari',
    duration: '5 hours · morning',
    price: 2190,
    unit: 'per person',
    image: IMG('faff7ea30'),
    blurb: 'A heated expedition boat follows the winter herring run into the fjords where orcas and humpbacks feed.',
    highlights: ['Heated cabin & deck', 'Marine biologist aboard', 'November–January season'],
    regions: ['Lofoten', 'Tromsø'],
  },
  {
    id: 'sami',
    name: 'Sami Reindeer Camp & Fireside Joik',
    duration: '3 hours · evening',
    price: 1650,
    unit: 'per person',
    image: IMG('09042e78c'),
    blurb: 'Feed the reindeer, step inside a roaring lavvu and listen to traditional joik around the fire.',
    highlights: ['Reindeer feeding', 'Sami storytelling', 'Traditional supper'],
    regions: ['Tromsø', 'Alta', 'Narvik', 'Lofoten'],
  },
];

export const packages = [
  {
    id: 'aurora-escape',
    name: '4-Night Aurora Escape',
    hotelId: 'igloo-aurora-retreat',
    nights: 4,
    region: 'Tromsø',
    season: 'November – March',
    pricePerPerson: 24500,
    image: IMG_HERO,
    includedActivities: ['aurora-hunt', 'husky'],
    summary:
      'Four nights in a glass-roofed suite, a meteorologist-led aurora hunt and a morning behind your own husky team — the essential northern-lights introduction.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & first lights', text: 'Private transfer from Tromsø, welcome dinner, aurora alarm set.' },
      { day: 'Day 2', title: 'The hunt', text: 'Evening aurora hunt by private minibus with thermal suits and photography guidance.' },
      { day: 'Day 3', title: 'The sled trail', text: 'Morning husky sledding through the birch forest, lavvu lunch, afternoon sauna.' },
      { day: 'Day 4', title: 'Slow arctic day', text: 'Fjord walk, chef’s table dinner, optional aurora lounge nightcap.' },
      { day: 'Day 5', title: 'Departure', text: 'Breakfast beneath the glass roof and transfer back to Tromsø.' },
    ],
  },
  {
    id: 'polar-night-immersion',
    name: 'Polar Night Immersion',
    hotelId: 'svalbard-polar-house',
    nights: 5,
    region: 'Svalbard',
    season: 'November – February',
    pricePerPerson: 31900,
    image: IMG_POLAR_NIGHT,
    includedActivities: ['husky', 'snowmobile'],
    summary:
      'Five nights at 78° north, deep inside the polar night — glacier snowmobiling, a husky kennel visit and weeks of living dark, lit only by the sky.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival at 78°N', text: 'Flight to Longyearbyen, polar briefing, welcome dinner at the house.' },
      { day: 'Day 2', title: 'Kennel morning', text: 'Meet the huskies, sled across Advent Valley, afternoon in the heated pool.' },
      { day: 'Day 3', title: 'Ice plateau', text: 'Full snowmobile safari toward the glacier, returning under the lights.' },
      { day: 'Day 4', title: 'The long dark', text: 'Town, museum and aurora lounge; the sky does the rest.' },
      { day: 'Day 5', title: 'Departure', text: 'Late breakfast and transfer to Longyearbyen airport.' },
    ],
  },
  {
    id: 'lofoten-fjords-whales',
    name: 'Lofoten Fjords & Whales',
    hotelId: 'reine-rorbu-manor',
    nights: 5,
    region: 'Lofoten',
    season: 'November – January',
    pricePerPerson: 27400,
    image: IMG('0a9ea9e43'),
    includedActivities: ['whale', 'sami'],
    summary:
      'Five nights over the water in Reine — a heated expedition boat among orcas, a fireside evening with Sami hosts, and the islands’ mirrored aurora.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Reine', text: 'Settle into your waterline rorbu, welcome dinner at the chef’s table.' },
      { day: 'Day 2', title: 'Into the fjord', text: 'Whale safari from a nearby harbour among feeding orcas and humpbacks.' },
      { day: 'Day 3', title: 'Reindeer evening', text: 'Sami reindeer camp with joik, stories and supper around the fire.' },
      { day: 'Day 4', title: 'Islands & mirrors', text: 'Village walk, sauna, and a night on the fjord terrace for the lights.' },
      { day: 'Day 5', title: 'Departure', text: 'Breakfast over the water and transfer to Leknes or Svolvær.' },
    ],
  },
];

export const getHotel = (id) => hotels.find((h) => h.id === id);
export const getActivity = (id) => activities.find((a) => a.id === id);
export const getPackage = (id) => packages.find((p) => p.id === id);