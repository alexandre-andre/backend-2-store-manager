const sinon = require('sinon');
const chai = require('chai');
const { expect, should } = chai;
const chaiHttp = require('chai-http');

const ProductsModel = require('../../../models/productsModel');
const { connection } = require('../../../models/connection')
const { mockProducts } = require('../../mock');

// const url = 'http://localhost:3000';

// chai.use(chaiHttp)

describe('My tests on MODELS', () => {
  
  describe('testing GET /products', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Get all products in array', async () => {
      const products = await ProductsModel.getAllProducts();

      expect(products).to.be.an('array');
      expect(products).to.length(3);
    });

    it('Get one product by id and verify yours keys', async () => {
      const products = await ProductsModel.getProductById(1);

      expect(products).to.be.an('object');
      expect(products).to.have.property('id');
      expect(products).to.have.property('name');
      expect(products).to.have.property('quantity');
    });

    // it('Return an empty array when a product id not exists', async () => {
    //   const products = await ProductsModel.getProductById(999);
    //   // expect(products).to.have.length(0);
    //   expect(products).to.be.equal({});
    // });

  });
});
