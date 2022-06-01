const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
// const chaiHttp = require('chai-http');

const SalesModel = require('../../../models/salesModel');
// const { connection } = require('../../../models/connection')
const { mockSales, mockSalesProductsSerialized } = require('../../mock');

// const url = 'http://localhost:3000';

// chai.use(chaiHttp)

describe('My tests on MODELS', () => {
  
  describe('testing GET /sales', () => {
    // beforeEach(() => {
    //   sinon.stub(connection, 'execute').resolves([mockSalesProductsSerialized]);
    // });

    // afterEach(() => {
    //   connection.execute.restore();
    // });

    it('Get all sales in array', async () => {
      const sales = await SalesModel.getAllSales();

      expect(sales).to.be.an('array');
      expect(sales).to.have.length(3);
      expect(sales[0]).to.have.property('saleId');
      expect(sales[0]).to.have.property('date');
      expect(sales[0]).to.have.property('productId');
      expect(sales[0]).to.have.property('quantity');
    });

    it('Get one sale by id and verify yours keys', async () => {
      const sales = await SalesModel.getSalesById(1);

      expect(sales[0]).to.have.property('date');
      expect(sales[0]).to.have.property('productId');
      expect(sales[0]).to.have.property('quantity');
    });

    it('Return an empty array when sale id not exists', async () => {
      const sales = await SalesModel.getSalesById(999);

      expect(sales).to.have.length(0);
    });

  });
});
