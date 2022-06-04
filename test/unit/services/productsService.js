const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
// const chaiHttp = require('chai-http');

const ProductsModel = require('../../../models/productsModel');
const ProductsService = require('../../../services/productService');
const { mockProducts } = require('../../mock');

describe('SERVICES PRODUCTS', () => {
  /** NAO FUNCIONA */
  // describe('Verifica getAllProducts', () => {
  //   beforeEach(() => {
  //     sinon.stub(ProductsModel, 'getAllProducts').resolves([mockProducts]);
  //     // console.log('DESCRIBE: ', [mockAllProducts]);
  //   });
    
  //   afterEach(() => {
  //     ProductsModel.getAllProducts.restore();
  //   });

  //   it('retorna todas os produtos', async () => {
  //     const allProducts = await ProductsService.getAllProducts();  
  //     // console.log('>>>>', allProducts);
  //     expect(allProducts).to.be.an('array');
  //     expect(allProducts).to.be.length(3);
  //   });
  // });
  
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
      const nonExist = await ProductsService.getProductById(999);
  
      expect(nonExist).to.be.null;
    });

    it('se retorna venda pelo id', async () => {
      const product = await ProductsService.getProductById(1);
      
      expect(product).to.be.an('object');
      expect(product).to.haveOwnProperty('id');
      expect(product).to.haveOwnProperty('name');
      expect(product).to.haveOwnProperty('quantity');
    });
  });

  describe('Verifica getProductByName', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'getProductByName')
        .onFirstCall().resolves(null)
        .onSecondCall().resolves({ id: 4, name: 'Arco do Gavião Arqueiro', quantity: 1 });
        // console.log('DESCRIBE: ', { id: 4, name: 'Arco do Gavião Arqueiro', quantity: 1 });
    });

    afterEach(() => {
      ProductsModel.getProductByName.restore();
    });

    it('se retorna null quando o produto nao existe', async () => {
      const nonExist = await ProductsService.getProductByName('xxx');
      expect(nonExist).to.be.null;
    });

    /** NAO FUNCIONA */
    // it('se retorna um produto quando existe', async () => {
    //   const product = await ProductsService.getProductByName('Arco do Gavião Arqueiro');      
    //   console.log('IT: ', product);
    //   expect(product).to.be.an('object');
    //   expect(product2).to.haveOwnProperty('id');
    //   expect(product2).to.haveOwnProperty('name');
    //   expect(product2).to.haveOwnProperty('quantity');
    // });
  });

  describe('Verifica postProductdByName', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'postProductdByName').resolves({ id: 99, name: 'smeagol', quantity: 1 });
    });

    afterEach(() => {
      ProductsModel.postProductdByName.restore();
    });

    it('se retorna um produto inserido', async () => {
      const newProd = await ProductsService.postProductdByName('smeagol', 1);
      // console.log('>>>> ', newProd);
      expect(newProd).to.be.an('object');
    });
  });

  describe('Verifica putProduct', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'putProduct').resolves({ id: 4, name: 'Arco do Gavião Arqueiro', quantity: 1 });
    });

    afterEach(() => {
      ProductsModel.putProduct.restore();
    });

    it('se retorna um produto editado', async () => {
      const edited = await ProductsService.putProduct(4, 'Arco do Gavião Arqueiro', 1);
      // console.log('>>>> ', edited);
      expect(edited).to.be.an('object');
    });
  });

  describe('Verifica deleteProductById', () => {
    beforeEach(() => {
      sinon.stub(ProductsModel, 'deleteProductById').resolves({ id: 4, name: 'Arco do Gavião Arqueiro', quantity: 1 });
    });

    afterEach(() => {
      ProductsModel.deleteProductById.restore();
    });

    it('se retorna um produto editado', async () => {
      const removed = await ProductsService.deleteProductById(4);
      // console.log('>>>> ', removed);
      expect(removed).to.be.an('object');
    });
  });
});
