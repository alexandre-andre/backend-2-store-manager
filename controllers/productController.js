const route = require('express').Router();
const rescue = require('express-rescue');
const ProductService = require('../services/productService');
const { validateProducts } = require('../middlewares/productsMiddleware');
const { STATUS } = require('../utils');
const { OK, NOT_FOUND, CREATED } = STATUS;

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

route.post('/', async(req, res) => { 
  const { name, quantity } = req.body;
  const newProduct = await ProductService.postProductdByName(name, quantity);
  if (!newProduct) return res.status(409).json({ message: 'Product already exists' });
  res.status(CREATED).json(newProduct);
});

route.put('/:id', async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const productById = await ProductService.getProductById(id);
  
  if (!productById) return res.status(NOT_FOUND).json({ message: 'Product not found'});
  
  const productEdited = await ProductService.putProduct(id, name, quantity)
  res.status(OK).json(productEdited)
});

module.exports = route;