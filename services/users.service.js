const { readDB, writeDB } = require('../db/db');

function getAllUsers() {
    const db = readDB();
    return db.users;
}

function getUserById(id) {
    const db = readDB();
    return db.users.find(u => u.id === id);
}

function createUser(data) {
    const db = readDB();

    // Validar campos obligatorios
    if (!data.name || !data.email || !data.password) {
        return { error: "Faltan campos obligatorios: name, email y password", code: 400 };
    }

    // Validar si el email ya existe
    const emailExists = db.users.some(u => u.email === data.email);
    if (emailExists) {
        return { error: "El email ya está en uso", code: 409 };
    }

    // Crear el nuevo usuario
    const newUser = {
        id: db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
        name: data.name,
        email: data.email,
        password: data.password // ⚠️ En producción se debe hashear
    };

    db.users.push(newUser);
    writeDB(db);

    return { user: newUser, code: 201 };
}


function updateUser(id, data) {
    const db = readDB();
    const index = db.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    db.users[index] = { ...db.users[index], ...data };
    writeDB(db);
    return db.users[index];
}

function deleteUser(id) {
    const db = readDB();
    const filtered = db.users.filter(u => u.id !== id);
    if (filtered.length === db.users.length) return false;
    db.users = filtered;
    writeDB(db);
    return true;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
