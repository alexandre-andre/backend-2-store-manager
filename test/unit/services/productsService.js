const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
// const chaiHttp = require('chai-http');

const ProductsModel = require('../../../models/productsModel');
const ProductsService = require('../../../services/productService');
const { mockProducts } = require('../../mock');

describe('SERVICES PRODUCTS', () => {
  describe('Verifica getAllProducts', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves([mockProducts]);
      // console.log('DESCRIBE: ', [mockAllProducts]);
    });
    
    afterEach(() => {
      ProductsModel.getAllProducts.restore();
    });

    it('retorna todas os produtos', async () => {
      const allProducts = await ProductsService.getAllProducts();  
      // console.log('>>>>', allProducts);
      expect(allProducts).to.be.an('array');
      expect(allProducts).to.be.length(3);
    });

  });
  
  describe('Verifica getProductById', () => {
    before(() => {
      sinon.stub(ProductsModel, 'getProductById')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves(mockProducts[0]);
    });

    after(() => {
      ProductsModel.getProductById.restore();
    })

    it('quando um produto nao existe', async () => {
      const product = await ProductsService.getProductById(999);
  
      expect(product).to.be.null;
    });

    it('se retorna venda pelo id', async () => {
      const product = await ProductsService.getProductById(1);
      
      expect(product).to.be.an('object');
      expect(product).to.haveOwnProperty('id');
      expect(product).to.haveOwnProperty('name');
      expect(product).to.haveOwnProperty('quantity');
    });
  });

  // describe('Verifica registerSale', () => {
  //   beforeEach(() => {
  //     sinon.stub(ProductsModel, 'registerSale').resolves([{ insertId: 1 }]);
  //   });

  //   it('getAllsales', async () => {
  //     const allSales = await SalesService.registerSale();
  //     expect(allSales).to.be.equal(1);
  //   });
  // });

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
  //     sinon.stub(ProductsModel, 'deleteSaleFromSales').resolves(null);
  //   });

  //   afterEach(() => {
  //     ProductsModel.deleteSaleFromSales.restore();
  //   });

  //   it('se retorna null', async () => {
  //     const allSales = await SalesService.deleteSaleFromSales(null);
  //     console.log('>>>>>>', allSales);
  //     expect(allSales).to.be.null;
  //   });
  // });
  
});
