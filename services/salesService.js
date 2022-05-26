const SalesModel = require('../models/salesModel');

const getAllsales =  async () => {
  const response = await SalesModel.getAllSales();
  return response;
};

const getSaleById = async (id) => {
  const response = await SalesModel.getSalesById(id);
  return response;
};

module.exports = {
  getAllsales,
  getSaleById
};
