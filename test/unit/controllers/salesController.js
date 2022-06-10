const sinon = require('sinon');
const { expect } = require('chai');
const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');
const { mockAllSales, mockSales } = require('../../mock');
const serialize = require('../../../utils');

describe('CONTROLLER SALES', () => {
  const response = {};
  const request = {};

  describe('Verifica getAllSales', async () => {
    beforeEach(() => {
      sinon.stub(serialize, 'serializeAllSales').returns(mockAllSales);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(serialize.serializeAllSales(mockAllSales)); // retorno do controller

      // console.log('>>>>> ', serializeAllSales(mockAllSales), ' <<<<<<');

      sinon.stub(SalesService, 'getAllsales').resolves(mockAllSales) // retorno do service
    });

    afterEach(() => SalesService.getAllsales.restore());

    it('se retorna todas as vendas', async () => {
      await SalesController.getAllSales(request, response);

      expect(response.json.calledWith(mockAllSales)).to.be.true;
      expect(response.status.calledWith(200)).to.be.true;
    });
  });

  describe('Verifica getSaleById quando NAO ok' , () => {
    beforeEach(() => {
      request.params = 99;

      sinon.stub(SalesService, 'getSaleById').returns(false);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ message: 'Sale not found' });
    });

    afterEach(() => SalesService.getSaleById.restore());

    it('se retora status 404 quando nao acha a venda', async () => {
      await SalesController.getSaleById(request, response);
      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('se retora a mensagem "Sale not found"', async () => {
      await SalesController.getSaleById(request, response);
      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });

  // describe('Verifica getSaleById quando ok' , () => {
  //   beforeEach(() => {
  //     request.params = 1;

  //     sinon.stub(SalesService, 'getSaleById').returns(true);

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns(mockAllSales.filter((e) => e.sale_id === 1));
  //   });

  //   afterEach(() => SalesService.getSaleById.restore());

  //   it('se retorna status 200 quando existe a venda', async () => {
  //     let a = await SalesController.getSaleById(request, response);
  //     console.log('>>>>>', a);
  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //   });
  // });
});
