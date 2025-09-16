const { createUser, getAllUsers } = require('../services/users.service');
const { readDB, writeDB } = require('../db/db');

// Mockear db
jest.mock('../db/db');

describe('User Service', () => {
  beforeEach(() => {
    readDB.mockReturnValue({ users: [] });
    writeDB.mockClear();
  });

  test('debería crear un usuario con ID incremental', () => {
    readDB.mockReturnValueOnce({ users: [{ id: 1, name: 'Alice', email: 'a@a.com', password: '123' }] });
    
    const user = createUser({ name: 'Bob', email: 'b@b.com', password: '456' });
    
    expect(user.id).toBe(2);
    expect(writeDB).toHaveBeenCalled();
  });

  test('debería devolver todos los usuarios', () => {
    readDB.mockReturnValueOnce({ users: [{ id: 1, name: 'Alice', email: 'a@a.com', password: '123' }] });

    const users = getAllUsers();

    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Alice');
  });

  test('debería crear usuario con ID 1 si la base está vacía', () => {
    readDB.mockReturnValueOnce({ users: [] });
    const user = createUser({ name: 'Carlos', email: 'c@c.com', password: '789' });
    expect(user.id).toBe(1);
    expect(user.name).toBe('Carlos');
    expect(writeDB).toHaveBeenCalled();
  });
});
