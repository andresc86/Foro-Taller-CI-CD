const express = require('express');
const cors = require('cors');
const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: err.message });
});

