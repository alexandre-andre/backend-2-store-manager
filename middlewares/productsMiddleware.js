const { productsValidation } = require('../validations/productsValidation');

const middlewareProductsValidation = (req, res, next) => {
  const { name, quantity } = req.body || {};
  const { code, message } = productsValidation(res, name, quantity);
  if (message) return res.status(code).json({ message });
  
  next();
};

module.exports = {
  middlewareProductsValidation,
};
