const route = require('express').Router();
const rescue = require('express-rescue');
const ProductService = require('../services/productService');
// const { validateProducts } = require('../middlewares/productsMiddleware');
const { STATUS, MSG_PRODUCT } = require('../utils');

route.get('/', rescue(async(_req, res) => {
  const allProducts = await ProductService.getAllProducts();
  res.status(STATUS.OK).json(allProducts)
}));

route.get('/:id', async(req, res) => {
  const { id } = req.params;
  const findProduct = await ProductService.getProductById(id);
  if (!findProduct) return res.status(STATUS.NOT_FOUND).json({ message: MSG_PRODUCT.NOT_FOUND });
  res.status(STATUS.OK).json(findProduct);
});

route.post('/', async(req, res) => { 
  const { name, quantity } = req.body;
  const newProduct = await ProductService.postProductdByName(name, quantity);
  if (!newProduct) return res.status(STATUS.CONFLICT).json({ message: MSG_PRODUCT.ALREADY_EXISTS });
  res.status(STATUS.CREATED).json(newProduct);
});

route.put('/:id', async(req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const productById = await ProductService.getProductById(id);
  
  if (!productById) return res.status(STATUS.NOT_FOUND).json({ message: MSG_PRODUCT.NOT_FOUND});
  
  const productEdited = await ProductService.putProduct(id, name, quantity);
  res.status(STATUS.OK).json(productEdited)
});

route.delete('/:id', async(req, res) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);
  if (!product) res.status(STATUS.NOT_FOUND).json({ message: MSG_PRODUCT.NOT_FOUND});

  await ProductService.deleteProductById(id);
  res.status(STATUS.NO_CONTENT).end();
});

module.exports = route;