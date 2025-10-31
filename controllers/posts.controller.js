const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../services/posts.service');

function getPosts(req, res) {
    const posts = getAllPosts();
    res.json(posts);
}

function getPost(req, res) {
    const id = parseInt(req.params.id);
    const post = getPostById(id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(post);
}

function addPost(req, res) {
    const newPost = createPost(req.body);
    res.status(201).json(newPost);
}

function editPost(req, res) {
    const id = parseInt(req.params.id);
    const updated = updatePost(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(updated);
}

function removePost(req, res) {
    const id = parseInt(req.params.id);
    const deleted = deletePost(id);
    if (!deleted) return res.status(404).json({ message: 'Post no encontrado' });
    res.status(204).send();
}

module.exports = {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost
};


