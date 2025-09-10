const { readDB, writeDB } = require('../db/db');

function createPost(data) {
    const db = readDB();

    // Validar campos obligatorios
    if (!data.title || !data.content) {
        return { error: 'El título y el contenido son obligatorios', code: 400 };
    }

    // Validar usuario
    const userExists = db.users.find(u => u.id === data.userId);
    if (!userExists) {
        return { error: 'Usuario no encontrado', code: 404 };
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
    createPost
    // aquí también irían getAllPosts, getPostById, updatePost, deletePost
};


