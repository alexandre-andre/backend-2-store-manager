const sinon = require('sinon');
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const { expect } = require('chai');

const ProductsModel = require('../../../models/productsModel');
const { connection } = require('../models/connection')
const { mockProducts } = require('../../mock');

chai.use(chaiHttp);

describe('Meus testes na camada de MODELS', () => {
  
  describe('parte I', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(mockProducts);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Get all products in array', async () => {
      const products = await ProductsModel.getAllProducts();

      expect(products).to.be.a('array').not.empty;
    });

    it('Get one product by id and verify yours keys', async () => {
      const products = await ProductsModel.getProductById(1)

      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('name');
      expect(products[0]).toHaveProperty('quantity');
    });

    it('Verify if exists producs by id', async () => {
      chai.request('http://localhost:3000')
        .get('/products/999')
        .end((_err, res) => {
            res.should.have.status(404);
            res.body.to.be.equal('Product not found');
          done();
        });
    });

  });

});
