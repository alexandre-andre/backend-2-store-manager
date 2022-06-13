const routerProduct = require('express').Router();
const rescue = require('express-rescue');
const ProductService = require('../services/productService');
const { middlewareProductsValidation } = require('../middlewares/productsMiddleware');
const { STATUS, MSG_PRODUCT } = require('../utils');

const getAllProducts = async (_req, res) => {
  const allProducts = await ProductService.getAllProducts();
  return res.status(STATUS.OK).json(allProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const findProduct = await ProductService.getProductById(id);
  if (!findProduct) return res.status(STATUS.NOT_FOUND).json({ message: MSG_PRODUCT.NOT_FOUND });
  res.status(STATUS.OK).json(findProduct);
};

const createProd = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await ProductService.postProductdByName(name, quantity);
  if (!newProduct) return res.status(STATUS.CONFLICT).json({ message: MSG_PRODUCT.ALREADY_EXISTS });
  res.status(STATUS.CREATED).json(newProduct);
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  
  const productById = await ProductService.getProductById(id);
  
  if (!productById) return res.status(STATUS.NOT_FOUND).json({ message: MSG_PRODUCT.NOT_FOUND });
  
  const productEdited = await ProductService.putProduct(id, name, quantity);
  res.status(STATUS.OK).json(productEdited);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id); // quando false entra no if
  if (!product) return res.status(STATUS.NOT_FOUND).json({ message: MSG_PRODUCT.NOT_FOUND });
  
  await ProductService.deleteProductById(id);
  res.status(STATUS.NO_CONTENT).end();
};

routerProduct.get('/', (req, res) => getAllProducts(req, res));
routerProduct.get('/:id', (req, res) => getById(req, res));
routerProduct.post('/', middlewareProductsValidation, rescue((req, res) => createProd(req, res)));
routerProduct.put('/:id', middlewareProductsValidation, rescue((req, res) => putProduct(req, res)));
routerProduct.delete('/:id', (req, res) => deleteProduct(req, res));

module.exports = {
  routerProduct,
  getAllProducts,
  getById,
  createProd,
  putProduct,
  deleteProduct,
};
