const sinon = require('sinon');
const { expect } = require('chai');
const SalesController = require('../../../controllers/salesController');
const SalesService = require('../../../services/salesService');
const { mockAllSales, mockSalesProducts } = require('../../mock');
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

    afterEach(() => {
      serialize.serializeAllSales.restore();
      SalesService.getAllsales.restore()
    });

    it('se retorna todas o status 200', async () => {
      await SalesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });
    
    it('se retorna todas as vendas', async () => {
      await SalesController.getAllSales(request, response);
      
      expect(response.json.calledWith(mockAllSales)).to.be.true;
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

  describe('Verifica getSaleById quando ok' , () => {
    beforeEach(() => {
      request.params = 2;

      sinon.stub(SalesService, 'getSaleById').returns([mockAllSales[2]]);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns([mockAllSales[2]]);
    });

    afterEach(() => SalesService.getSaleById.restore());

    it('se retorna status 200 quando existe a venda', async () => {
      await SalesController.getSaleById(request, response);
      
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('se retorna um array de vendas', async () => {
      await SalesController.getSaleById(request, response);

      expect(response.json.calledWith([mockAllSales[2]])).to.be.equal(true);
    });
  });

  // describe('Verifica postSale', () => {
  //   const obj = { product_id: 3, quantity: 15 };
  //   before(() => {
  //     request.body = obj;

  //     sinon.stub(SalesService, 'registerSale').returns(5);
  //     sinon.stub(SalesService, 'postSale').returns([obj]);

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns({ id: 5, itemsSold: [obj] });
  //   });

  //   after(() => {
  //     SalesService.registerSale.restore();
  //     SalesService.postSale.restore();
  //   });

  //   it('se ...', async () => {
  //     await SalesController.postSale(request, response);

  //     expect(response.status.calledWith(201)).to.be.equal(true);
  //   });
  // });

  // describe.only('Verifica putSale', () => {
  //   beforeEach(() => {
  //     request.params = 1;
      
  //     sinon.stub(SalesService, 'putSale').returns(mockSalesProducts)

  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns({ saleId: 1, itemUpdated: mockSalesProducts });
  //   });

  //   afterEach(() => {
  //     SalesService.putSale.restore();
  //   });

  //   it('se pa', async () => {
  //     await SalesController.putSale(request, response);

  //     expect(response.status.calledWith(200)).to.be.equal(true);
  //   });
  // });

  describe('Verifica deleteSale quando NAO ok' , () => {
    beforeEach(() => {
      request.params = 99;

      sinon.stub(SalesService, 'getSaleById').returns(false);

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns({ message: 'Sale not found' });
    });

    afterEach(() => {
      SalesService.getSaleById.restore();
    });

    it('se retorna o status 404', async () => {
      await SalesController.deleteSale(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('se retorna a mensagem "Sale not found"', async () => {
      await SalesController.deleteSale(request, response);

      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });

  describe('Verifica deleteSale quando ok' , () => {
    before(() => {
      request.params = 2;

      sinon.stub(SalesService, 'getSaleById').returns([mockAllSales[2]]);
      sinon.stub(SalesService, 'deleteSaleFromSales').returns(2);

      response.status = sinon.stub().returns(response);
      response.end = sinon.stub().returns();
    });

    after(() => {
      SalesService.getSaleById.restore();
      SalesService.deleteSaleFromSales.restore();
    });

    it('se retorna o status 204', async () => {
      await SalesController.deleteSale(request, response);

      expect(response.status.calledWith(204)).to.be.equal(true);
    });
  });
});
