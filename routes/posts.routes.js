const express = require('express');
const router = express.Router();
const {
    getPosts,
    getPost,
    addPost,
    editPost,
    removePost
} = require('../controllers/posts.controller');

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.put('/:id', editPost);
router.delete('/:id', removePost);

module.exports = router;

const validatePost = require('../middlewares/validatePost');

router.post('/', validatePost, addPost);
router.put('/:id', validatePost, editPost);

