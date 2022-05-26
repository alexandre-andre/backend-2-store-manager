const route = require('express').Router();
// const rescue = require('express-rescue');
const ProductService = require('../services/productService');
const { STATUS } = require('../utils');
const { OK, NOT_FOUND } = STATUS;

route.get('/', async(_req, res) => {
  const allProducts = await ProductService.getAllProducts();
  res.status(OK).json(allProducts)
});

route.get('/:id', async(req, res) => {
  const { id } = req.params;
  const findProduct = await ProductService.getProductById(id);
  if (!findProduct) return res.status(NOT_FOUND).json({ message: 'Product not found' });
  res.status(OK).json(findProduct);
});

module.exports = route;