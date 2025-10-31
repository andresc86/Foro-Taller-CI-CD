const { createPost } = require('../services/posts.service');
const { readDB, writeDB } = require('../db/db');

describe('createPost', () => {
  let originalDB;

  beforeEach(() => {
    // Guardar estado original y resetear DB para pruebas
    originalDB = readDB();
    writeDB({ ...originalDB, posts: [], users: [{ id: 1, name: 'Test User' }] });
  });

  afterEach(() => {
    // Restaurar estado original
    writeDB(originalDB);
  });

  test('crea un post correctamente', () => {
    const post = createPost({ title: 'Título', content: 'Contenido', userId: 1 });
    expect(post).toHaveProperty('id', 1);
    expect(post).toHaveProperty('title', 'Título');
    expect(post).toHaveProperty('content', 'Contenido');
    expect(post).toHaveProperty('userId', 1);
  });

  test('falla si faltan campos obligatorios', () => {
    expect(() => createPost({ title: '', content: 'Contenido', userId: 1 })).toThrow('Faltan campos obligatorios');
    expect(() => createPost({ title: 'Título', content: '', userId: 1 })).toThrow('Faltan campos obligatorios');
    expect(() => createPost({ title: 'Título', content: 'Contenido' })).toThrow('Faltan campos obligatorios');
  });

  test('falla si el usuario no existe', () => {
    expect(() => createPost({ title: 'Título', content: 'Contenido', userId: 999 })).toThrow('El usuario no existe');
  });

  test('crea IDs incrementales', () => {
    createPost({ title: 'Post 1', content: 'Contenido 1', userId: 1 });
    const post2 = createPost({ title: 'Post 2', content: 'Contenido 2', userId: 1 });
    expect(post2.id).toBe(2);
  });
});
