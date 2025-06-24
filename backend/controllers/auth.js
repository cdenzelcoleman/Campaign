import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function logIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Bad Credentials' });
  }
}

export async function signUp(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Duplicate Email' });
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.userId);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'User Not Found' });
  }
}

export async function updateProfile(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) throw new Error();
    
    // Only allow specific fields to be updated
    if (name && typeof name === 'string') user.name = name.trim();
    if (email && typeof email === 'string') user.email = email.trim().toLowerCase();
    if (password && typeof password === 'string' && password.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    
    await user.save();
    
    // Don't return sensitive data
    const { password: _, ...userResponse } = user.toObject();
    res.json(userResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'User Not Found' });
  }
}


function createJWT(user) {
  return jwt.sign(
    {user},
    process.env.JWT_SECRET,
    { expiresIn: '24hr' }
  );
};

