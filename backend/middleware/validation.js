import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};

export const validateCampaignInput = (req, res, next) => {
  const { title, description, character } = req.body;
  
  // Title validation
  if (title && (typeof title !== 'string' || title.trim().length === 0 || title.length > 100)) {
    return res.status(400).json({ error: 'Title must be a non-empty string with maximum 100 characters' });
  }
  
  // Description validation
  if (description && (typeof description !== 'string' || description.trim().length === 0)) {
    return res.status(400).json({ error: 'Description must be a non-empty string' });
  }
  
  // Character validation
  if (character && !mongoose.Types.ObjectId.isValid(character)) {
    return res.status(400).json({ error: 'Invalid character ID format' });
  }
  
  next();
};

export const validateUserRegistration = (req, res, next) => {
  const { name, email, password } = req.body;
  
  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }
  
  // Password validation
  if (!password || typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters long' });
  }
  
  // Password strength validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' 
    });
  }
  
  next();
};