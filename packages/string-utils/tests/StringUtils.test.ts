import { toUpperCase } from '../src';

test('toUpperCase', () => {
  expect(toUpperCase('hello')).toBe('HELLO');
});
