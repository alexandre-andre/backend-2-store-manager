const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const SalesModel = require('../../../models/salesModel');
const { connection } = require('../../../models/connection')
const { mockSales, mockAllSales, mockSalesProducts } = require('../../mock');

describe('MODELS SALES', () => {
  describe('Verifica getAllSales e getSalesById', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(mockAllSales)
    });
  
    afterEach(() => {
      connection.execute.restore();
    });
  
    it('se getAllSales retorna um array com todos as vendas', async () => {
      const sales = await SalesModel.getAllSales();

      expect(sales).to.be.an('array');
      expect(sales).to.have.length(3);
      expect(sales[0]).to.have.property('sale_id');
      expect(sales[0]).to.have.property('date');
      expect(sales[0]).to.have.property('product_id');
      expect(sales[0]).to.have.property('quantity');
    });

    it('se getSaleById retorna um array de objetos pelo id', async () => {
      const sales = await SalesModel.getSaleById(2);

      expect(sales[2]).to.be.an('object');
      expect(sales[2]).to.have.property('sale_id');
      expect(sales[2]).to.have.property('date');
      expect(sales[2]).to.have.property('product_id');
    });
  });

  describe('Verifica registerSale', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(mockSales[0]);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('se retorna um objeto', async () => {
      const newSale = await SalesModel.registerSale();

      expect(newSale).to.be.an('object');
      expect(newSale).to.haveOwnProperty('id');
      expect(newSale).to.haveOwnProperty('date');
    });
  });

  describe('registerSale', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(mockSalesProducts[0]);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('Testa postSale', async () => {
      const newSale = await SalesModel.postSale(1, 1, 5);

      expect(newSale).to.be.an('object');
      expect(newSale).to.have.property('product_id');
      expect(newSale).to.have.property('quantity');
      expect(newSale).to.deep.equal({ sale_id: 1, product_id: 1, quantity: 5 });
    });
  });

  describe('Verifica putSale', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(mockAllSales[0]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('se o produto é editado', async () => {
      const put = await SalesModel.putSale(1, 1, 5);

      expect(put).to.be.an('object');
      expect(put).to.have.property('product_id');
      expect(put).to.have.property('quantity');
    });
  });
  
  describe('Verifica deleteSaleFromSales', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(mockSales[1]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('se retorna o objeto que será excluído', async () => {
      const dfs = await SalesModel.deleteSaleFromSales(2);

      expect(dfs).to.be.an('object');
      expect(dfs).to.have.property('id');
      expect(dfs).to.have.property('date');
    });
  });

  describe('Verifica deleteSaleFromSalesProducts', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(mockSalesProducts[2]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('se retorna o objeto que será excluído', async () => {
      const dfsp = await SalesModel.deleteSaleFromSalesProducts(2);

      expect(dfsp).to.be.an('object');
      expect(dfsp).to.have.property('sale_id');
      expect(dfsp).to.have.property('product_id');
      expect(dfsp).to.have.property('quantity');
    });
  });

  describe('Verifica updateStockUp', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves({ id: 99, name: 'smeagol', quantity: 99 });
    });

    after(() => {
      connection.execute.restore();
    });
    
    it('se retorna um produto aletrado', async () => {
      const stockUp = await SalesModel.updateStockUp(99, 99);
      
      expect(stockUp).to.be.an('object');
      expect(stockUp).to.include({ quantity: 99 });
    });
  });
  
  describe('Verifica updateStocDown', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves({ id: 99, name: 'smeagol', quantity: 1 });
    });

    after(() => {
      connection.execute.restore();
    });

    it('se retorna um produto alterado', async () => {
      const stockDown = await SalesModel.updateStockDown(99, 1);
      
      expect(stockDown).to.be.an('object');
      expect(stockDown).to.include({ quantity: 1 });
    });
  });
});
