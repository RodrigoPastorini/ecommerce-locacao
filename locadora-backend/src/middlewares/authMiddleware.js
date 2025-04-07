const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido!' });
  }

  const tokenClean = token.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(tokenClean, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado!' });
  }
};

module.exports = authMiddleware;
