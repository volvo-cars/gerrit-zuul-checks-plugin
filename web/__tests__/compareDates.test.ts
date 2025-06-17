/*

 * Copyright (c) 2025 Volvo Car Corporation

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
