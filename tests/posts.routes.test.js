const request = require('supertest');
const app = require('../index');

describe('Posts API', () => {
  test('GET /api/posts devuelve lista de posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/posts crea un post válido', async () => {
    const newPost = { title: 'Nuevo', content: 'Contenido nuevo', userId: 1 };

    const res = await request(app)
      .post('/api/posts')
      .send(newPost);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Nuevo');
  });

  test('POST /api/posts falla si el userId no existe', async () => {
    const badPost = { title: 'Error', content: 'Contenido', userId: 999 };

    const res = await request(app)
      .post('/api/posts')
      .send(badPost);

    expect(res.statusCode).toBe(500); // porque lanza error en el servicio
  });

  test('POST /api/posts falla si faltan campos', async () => {
    const badPost = { content: 'Falta título', userId: 1 };

    const res = await request(app)
      .post('/api/posts')
      .send(badPost);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Faltan campos obligatorios');
  });

  test('POST /api/posts falla si el título está vacío', async () => {
    const badPost = { title: '', content: 'Sin título', userId: 1 };
    const res = await request(app)
      .post('/api/posts')
      .send(badPost);
    expect(res.statusCode).toBe(400);
  });
});
