const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
// const chaiHttp = require('chai-http');

const ProductsModel = require('../../../models/productsModel');
const ProductsService = require('../../../services/productService');
const { connection } = require('../../../models/connection')
const { mockAllProducts } = require('../../mock');

describe('SERVICES PRODUCTS', () => {
  describe('Verifica getAllProducts', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getAllProducts').resolves(mockAllProducts);
      console.log('DESCRIBE: ', mockAllProducts);
    });
    
    afterEach(() => {
      ProductsModel.getAllProducts.restore();
    });

    it('retorna todas os produtos', async () => {
      const allProducts = await ProductsService.getAllProducts(mockAllProducts);  
      console.log('>>>>', allProducts);
      expect(allProducts).to.be.an('array');
    });

    // it('retorna todas os produtos', async () => {
    //   const allSales = await SalesService.getAllsales(mockAllSales);  
    //   expect(allSales).to.be.length(3);
    // });
  });

  // describe('Verifica getSaleById', () => {
  //   const serializeById = (array) => array.map((e) => ({
  //     date: e.date,
  //     productId: e.product_id,
  //     quantity: e.quantity,
  //   }));

  //   beforeEach(() => {
  //     sinon.stub(ProductsModel, 'getSaleById').resolves([serializeById(mockSalesProducts)[2]]);    
  //   });
    
  //   afterEach(() => {
  //     ProductsModel.getSaleById.restore();
  //   });

  //   it('retorna venda pelo id', async () => {
  //     const sale = await SalesService.getSaleById(1);
  //     console.log('>>>>>>', sale);
  //     expect(sale).to.be.an('array');
  //   });
  // });

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
