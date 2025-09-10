const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../services/users.service');

function getUsers(req, res) {
    const users = getAllUsers();
    res.json(users);
}

function getUser(req, res) {
    const id = parseInt(req.params.id);
    const user = getUserById(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
}

function addUser(req, res) {
    const result = createUser(req.body);

    if (result.error) {
        return res.status(result.code).json({ message: result.error });
    }

    return res.status(201).json(result.user);
}

function editUser(req, res) {
    const id = parseInt(req.params.id);
    const updated = updateUser(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(updated);
}

function removeUser(req, res) {
    const id = parseInt(req.params.id);
    const deleted = deleteUser(id);
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(204).send();
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    removeUser
};

