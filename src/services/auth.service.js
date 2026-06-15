const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'ecommerce-eurostar-secret';
const JWT_EXPIRES_IN = '1h';

async function register({ email, password, name }) {
  if (!email || !password || !name) {
    const error = new Error('Email, password, and name are required');
    error.statusCode = 400;
    throw error;
  }

  if (userModel.findByEmail(email)) {
    const error = new Error('Email already registered');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userModel.create({ email, password: hashedPassword, name });

  return {
    user: userModel.toPublic(user),
    token: generateToken(user),
  };
}

async function login({ email, password }) {
  if (!email || !password) {
    const error = new Error('Email and password are required');
    error.statusCode = 400;
    throw error;
  }

  const user = userModel.findByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  return {
    user: userModel.toPublic(user),
    token: generateToken(user),
  };
}

function generateToken(user) {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  register,
  login,
  verifyToken,
};
