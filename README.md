# API Posts & Users

Este proyecto es una API construida con **Node.js + Express** que gestiona posts y usuarios.

## Funcionalidades
- CRUD de Posts
- CRUD de Usuarios
- Relación entre Posts y Usuarios (cada post pertenece a un usuario)
- Validaciones básicas
- Persistencia de datos en `db.json`
- Pruebas unitarias y de integración con **Jest + Supertest**
- Pipelines CI/CD con **GitHub Actions**

## Instalación y ejecución
1. Clona el repositorio:
   ```bash
   git clone https://github.com/andresc86/Foro-Taller-CI-CD.git
   cd Foro-Taller-CI-CD
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el servidor en local:
   ```bash
   npm start
   ```
4. Ejecuta las pruebas:
   ```bash
   npm test
   ```

## Endpoints de la API

| Verbo | Ruta                | Descripción                        | Body requerido (ejemplo)                                                                 | Respuesta exitosa (ejemplo) |
|-------|---------------------|------------------------------------|-----------------------------------------------------------------------------------------|-----------------------------|
| GET   | /api/posts          | Lista todos los posts              | -                                                                                       | `[ { id, title, content, userId }, ... ]` |
| GET   | /api/posts/:id      | Obtiene un post por ID             | -                                                                                       | `{ id, title, content, userId }` |
| POST  | /api/posts          | Crea un nuevo post                 | `{ "title": "Ejemplo", "content": "Texto", "userId": 1 }`                        | `{ id, title, content, userId }` |
| PUT   | /api/posts/:id      | Actualiza un post existente        | `{ "title": "Nuevo título", "content": "Nuevo texto" }`                            | `{ id, title, content, userId }` |
| DELETE| /api/posts/:id      | Elimina un post                    | -                                                                                       | `204 No Content`            |
| GET   | /api/users          | Lista todos los usuarios           | -                                                                                       | `[ { id, name, email }, ... ]` |
| GET   | /api/users/:id      | Obtiene un usuario por ID          | -                                                                                       | `{ id, name, email }`        |
| POST  | /api/users          | Crea un nuevo usuario              | `{ "name": "Nombre", "email": "correo@dominio.com", "password": "secreto" }`   | `{ id, name, email }`        |
| PUT   | /api/users/:id      | Actualiza un usuario existente     | `{ "name": "Nuevo nombre", "email": "nuevo@correo.com" }`                         | `{ id, name, email }`        |
| DELETE| /api/users/:id      | Elimina un usuario                 | -                                                                                       | `204 No Content`            |

## 🌐 Ejemplo de uso

**Crear un post:**
```bash
curl -X POST https://foro-taller-ci-cd-1.onrender.com/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Prueba","content":"Contenido","userId":1}'
```

**Respuesta:**
```json
{
  "id": 1,
  "title": "Prueba",
  "content": "Contenido",
  "userId": 1
}
```
