const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
// const chaiHttp = require('chai-http');

const SalesModel = require('../../../models/salesModel');
const ProducsModel = require('../../../models/productsModel');
const { connection } = require('../../../models/connection')
const { mockSales, mockAllSales } = require('../../mock');

// const url = 'http://localhost:3000';

// chai.use(chaiHttp)

describe('salesModel', () => {
  describe('get')
  beforeEach(() => {
    sinon.stub(connection, 'execute').resolves(mockAllSales);
  });

  afterEach(() => {
    connection.execute.restore();
  });

  it('Testa getAllSales', async () => {
    const sales = await SalesModel.getAllSales();

    expect(sales).to.be.an('array');
    expect(sales).to.have.length(3);
    expect(sales[0]).to.have.property('sale_id');
    expect(sales[0]).to.have.property('date');
    expect(sales[0]).to.have.property('product_id');
    expect(sales[0]).to.have.property('quantity');
  });

  it('Testa getSalesById', async () => {
    const sales = await SalesModel.getSaleById(1);
    const pa = sales.filter(e => e.sale_id === 2);

    expect(sales).to.be.an('array');
    expect(sales[0]).to.have.property('sale_id');
    expect(sales[0]).to.have.property('date');
    expect(sales[0]).to.have.property('product_id');
    expect(pa).to.deep.equal([
      {
        "sale_id": 2,
        "date": "2022-06-01T15:30:24.000Z",
        "product_id": 3,
        "quantity": 15
      }
    ]);
  });

  // it('Testa registerSale', async () => {
  //   const newSale = await SalesModel.registerSale();
  //   // console.log(newSale);
  //   expect(newSale).to.equal(3);
  // });

  // it('Testa postSale', async () => {
  //   const newSale = await SalesModel.postSale(1, 1, 50);
  //   // console.log('newSale: ', newSale);
  //   expect(newSale).to.be.an('object');
  //   expect(newSale).to.have.property('product_id');
  //   expect(newSale).to.have.property('quantity');
  //   expect(newSale).to.deep.equal({ product_id: 1, quantity: 50 });
  // });

  // it('Testa putSale', async () => {
  //   const put = await SalesModel.putSale(1, 1, 500);
  //   // console.log('PUT: ', put);
  //   expect(put).to.be.an('object');
  //   expect(put).to.have.property('product_id');
  //   expect(put).to.have.property('quantity');
  //   expect(put).to.deep.equal({ product_id: 1, quantity: 500 });
  // });
  
  // it('Testa deleteSaleFromSales', async () => {
  //   let product = await SalesModel.getSalesById(1);
  //   console.log('ANTES: ', product);
    
  //   await SalesModel.deleteSaleFromSales(1);

  //   product = await SalesModel.getSalesById(1);
  //   console.log('DEPOIS: ', product);
  //   expect(product).to.be.an('array').empty;
  // });

  // it('Testa deleteSaleFromSalesProducts', async () => {
  //   let product = await SalesModel.getSalesById(1)
  //   console.log('ANTES: ', product);
  //   await SalesModel.deleteSaleFromSalesProducts(1);
    
  //   product = await SalesModel.getSalesById(1)
  //   console.log('DEPOIS: ', product);
  //   expect(product).to.be.an('array').empty;
  // });

  // it('Testa updateStockUp', async () => {
  //   let product = await ProducsModel.getProductById(1);
  //   let { quantity } = product;
  //   // console.log('ANTES de editar: ', product);
  //   await SalesModel.updateStockUp(1, 50);
  //   // console.log('stockUp: ', stockUp);
  //   product = await ProducsModel.getProductById(1);
  //   // console.log('DEPOIS de editar: ', product);
  //   expect(product).to.include({ quantity: quantity + 50 })
  // });

  // it('Testa updateStockDown', async () => {
  //   let product = await ProducsModel.getProductById(1);
  //   let { quantity } = product;
  //   // console.log('ANTES de editar: ', product);
  //   await SalesModel.updateStockDown(1, 50);
  //   // console.log('SUM: ', sum);
  //   product = await ProducsModel.getProductById(1);
  //   // console.log('DEPOIS de editar: ', product);
  //   expect(product).to.include({ quantity: quantity - 50 });
  //   // console.log('MOCK: ', mockSales);
  //   // console.log('mockSalesProductsSerialized: ', mockSalesProductsSerialized);
  // });
});
