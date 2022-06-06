const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
const serialize = require('../utils');

const getAllsales = async () => {
  const sales = await SalesModel.getAllSales();
  console.log('O QUE SERA TESTADO em  getAllsales? ', sales);
  return sales;
};

const getSaleById = async (id) => {
  const [sales] = await SalesModel.getSaleById(id);
  console.log('O QUE SERA TESTADO em  getSaleById? ', sales);
  if (!sales) return null;

  return serialize.serializeById(sales);
};

const registerSale = async () => {
  const [{ insertId }] = await SalesModel.registerSale();
  console.log('O QUE SERA TESTADO em  registerSale? ', insertId);
  return insertId;
};

const postSale = async (saleId, productId, quantity) => {
  const product = await ProductsModel.getProductById(productId);

  if (quantity > product.quantity) {
    return { status: 422, message: 'Such amount is not permitted to sell' };
  }

  await SalesModel.updateStockDown(productId, quantity);
  
  await SalesModel.postSale(saleId, productId, quantity);
  console.log('O QUE SERA TESTADO em  postSale? ', { productId, quantity });
  return { productId, quantity };
};

const putSale = async (saleId, productId, quantity) => {
  const sales = await getSaleById(saleId);
  console.log('O QUE SERA TESTADO em  putSale? ', sales);
  const findSale = sales.find((e) => e.productId === productId);
  
  const quantityToReintegrate = findSale.quantity - quantity;

  await SalesModel.updateStockUp(saleId, quantityToReintegrate);

  await SalesModel.putSale(saleId, productId, quantity);
  console.log('O QUE SERA TESTADO em  putSale? ', { productId, quantity });
  return { productId, quantity };
};

const deleteSaleFromSales = async (id) => {
  const sales = await getSaleById(id);

  await sales.map((e) => SalesModel.updateStockUp(e.productId, e.quantity));
  // console.log('O QUE SERA TESTADO em  deleteSaleFromSales? ', response);
  await SalesModel.deleteSaleFromSales(id);
  // console.log('O QUE SERA TESTADO em  deleteSaleFromSales? ', response);
  await SalesModel.deleteSaleFromSalesProducts(id);
  console.log('O QUE SERA TESTADO em  deleteSaleFromSales? ', null);
  return null;
};

module.exports = {
  getAllsales,
  getSaleById,
  registerSale,
  postSale,
  putSale,
  deleteSaleFromSales,
};
