import test from 'node:test';
import assert from 'node:assert/strict';
import { PRICE_BANDS, hotelBookingTotal, packageBookingTotal } from '../lib/bookingRules.mjs';

test('price bands classify boundary values correctly', () => {
  const bands = PRICE_BANDS.filter((band) => band.id !== 'any');
  assert.equal(bands.find((band) => band.test(699)).id, 'under700');
  assert.equal(bands.find((band) => band.test(700)).id, '700-1000');
  assert.equal(bands.find((band) => band.test(1000)).id, '700-1000');
  assert.equal(bands.find((band) => band.test(1001)).id, 'over1000');
});

test('hotel totals include room nights and per-guest activities', () => {
  assert.equal(hotelBookingTotal(890, 3, [{ price: 1950 }], 2), 6570);
});

test('package totals scale by guest count', () => {
  assert.equal(packageBookingTotal(24500, 2), 49000);
});
