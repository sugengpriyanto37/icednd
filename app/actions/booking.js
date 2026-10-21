'use server';

import { getActivity, getHotel, getPackage } from '@/data/catalog';
import { hotelBookingTotal, packageBookingTotal } from '@/lib/bookingRules.mjs';
import { createSupabaseAdminClient } from '@/lib/supabase-admin';

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const createReference = () => `ICE-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;

function validateDate(value, label) {
  if (typeof value !== 'string' || !isoDate.test(value)) {
    throw new Error(`${label} is invalid.`);
  }

  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) throw new Error(`${label} is invalid.`);
  return date;
}

function calculateBooking(input) {
  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 6) {
    throw new Error('Guest count is invalid.');
  }

  const checkIn = validateDate(input.checkIn, 'Check-in date');
  const checkOut = validateDate(input.checkOut, 'Check-out date');
  if (checkOut <= checkIn) throw new Error('Check-out must be after check-in.');

  const activityIds = Array.isArray(input.activities) ? input.activities : [];
  const activities = activityIds.map(getActivity);
  if (activities.some((activity) => !activity)) throw new Error('An activity is invalid.');

  if (input.type === 'package') {
    const pkg = getPackage(input.packageId);
    if (!pkg || pkg.hotelId !== input.hotelId) throw new Error('Package selection is invalid.');
    if (input.nights !== pkg.nights) throw new Error('Package duration is invalid.');
    if (JSON.stringify(pkg.includedActivities) !== JSON.stringify(activityIds)) {
      throw new Error('Package activities are invalid.');
    }

    return { total: packageBookingTotal(pkg.pricePerPerson, guests), nights: pkg.nights };
  }

  if (input.type !== 'hotel') throw new Error('Booking type is invalid.');
  const hotel = getHotel(input.hotelId);
  const room = hotel?.rooms.find((candidate) => candidate.id === input.roomId);
  const nights = Number(input.nights);
  if (!hotel || !room || !Number.isInteger(nights) || nights < 1 || nights > 30) {
    throw new Error('Hotel selection is invalid.');
  }

  const expectedCheckOut = new Date(checkIn);
  expectedCheckOut.setUTCDate(expectedCheckOut.getUTCDate() + nights);
  if (expectedCheckOut.getUTCFullYear() !== checkOut.getUTCFullYear()
    || expectedCheckOut.getUTCMonth() !== checkOut.getUTCMonth()
    || expectedCheckOut.getUTCDate() !== checkOut.getUTCDate()) {
    throw new Error('Stay dates are invalid.');
  }

  return { total: hotelBookingTotal(room.price, nights, activities, guests), nights };
}

export async function createBooking(input) {
  const name = typeof input?.name === 'string' ? input.name.trim() : '';
  const customerEmail = typeof input?.email === 'string' ? input.email.trim().toLowerCase() : '';
  if (name.length < 2 || name.length > 120) throw new Error('Please enter a valid name.');
  if (!email.test(customerEmail)) throw new Error('Please enter a valid email address.');
  if (typeof input?.country !== 'string' || !input.country.trim()) throw new Error('Billing country is required.');

  const { total, nights } = calculateBooking(input);
  const reference = createReference();
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('bookings')
    .insert({
      reference,
      customer_name: name,
      customer_email: customerEmail,
      hotel_id: input.hotelId || null,
      room_id: input.roomId || null,
      package_id: input.packageId || null,
      activity_ids: input.activities || [],
      check_in: input.checkIn,
      check_out: input.checkOut,
      guests: Number(input.guests),
      total_price: total,
      currency: input.currency || 'NOK',
      status: 'confirmed',
    })
    .select('id, reference, total_price, currency, status, created_at')
    .single();

  if (error) throw new Error('We could not save your booking. Please try again.');

  return {
    id: data.id,
    reference: data.reference,
    total: data.total_price,
    currency: data.currency,
    status: data.status,
    createdAt: data.created_at,
    nights,
  };
}
