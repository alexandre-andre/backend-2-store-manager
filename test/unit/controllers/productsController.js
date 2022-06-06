const sinon = require('sinon');
const { expect } = require('chai');
const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const { mockProducts } = require('../../mock');

describe('CONTROLLER PRODUCTS', () => {
  const response = {};
  const request = {};
  
  describe('Verifica getAllProducts', async () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns(mockProducts);
      // console.log('DESCRIBE: ', mockProducts);
      sinon.stub(ProductService, 'getAllProducts').resolves(mockProducts) // retorna esperado
    });

    it('se retorna todos os produtos', async () => {
      const product = await ProductController.getAllProducts(request, response); // recebe res como argumento
      
      expect(product).to.be.an('array').not.empty;
    });
  });

  // describe('Verifica getById', async () => {
  //   before(() => {
  //     request.body = {};
  
  //     response.status = sinon.stub().returns(response);
  //     response.send = sinon.stub().returns('Product not found!');
  //     console.log('DESCRIBE: ',response.send());
  //     sinon.stub(ProductService, 'getProductById').resolves(null); // retorna esperado
  //   });

  //   it('se retorna um produto', async() => {
  //     const product = await ProductController.getById(request, response); // recebe res como argumento
  //     console.log('>>>>>', product);
  //     expect(product).to.be.an('object');
  //   });
  // });

  // describe('GET /:id - OK', async () => {
  //   before(() => {
  //     request.body = {};
  
  //     response.status = sinon.stub().returns(response);
  //     response.send = sinon.stub().returns(mockProducts[0]);
  //     console.log(mockProducts[0]);
  //     sinon.stub(ProductService, 'getProductById').resolves(mockProducts[0]);
  //   });

  //   it('verifica se retorna um produto', async() => {
  //     const product = await ProductController.getById(request, response);
  //     console.log('>>>>>>', product);
  //     // expect(product).to.be.an('object');
  //   });
  // });
});