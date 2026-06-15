const { products } = require('./store');

function findById(id) {
  return products.find((product) => product.id === id);
}

function findAll() {
  return products;
}

function updateStock(id, quantity) {
  const product = findById(id);
  if (!product) return null;

  product.stock -= quantity;
  return product;
}

module.exports = {
  findById,
  findAll,
  updateStock,
};
