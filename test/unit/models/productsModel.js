const sinon = require('sinon');
const chai = require('chai');
const { expect, should } = chai;
// const chaiHttp = require('chai-http');

const ProductsModel = require('../../../models/productsModel');
const { connection } = require('../../../models/connection')
const { mockProducts } = require('../../mock');
const req = require('express/lib/request');

// const url = 'http://localhost:3000';

// chai.use(chaiHttp)
const name = 'smeagol';
const quantity = 50;

describe('MODELS PROUCTS', () => {
  describe('verifica getAllProducts', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(mockProducts);
      console.log(mockProducts);
    });
    
    afterEach(() => {
      connection.execute.restore();
    });
    
    it('Testa getAllProducts', async () => {
      const products = await ProductsModel.getAllProducts();
      
      expect(products).to.be.an('array');
      expect(products).to.length(3);
    });
  });

  describe('verifica getProductById', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([mockProducts]);
      console.log([mockProducts]);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });

    it('Testa getProductById', async () => {
      const products = await ProductsModel.getProductById(1);
      
      expect(products).to.be.an('object');
      expect(products).to.have.property('id');
      expect(products).to.have.property('name');
      expect(products).to.have.property('quantity');
    });

    it('Testa getProductByName', async () => {
      const martelo = await ProductsModel.getProductByName('Martelo');

      expect(martelo).to.be.an('object');
      expect(martelo).to.deep.equal(mockProducts[0]);
    });
  });

  // it('Testa postProductdByName', async () => {
  //   const smeagol = await ProductsModel.postProductdByName(name, quantity);

  //   console.log('>>>>>>', smeagol);
  //   expect(smeagol).to.be.an('object');
  //   expect(smeagol).to.deep.equal({ id: 4, name, quantity });
  // });

  // it('Testa putProduct', async () => {
  //   const [put] = await ProductsModel.putProduct(1, 'smeagol', quantity);
  //   console.log('PUT: ', put);
  //   expect(biscoito).to.deep.equal({ id: 1, name, quantity });
  // });

  // it('Testa deleteProductById', async () => {
  //   const produto = await ProductsModel.deleteProductById(1);

  //   expect(produto).to.be.null;
  // });
});
