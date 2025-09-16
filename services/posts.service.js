function getAllPosts() {
  const db = readDB();
  return db.posts;
}

function getPostById(id) {
  const db = readDB();
  return db.posts.find(p => p.id === id);
}

function updatePost(id, data) {
  const db = readDB();
  const index = db.posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  db.posts[index] = { ...db.posts[index], ...data };
  writeDB(db);
  return db.posts[index];
}

function deletePost(id) {
  const db = readDB();
  const filtered = db.posts.filter(p => p.id !== id);
  if (filtered.length === db.posts.length) return false;
  db.posts = filtered;
  writeDB(db);
  return true;
}
const { readDB, writeDB } = require('../db/db');

function createPost(data) {
    const db = readDB();

  // Validar campos obligatorios
  if (!data.title || !data.content || !data.userId) {
    const error = new Error('Faltan campos obligatorios');
    error.status = 400;
    throw error;
  }
  // Validar título vacío
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    const error = new Error('Faltan campos obligatorios');
    error.status = 400;
    throw error;
  }
  // validar usuario
  const userExists = db.users.find(u => u.id === data.userId);
  if (!userExists) {
    const error = new Error('El usuario no existe');
    error.status = 500;
    throw error;
  }

  const newPost = {
    id: db.posts.length > 0 ? Math.max(...db.posts.map(p => p.id)) + 1 : 1,
    title: data.title,
    content: data.content,
    userId: data.userId
  };

  db.posts.push(newPost);
  writeDB(db);
  return newPost;
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};

