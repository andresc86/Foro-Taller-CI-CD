const { readDB, writeDB } = require('../db/db');

function createPost(data) {
    const db = readDB();

    // validar usuario
    const userExists = db.users.find(u => u.id === data.userId);
    if (!userExists) throw new Error('El usuario no existe');

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
function addPost(req, res, next) {
  try {
    const newPost = createPost(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
}

