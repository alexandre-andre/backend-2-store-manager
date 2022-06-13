const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../../models/salesModel');
const ProductsModel = require('../../../models/productsModel');
const SalesService = require('../../../services/salesService');
const { mockAllSales, mockProducts, mockSalesProducts } = require('../../mock');
const serialize = require('../../../utils');

const mock = [{ product_id: 3, quantity: 14, date: new Date().toISOString() }];

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
      // console.log('IT >>>>>', allSales);  
      expect(allSales).to.be.an('array');
    });
  });

  describe('Verifica getSaleById quando NAO ok', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'getSaleById').resolves([null])
    });
    
    afterEach(() => {
      SalesModel.getSaleById.restore();
    });

    it('se quando o id da venda nao existe retorna null', async () => {
      const noxExist = await SalesService.getSaleById(1);
      // console.log('>>>>>>', noxExist);
      expect(noxExist).to.be.null;
    });
  });

  describe('Verifica getSaleById quando ok', () => {
    beforeEach(() => {
      sinon.stub(serialize, 'serializeById').returns(mock)

      sinon.stub(SalesModel, 'getSaleById').resolves(serialize.serializeById(mock));
      // console.log('DESCRIBE: ', serialize.serializeById(mock));
    });
    
    afterEach(() => {
      serialize.serializeById.restore();
      SalesModel.getSaleById.restore();
    });
    
    it('se quando existe o id da venda deve ser retornado um array', async () => {
      const sale = await SalesService.getSaleById(2);
      expect(sale).to.be.an('array');
    });
  });

  describe('Verifica registerSale', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'registerSale').resolves([{ insertId: 1 }]);
    });

    afterEach(() => SalesModel.registerSale.restore());

    it('se retorna 1 quando for true', async () => {
      const newRegister = await SalesService.registerSale();
      expect(newRegister).to.be.equal(1);
    });
  });

  describe('Verifica postSale quando NAO ok', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getProductById').resolves(mockProducts[2]);
      // console.log('DESCRIBE: ', mockProducts[2]);
    });

    afterEach(() => ProductsModel.getProductById.restore());

    it('se retorna o status 422', async () => {
      const produto = await SalesService.postSale(1, 1, 99);

      expect(produto.status).to.be.equal(422);
    });

    it('se retorna a mensagem "Such amount is not permitted to sell"', async () => {
      const produto = await SalesService.postSale(1, 1, 99);

      expect(produto).to.own.include({message: 'Such amount is not permitted to sell'});
    });
  });

  describe('Verifica postSale quando ok', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getProductById').resolves(mockProducts[2]);
      sinon.stub(SalesModel, 'updateStockDown').resolves(3, 15);
      sinon.stub(SalesModel, 'postSale').resolves(1, 3, 15);
    });

    afterEach(() => {
      ProductsModel.getProductById.restore();
      SalesModel.updateStockDown.restore();
      SalesModel.postSale.restore();
    });

    it('se nao permite a venda quando q quantidade é maior que o estoque', async () => {
      const sale = await SalesService.postSale(1, 3, 15);
      
      expect(sale).to.deep.equal({ productId: 3, quantity: 15 });
    });
  });

  describe('Verifica putSale quando NAO ok', () => {
    beforeEach(() => {
      sinon.stub(serialize, 'serializeById').returns(mock)
      sinon.stub(SalesModel, 'getSaleById').resolves(serialize.serializeById(mock));
      sinon.stub(SalesModel, 'updateStockUp').resolves(2, 4);
      sinon.stub(SalesModel, 'putSale').resolves(2, 3, 10);
    });

    afterEach(() => {
      serialize.serializeById.restore();
      SalesModel.getSaleById.restore();
      SalesModel.updateStockUp.restore();
      SalesModel.putSale.restore();
    });

    it('aqui', async () => {
      const sale = await SalesService.putSale(2, 3, 10);
      await SalesService.getSaleById(2);
      // console.log('IT >>>>>', sale, sale2);
      expect(sale).to.be.an('object');
    });
  });

  // describe('Verifica deleteSaleFromSales', () => {
  //   beforeEach(() => {
  //     sinon.stub(serialize, 'serializeById').returns(mock)
  //     sinon.stub(SalesModel, 'getSaleById').resolves(serialize.serializeById(mock));
  //     sinon.stub(SalesModel, 'deleteSaleFromSales').resolves(1);
  //     sinon.stub(SalesModel, 'deleteSaleFromSalesProducts').resolves(1);
  //   });

  //   afterEach(() => {
  //     serialize.serializeById.restore();
  //     SalesModel.getSaleById.restore();
  //     SalesModel.deleteSaleFromSales.restore();
  //     SalesModel.deleteSaleFromSalesProducts.restore();
  //   });

  //   it('aqui', async () => {
  //     const sale = await SalesService.deleteSaleFromSales(1);
  //     const sale2 = await SalesService.getSaleById(1);
  //     console.log('IT >>>>>', sale, sale2);
  //     expect(sale).to.be.equal(null);
  //   });
  // });
});
