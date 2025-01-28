import jwt from 'jsonwebtoken';

export function checkToken(req, res, next) {
  let token = req.get('Authorization') || req.query.token;

  if (!token) {
    req.user = null;
    return next();
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.user = null;
      return next();
    }

    req.user = decoded.user;
    return next();
  });
}