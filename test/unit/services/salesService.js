const sinon = require('sinon');
const { expect } = require('chai');
const SalesModel = require('../../../models/salesModel');
const ProductsModel = require('../../../models/productsModel');
const SalesService = require('../../../services/salesService');
const { mockAllSales, mockProducts } = require('../../mock');
const serialize = require('../../../utils');

describe('SERVICES SALES', () => {
  // describe('Verifica getAllsales', () => {
  //   beforeEach(() => {
  //     sinon.stub(SalesModel, 'getAllSales').resolves(mockAllSales);
  //     console.log('DESCRIBE: ', mockAllSales);
  //   });
    
  //   afterEach(() => {
  //     SalesModel.getAllSales.restore();
  //   });

  //   it('retorna um array', async () => {
  //     const allSales = await SalesService.getAllsales();
  //     console.log('IT >>>>>', allSales);  
  //     expect(allSales).to.be.an('array');
  //   });
  // });

  describe('Verifica getSaleById', () => {
    const mock = [{ product_id: 3, quantity: 14, date: new Date().toISOString() }];
    beforeEach(() => {
      sinon.stub(serialize, 'serializeById').returns(mock)

      sinon.stub(SalesModel, 'getSaleById')
        .onFirstCall().resolves([null])
        .onSecondCall().resolves([serialize.serializeById(mock)]);
      // console.log('DESCRIBE: ', [serialize.serializeById(mock)]);
    });
    
    afterEach(() => {
      SalesModel.getSaleById.restore();
    });

    it('se quando o id da venda nao existe retorna null', async () => {
      const noxExist = await SalesService.getSaleById(1);
      // console.log('>>>>>>', noxExist);
      expect(noxExist).to.be.null;
    });
    
    // it('se quando existe o id da venda deve ser retornado um array', async () => {
    //   const sale = await SalesService.getSaleById(2);
    //   expect(sale).to.be.an('array');
    //   console.log('>>>>>>', sale);
    // });
  });

  describe('Verifica registerSale', () => {
    beforeEach(() => {
      sinon.stub(SalesModel, 'registerSale').resolves([{ insertId: 1 }]);
    });

    afterEach(() => SalesModel.registerSale.restore());

    it('se retorna 1 quando for true', async () => {
      const newRegister = await SalesService.registerSale();
      expect(newRegister).to.be.equal(1);
    });
  });

  // describe('Verifica postSale', () => {
  //   beforeEach(() => {
  //     sinon.stub(ProductsModel, 'getProductById').resolves(mockProducts[0])
  //     console.log('DESCRIBE: ', mockProducts[0]);

  //     sinon.stub(SalesService, 'postSale')
  //       .onFirstCall().resolves({ status: 422, message: 'Such amount is not permitted to sell' });
  //       // .onSecondCall().resolves({ id: 1, quantity: 99 });
  //   });
    
  //   afterEach(() => {
  //     ProductsModel.getProductById.restore();
  //     SalesService.postSale.restore();
  //   });

  //   it('se quando a quantidade for maior que o estoque deve retornar uma mensagem de erro', async () => {
  //     const funcao = await SalesService.postSale(1, 1, 999);
  //     console.log('A FUNCAO: ', funcao);

  //     const product = await ProductsModel.getProductById(1);
  //     console.log('>>>>>>', product.quantity);
      
  //     expect(product).to.be.an('object');
      
  //     expect(funcao).to.be.deep.equal({ status: 422, message: 'Such amount is not permitted to sell' });
  //   });

  //   it('se a quantidade estiver de acordo com o estoque deve retornar o produto vendido', async () => {
  //     const funcao = await SalesService.postSale(1, 1, 999);
  //     console.log('A FUNCAO: >>>>>> ', funcao);
  //   });
  // });

  // describe('Verifica putSale', () => {
  //   beforeEach(() => {
  //     sinon.stub().resolves();
  //   });

  //   afterEach(() => {});

  //   it('getAllsales', async () => {
  //     const allSales = await SalesService.putSale(payload);
  //     console.log('>>>>>>', allSales);
  //     expect(allSales).to.be.an('array');
  //   });
  // });

  // describe('Verifica deleteSaleFromSales', () => {
  //   beforeEach(() => {
  //     sinon.stub(SalesService, 'deleteSaleFromSales').resolves(null);
  //   });

  //   afterEach(() => {
  //     SalesService.deleteSaleFromSales.restore();
  //   });

  //   it('se retorna null', async () => {
  //     const vemNull = await SalesService.deleteSaleFromSales(1);
  //     console.log('>>>>>>', vemNull);
  //     expect(vemNull).to.be.null;
  //   });
  // });
});
