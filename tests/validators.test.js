const { isValidEmail } = require('../utils/validators');

test('emails válidos', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('user@domain.co')).toBe(true);
});

test('emails inválidos', () => {
  expect(isValidEmail('test@')).toBe(false);
  expect(isValidEmail('invalid.com')).toBe(false);
});
