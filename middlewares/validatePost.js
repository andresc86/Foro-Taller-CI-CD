function validatePost(req, res, next) {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }
  next();
}

module.exports = validatePost;
