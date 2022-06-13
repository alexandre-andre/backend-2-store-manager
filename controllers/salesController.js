const routerSales = require('express').Router();
const { map } = require('modern-async');
const rescue = require('express-rescue');
const { middlewareSalesValidation } = require('../middlewares/salesMiddleware');
const SalesService = require('../services/salesService');
const { STATUS, MSG_SALE } = require('../utils');
const serialize = require('../utils');

const { OK, CREATED, NO_CONTENT, NOT_FOUND } = STATUS;

const getAllSales = async (_req, res) => {
  const [allsales] = await SalesService.getAllsales();
  // console.log('<< CONTROLLER >> ', allsales);
  return res.status(OK).json(serialize.serializeAllSales(allsales));
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const findsale = await SalesService.getSaleById(id);

  if (!findsale.length) return res.status(NOT_FOUND).json({ message: MSG_SALE.NOT_FOUND });
  
  res.status(OK).json(findsale);
};

const postSale = async (req, res) => {
  const idSale = await SalesService.registerSale();
  console.log('1', idSale);
  const mapSales = await map(
    req.body, async (e) => SalesService.postSale(idSale, e.productId, e.quantity),
  );
  console.log('2');
  if (mapSales.find((e) => e.status)) {
    console.log('entrou no if');
    const [{ status, message }] = mapSales;
    return res.status(status).json({ message });
  }
  console.log('3');
  const postsSales = { id: idSale, itemsSold: mapSales };
  console.log('4');
  res.status(CREATED).json(postsSales);
};

const putSale = async (req, res) => {
  const { id } = req.params;
  // const saleId = Number(id);
  console.log('saleId: ');
  const mapPutsSales = await Promise.all(
    req.body.map((e) => SalesService.putSale(+id, e.productId, e.quantity)),
  );
  console.log('mapPutsSales: ', mapPutsSales);
  
  const putsSales = { saleId: +id, itemUpdated: mapPutsSales };
  console.log('>> ', putsSales, ' <<');
  res.status(OK).json(putsSales);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const saleId = await SalesService.getSaleById(id);
  // console.log('1 - ', saleId);
  if (!saleId.length) return res.status(NOT_FOUND).json({ message: MSG_SALE.NOT_FOUND });
  // console.log('2 - ', saleId);
  await SalesService.deleteSaleFromSales(id);
  // console.log('3');
  res.status(NO_CONTENT).end();
};

routerSales.get('/', (req, res) => getAllSales(req, res));
routerSales.get('/:id', (req, res) => getSaleById(req, res));
routerSales.post('/', middlewareSalesValidation, rescue((req, res) => postSale(req, res)));
routerSales.put('/:id', middlewareSalesValidation, rescue((req, res) => putSale(req, res)));
routerSales.delete('/:id', (req, res) => deleteSale(req, res));

module.exports = {
  routerSales,
  getAllSales,
  getSaleById,
  postSale,
  putSale,
  deleteSale,
};
