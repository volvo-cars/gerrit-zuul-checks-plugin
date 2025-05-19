import {compareDates} from './compareDates';

describe('compareDates', () => {
  test('returns 0 when both dates are undefined', () => {
    expect(compareDates(undefined, undefined, true)).toBe(0);
  });

  test('a is undefined and nullIsInf is true', () => {
    expect(compareDates(undefined, new Date(), true)).toBe(1);
  });

  test('a is undefined and nullIsInf is false', () => {
    expect(compareDates(undefined, new Date(), false)).toBe(-1);
  });

  test('b is undefined and nullIsInf is true', () => {
    expect(compareDates(new Date(), undefined, true)).toBe(-1);
  });

  test('a < b', () => {
    const a = new Date('2020-01-01');
    const b = new Date('2021-01-01');
    expect(compareDates(a, b, false)).toBe(-1);
  });

  test('a > b', () => {
    const a = new Date('2022-01-01');
    const b = new Date('2021-01-01');
    expect(compareDates(a, b, false)).toBe(1);
  });

  test('a === b', () => {
    const a = new Date('2021-01-01');
    const b = new Date('2021-01-01');
    expect(compareDates(a, b, false)).toBe(0);
  });
});
