const productModel = require('../models/product.model');

const VALID_PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.1;

function checkout(userId, { items, paymentMethod }) {
  if (!items || !Array.isArray(items) || items.length === 0) {
    const error = new Error('Items array is required and must not be empty');
    error.statusCode = 400;
    throw error;
  }

  if (!paymentMethod) {
    const error = new Error('Payment method is required');
    error.statusCode = 400;
    throw error;
  }

  if (!VALID_PAYMENT_METHODS.includes(paymentMethod)) {
    const error = new Error('Payment method must be cash or credit_card');
    error.statusCode = 400;
    throw error;
  }

  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = productModel.findById(item.productId);
    if (!product) {
      const error = new Error(`Product with id ${item.productId} not found`);
      error.statusCode = 404;
      throw error;
    }

    if (!item.quantity || item.quantity <= 0) {
      const error = new Error('Each item must have a quantity greater than 0');
      error.statusCode = 400;
      throw error;
    }

    if (product.stock < item.quantity) {
      const error = new Error(`Insufficient stock for product: ${product.name}`);
      error.statusCode = 400;
      throw error;
    }

    const lineTotal = product.price * item.quantity;
    subtotal += lineTotal;

    orderItems.push({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal,
    });

    productModel.updateStock(product.id, item.quantity);
  }

  const discount =
    paymentMethod === 'cash' ? roundCurrency(subtotal * CASH_DISCOUNT_RATE) : 0;
  const total = roundCurrency(subtotal - discount);

  return {
    orderId: Date.now(),
    userId,
    items: orderItems,
    paymentMethod,
    subtotal: roundCurrency(subtotal),
    discount,
    total,
  };
}

function roundCurrency(amount) {
  return Math.round(amount * 100) / 100;
}

module.exports = {
  checkout,
};
