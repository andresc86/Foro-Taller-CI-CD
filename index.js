const express = require("express");
const cors = require("cors");
const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

// Middleware básico
app.use(express.json());
app.use(cors());

//  Ruta raíz de bienvenida
app.get("/", (req, res) => {
  res.send(" Bienvenido al Foro Taller CI/CD - API funcionando correctamente");
});

// 📦 Rutas principales
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// 🔍 Ruta para verificar el estado del servidor
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    servicio: "Foro Taller CI/CD",
    fecha: new Date(),
  });
});

// ⚠️ Manejo de rutas no existentes (404)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// 🛠️ Manejo de errores generales
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ message: err.message });
});

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;


