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
    
    it('se retorna um array', async () => {
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

  // describe('Verifica postProductByName', () => {
  //   before(() => {
  //     sinon.stub(ProductsModel, 'getProductByName').resolves(mockProducts[0]);
  //     sinon.stub(connection, 'execute').resolves(null);
  //     });

  //   after(() => {
  //     connection.execute.restore();
  //     ProductsModel.getProductByName.restore();
  //     sinon.connection.restore();
  //   });
    
  //   it('se o produto ja existir, deve retornar null', async () => {
  //     let a = await ProductsModel.postProductdByName('Martelo', 99);
  //     console.log(a);
  //     expect(a).to.be.null;
  //   });

    /** AQUI FALTA O RETORNO QDO O PRODUTOR EH INSERIDO */
    // it('se o produto nao existir deve retornar um novo objeto', async () => {
    //   let smeagol = await ProductsModel.postProductdByName('Smeagol', 99);
    //   // await ProductsModel.getProductByName('Martelo');
    //   expect(smeagol).to.be.an('object');
    // });
  // });

  
  describe('Verifica putProdut', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves({ id, name, quantity });
    });

    after(() => { connection.execute.restore() });

    it('se o produto é editado', async () => {
      const put = await ProductsModel.putProduct(id, name, quantity);
      
      expect(put).to.be.an('object');
    });
  });
  
  /** POR QUE QUEBRA A SALES MODEL ??  
   */
  describe('Verifica deleteProductById', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves(null);
    });
    
    after(() => { connection.execute.restore() });

    it('se o item foi editado', async () => {
      const produto = await ProductsModel.deleteProductById(id);
        expect(produto).to.be.null;
    });
  });
});
