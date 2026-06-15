const bcrypt = require('bcryptjs');

const users = [
  {
    id: 1,
    email: 'alice@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Alice Johnson',
  },
  {
    id: 2,
    email: 'bob@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Bob Smith',
  },
  {
    id: 3,
    email: 'carol@example.com',
    password: bcrypt.hashSync('password123', 10),
    name: 'Carol Williams',
  },
];

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    stock: 50,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    stock: 30,
  },
  {
    id: 3,
    name: 'USB-C Hub',
    price: 49.99,
    stock: 100,
  },
];

let nextUserId = 4;

module.exports = {
  users,
  products,
  getNextUserId: () => nextUserId++,
};
