const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    addUser,
    editUser,
    removeUser
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.put('/:id', editUser);
router.delete('/:id', removeUser);

module.exports = router;
