import jwt from 'jsonwebtoken';

export function checkToken (req, res, next) {
  // Check for the token being sent in a header or as a query param
  console.log('Checking token...', req.get('Authorization'));
  let token = req.get('Authorization') || req.query.token;
  // Default to null
  req.user = null;
  if (!token) return next();
  // Remove the 'Bearer ' that was included in the token header
  token = token.replace('Bearer ', '');
  // Check if token is valid and not expired
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    // Invalid token if err
    if (err) {
      console.log('Invalid token:', err);
      return next();
    }
    // decoded is the entire token payload
    req.user = decoded.user;
    return next();
  });
};