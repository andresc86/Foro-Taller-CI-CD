const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.json');

const readDB = () => {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
};

const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDB, writeDB };

