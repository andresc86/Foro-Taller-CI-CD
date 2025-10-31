const express = require("express");
const cors = require("cors");
const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(" Bienvenido al Foro Taller CI/CD - API funcionando correctamente");
});

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    servicio: "Foro Taller CI/CD",
    fecha: new Date(),
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ message: err.message });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;


