const ProductsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const [response] = await ProductsModel.getAllProducts();
  return response;
};

const getProductById = async (id) => {
  const response = await ProductsModel.getProductById(id);
  if (!response) return null;
  return response;
};

const getProductByName = async (name) => {
  const response = await ProductsModel.getProductByName(name);
  if (!response) return null;
  return response;
};

const postProductdByName = async (name, quantity) => {
  const response = await ProductsModel.postProductdByName(name, quantity);
  return response;
};

const putProduct = async (id, name, quantity) => {
  await ProductsModel.putProduct(id, name, quantity);
  return { id: Number(id), name, quantity };
};

const deleteProductById = async (id) => {
  await ProductsModel.deleteProductById(id);
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  postProductdByName,
  putProduct,
  deleteProductById,
};
