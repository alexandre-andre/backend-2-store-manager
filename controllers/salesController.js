const route = require('express').Router();
// const rescue = require('express-rescue');
const SalesService = require('../services/salesService');
const { STATUS, MSG_SALE } = require('../utils');
const { OK, NOT_FOUND } = STATUS;

route.get('/', async(_req, res) => {
  const allsales = await SalesService.getAllsales();
  res.status(OK).json(allsales);
});

route.get('/:id', async(req, res) => {
  const { id } = req.params;
  const findsale = await SalesService.getSaleById(id);
  if (!findsale.length) return res.status(NOT_FOUND).json({ message: MSG_SALE.NOT_FOUND });
  res.status(OK).json(findsale);
});

module.exports = route;