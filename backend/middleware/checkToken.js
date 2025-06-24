import jwt from 'jsonwebtoken';

export function checkToken (req, res, next) {
  // Only check for the token in Authorization header (more secure)
  console.log('Checking token...');
  let token = req.get('Authorization');
  // Default to null
  req.user = null;
  if (!token) return next();
  
  // Remove the 'Bearer ' that was included in the token header
  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  } else {
    // Invalid format
    return next();
  }
  
  // Check if token is valid and not expired
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    // Invalid token if err - continue without authentication but don't expose error details
    if (err) {
      console.log('Invalid token');
      return next();
    }
    // decoded is the entire token payload
    req.user = decoded.user;
    return next();
  });
};