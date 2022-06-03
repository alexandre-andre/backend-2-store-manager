const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModel = require('../../../models/productsModel');
const { connection } = require('../../../models/connection')
const { mockProducts } = require('../../mock');

const id = 1;
const name = 'smeagol';
const quantity = 50;

describe('MODELS PROUCTS', () => {
  describe('verifica getAllProducts', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(mockProducts);
      // console.log(mockProducts);
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
      // console.log([mockProducts]);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });

    it('se retorna um objeto', async () => {
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

  // describe('Verifica deleteProductById', () => {
  //   before(() => {
  //     sinon.stub(connection, 'execute').resolves({id: 1, name, quantity });
  //   });

  //   it('se o item foi editado', async () => {
  //     const produto = await ProductsModel.putProduct(id, name, quantity);
  
  //     expect(produto).to.be.an('object');
  //     expect(produto).to.haveOwnProperty('id');
  //     expect(produto).to.haveOwnProperty('name');
  //     expect(produto).to.haveOwnProperty('quantity');
  //   });
  // });

});
