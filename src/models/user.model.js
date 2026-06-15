const { users, getNextUserId } = require('./store');

function findByEmail(email) {
  return users.find((user) => user.email === email);
}

function findById(id) {
  return users.find((user) => user.id === id);
}

function create({ email, password, name }) {
  const user = {
    id: getNextUserId(),
    email,
    password,
    name,
  };
  users.push(user);
  return user;
}

function toPublic(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

module.exports = {
  findByEmail,
  findById,
  create,
  toPublic,
};
