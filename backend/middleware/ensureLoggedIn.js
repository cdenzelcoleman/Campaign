export function ensureLoggedIn(req, res, next) {
  console.log(req.user);
  if (!req.user) {
    return res.status(401).json({ 
      success: false,
      message: 'Unauthorized: Please log in to access this resource.',
    });
  }
  next();
}