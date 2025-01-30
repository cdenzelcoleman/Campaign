import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};


export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

const user = new User({
  name,
  email,
  password: hashedPassword,
});

await user.save();

const token = generateToken(user);

res.status(201).json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
} catch (error) {
next(error);
}
};

export const logIn = async (req, res, next) => {
try {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) {
  return res.status(400).json({ message: 'Invalid credentials.' });
}

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ message: 'Invalid credentials.' });
}

const token = generateToken(user);

res.status(200).json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
} catch (error) {
next(error);
}
};

export const getProfile = async (req, res, next) => {
try {
const user = await User.findById(req.user.userId).select('-password');
if (!user) {
  return res.status(404).json({ message: 'User not found.' });
}
res.status(200).json({ user });
} catch (error) {
next(error);
}
};

export const updateProfile = async (req, res, next) => {
try {
const { name, email, password } = req.body;
const user = await User.findById(req.user.userId);

if (!user) {
  return res.status(404).json({ message: 'User not found.' });
}

if (name) user.name = name;
if (email) user.email = email;
if (password) {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
}

await user.save();

res.status(200).json({
  message: 'Profile updated successfully.',
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
} catch (error) {
next(error);
}
};