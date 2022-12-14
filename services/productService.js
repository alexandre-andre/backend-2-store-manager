const ProductsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const [response] = await ProductsModel.getAllProducts();
  // console.log('O QUE SERA TESTADO em  getAllProducts? ', response);
  return response;
};

const getProductById = async (id) => {
  const response = await ProductsModel.getProductById(id);
  if (!response) return null;
  // console.log('O QUE SERA TESTADO em getProductById ? ', response);
  return response;
};

const getProductByName = async (name) => {
  const response = await ProductsModel.getProductByName(name);
  if (!response) return null;
  // console.log('O QUE SERA TESTADO em getProductByName ? ', response);
  return response;
};

const postProductdByName = async (name, quantity) => {
  const response = await ProductsModel.postProductdByName(name, quantity);
  // console.log('O QUE SERA TESTADO em postProductdByName ? ', response);
  return response;
};

const putProduct = async (id, name, quantity) => {
  await ProductsModel.putProduct(id, name, quantity);
  // console.log('O QUE SERA TESTADO em putProduct ? ', { id: Number(id), name, quantity });
  return { id: Number(id), name, quantity };
};

const deleteProductById = async (id) => {
  const removed = await ProductsModel.deleteProductById(id);
  // console.log('O QUE SERA TESTADO em delete ? ', removed);
  return removed;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  postProductdByName,
  putProduct,
  deleteProductById,
};
