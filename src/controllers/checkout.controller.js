const checkoutService = require('../services/checkout.service');

function checkout(req, res, next) {
  try {
    const order = checkoutService.checkout(req.user.id, req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkout,
};
