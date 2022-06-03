const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
const serialize = require('../utils');

const getAllsales = async () => {
  const sales = await SalesModel.getAllSales();
  console.log('<< CAMADA SERVICES >> ', sales);
  return sales;
};

const getSaleById = async (id) => {
  const [sales] = await SalesModel.getSaleById(id);

  if (!sales) return null;

  return serialize.serializeById(sales);
};

const registerSale = async () => {
  const [{ insertId }] = await SalesModel.registerSale();

  return insertId;
};

const postSale = async (saleId, productId, quantity) => {
  const product = await ProductsModel.getProductById(productId);
  
  if (quantity > product.quantity) {
    return { status: 422, message: 'Such amount is not permitted to sell' };
  }

  await SalesModel.updateStockDown(productId, quantity);
  
  await SalesModel.postSale(saleId, productId, quantity);

  return { productId, quantity };
};

const putSale = async (saleId, productId, quantity) => {
  const sales = await getSaleById(saleId);
  
  const findSale = sales.find((e) => e.productId === productId);
  
  const quantityToReintegrate = findSale.quantity - quantity;

  await SalesModel.updateStockUp(saleId, quantityToReintegrate);

  await SalesModel.putSale(saleId, productId, quantity);

  return { productId, quantity };
};

const deleteSaleFromSales = async (id) => {
  const sales = await getSaleById(id);

  await sales.map((e) => SalesModel.updateStockUp(e.productId, e.quantity));

  await SalesModel.deleteSaleFromSales(id);

  await SalesModel.deleteSaleFromSalesProducts(id);
  
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
