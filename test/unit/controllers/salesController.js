const sinon = require('sinon');
const { expect } = require('chai');
const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');
// const SalesModel = require('../../../services/salesModel');
const { mockAllSales } = require('../../mock');
const serialize = require('../../../utils');

const serializeAllSales = (array) => array.map((e) => ({
  saleId: e.sale_id,
  date: e.date,
  productId: e.product_id,
  quantity: e.quantity,
}));

describe('CONTROLLER SALES', () => {
  const response = {};
  const request = {};

  describe('GET /', async () => {
    before(() => {
      sinon.stub(serialize, 'serializeAllSales').returns(mockAllSales);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(serializeAllSales(mockAllSales)); // retorno do controller

      // console.log('>>>>> ', serializeAllSales(mockAllSales), ' <<<<<<');

      sinon.stub(SalesService, 'getAllsales').resolves(mockAllSales) // retorno do service
    });

    it('verifica se retorna todas as vendas', async () => {
      await SalesController.getAllSales(request, response);

      expect(response.json.calledWith(mockAllSales)).to.be.true;
      expect(response.status.calledWith(200)).to.be.true;
    });
  });
});
