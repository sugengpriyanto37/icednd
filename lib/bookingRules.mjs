export const PRICE_BANDS = [
  { id: 'any', label: () => 'Any price', test: () => true },
  { id: 'under700', label: (fmt) => `Under ${fmt(700)}`, test: (price) => price < 700 },
  { id: '700-1000', label: (fmt) => `${fmt(700)} – ${fmt(1000)}`, test: (price) => price >= 700 && price <= 1000 },
  { id: 'over1000', label: (fmt) => `Over ${fmt(1000)}`, test: (price) => price > 1000 },
];

export const hotelBookingTotal = (roomPrice, nights, activities, guests) =>
  roomPrice * nights + activities.reduce((sum, activity) => sum + activity.price * guests, 0);

export const packageBookingTotal = (pricePerPerson, guests) => pricePerPerson * guests;
