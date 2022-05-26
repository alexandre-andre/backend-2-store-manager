const ProductsValidation = require('../validations/productsValidation')

const validateProducts = (req, res, next) => {
  const { name, quantity } = req.body;
  const { code, message} = ProductsValidation.validateProducts(name, quantity);
  if (message) return res.status(code).json({ message })
  next();
};



module.exports = {
  validateProducts,
}