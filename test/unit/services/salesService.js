const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../../models/salesModel');
const SalesService = require('../../../services/salesService');
const { mockAllSales } = require('../../mock');

describe('SERVICES SALES', () => {
  describe('Verifica getAllsales', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getAllSales').resolves(mockAllSales);
      // console.log('DESCRIBE: ', mockAllSales);
    });
    
    afterEach(() => {
      SalesModel.getAllSales.restore();
    });

    it('retorna um array', async () => {
      const allSales = await SalesService.getAllsales();  
      expect(allSales).to.be.an('array');
    });

    it('retorna um aray de tamanho x', async () => {
      const allSales = await SalesService.getAllsales();  
      expect(allSales).to.be.length(3);
    });
  });

  // describe('Verifica getSaleById', () => {
  //   const serializeById = (array) => array.map((e) => ({
  //     date: e.date,
  //     productId: e.product_id,
  //     quantity: e.quantity,
  //   }));

  //   beforeEach(() => {
  //     sinon.stub(SalesModel, 'getSaleById').resolves([serializeById(mockSalesProducts)[2]]);    
  //   });
    
  //   afterEach(() => {
  //     SalesModel.getSaleById.restore();
  //   });

  //   it('retorna venda pelo id', async () => {
  //     const sale = await SalesService.getSaleById(1);
  //     console.log('>>>>>>', sale);
  //     expect(sale).to.be.an('array');
  //   });
  // });

  describe('Verifica registerSale', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'registerSale').resolves([{ insertId: 1 }]);
    });

    it('getAllsales', async () => {
      const allSales = await SalesService.registerSale();
      expect(allSales).to.be.equal(1);
    });
  });

  // describe('Verifica getAllsales', () => {
  //   it('getAllsales', async () => {
  //     const allSales = await SalesService.postSale(payload);
  //     console.log('>>>>>>', allSales);
  //     expect(allSales).to.be.an('array');
  //   });
  // });

  // describe('Verifica getAllsales', () => {
  //   it('getAllsales', async () => {
  //     const allSales = await SalesService.putSale(payload);
  //     console.log('>>>>>>', allSales);
  //     expect(allSales).to.be.an('array');
  //   });
  // });

  // describe('Verifica getAllsales', () => {
  //   it('getAllsales', async () => {
  //     const allSales = await SalesService.registerSale(payload);
  //     console.log('>>>>>>', allSales);
  //     expect(allSales).to.be.an('array');
  //   });
  // });

  // describe('Verifica deleteSaleFromSales', () => {
  //   beforeEach(() => {
  //     sinon.stub(SalesModel, 'deleteSaleFromSales').resolves(null);
  //   });

  //   afterEach(() => {
  //     SalesModel.deleteSaleFromSales.restore();
  //   });

  //   it('se retorna null', async () => {
  //     const allSales = await SalesService.deleteSaleFromSales(null);
  //     console.log('>>>>>>', allSales);
  //     expect(allSales).to.be.null;
  //   });
  // });
});
