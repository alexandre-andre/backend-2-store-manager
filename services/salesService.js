const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
// const { middlewareSalesValidation } = require('../middlewares/salesMiddleware');
// const { salesValidation } = require('../validations/salesValidation');

const getAllsales =  async () => {
  const response = await SalesModel.getAllSales();
  return response;
};

const getSaleById = async (id) => {
  const response = await SalesModel.getSalesById(id);
  if (!response) return null;

  return response;
};

const registerSale = async () => {
  const idSale = await SalesModel.registerSale();
  return idSale;
};

const postSale = async (saleId, productId, quantity) => {
  const product = await ProductsModel.getProductById(productId);
  
  if (quantity > product.quantity) {
    return { status: 422, message: 'Such amount is not permitted to sell' };
  };  

  await SalesModel.updateStockAfterSale(productId, quantity);
  
  const response = await SalesModel.postSale(saleId, productId, quantity);

  return response;
};

const putSale = async (saleId, productId, quantity) => {
  const sales = await SalesModel.getSalesById(saleId);
  const e = sales.find(e => e.productId === productId);
  const quantityToReintegrate = e.quantity - quantity; 

  await SalesModel.updateStockAfterSaleReintegration(saleId, quantityToReintegrate);

  const response = await SalesModel.putSale(saleId, productId, quantity);

  return response;
};

const deleteSaleFromSales = async (id) => {
  const sales = await SalesModel.getSalesById(id);

  await sales.map((e) => SalesModel.updateStockAfterSaleReintegration(e.productId, e.quantity));

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
