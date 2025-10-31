const { isValidEmail } = require('../utils/validators');

test('emails válidos', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('user@domain.co')).toBe(true);
});

test('emails inválidos', () => {
  expect(isValidEmail('test@')).toBe(false);
  expect(isValidEmail('invalid.com')).toBe(false);
});

test('emails con formatos complejos válidos', () => {
  expect(isValidEmail('user.name+tag@sub.domain.com')).toBe(true);
  expect(isValidEmail('user_name@domain.co.uk')).toBe(true);
});

test('emails vacíos o con espacios', () => {
  expect(isValidEmail('')).toBe(false);
  expect(isValidEmail(' ')).toBe(false);
  expect(isValidEmail('user@ domain.com')).toBe(false);
});
