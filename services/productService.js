const ProductsModel = require('../models/productsModel');

const getAllProducts =  async () => {
  const response = await ProductsModel.getAllProducts();
  return response;
};

const getProductById = async (id) => {
  const response = await ProductsModel.getProductById(id);
  return response;
};

module.exports = {
  getAllProducts,
  getProductById
};
