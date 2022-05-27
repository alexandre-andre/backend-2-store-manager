const SalesModel = require('../models/salesModel');

const getAllsales =  async () => {
  const response = await SalesModel.getAllSales();
  return response;
};

const getSaleById = async (id) => {
  const response = await SalesModel.getSalesById(id);
  return response;
};

const registerSale = async () => {
  const idSale = await SalesModel.registerSale();
  return idSale;
};

const postSale = async (saleId, productId, quantity) => {
  const response = await SalesModel.postSale(saleId, productId, quantity);
  return response;
};

module.exports = {
  getAllsales,
  getSaleById,
  registerSale,
  postSale
};
