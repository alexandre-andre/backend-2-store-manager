const ProductsModel = require('../models/productsModel');

const getAllProducts =  async () => {
  const response = await ProductsModel.getAllProducts();
  return response;
};

const getProductById = async (id) => {
  const response = await ProductsModel.getProductById(id);
  return response;
};

const getProductByName = async (name) => {
  const response = await ProductsModel.getProductByName(name);
  return response;
};

const postProductdByName = async (name, quantity) => {
  const response = await ProductsModel.postProductdByName(name, quantity);
  return response;
}

module.exports = {
  getAllProducts,
  getProductByName,
  getProductByName,
  postProductdByName
};
