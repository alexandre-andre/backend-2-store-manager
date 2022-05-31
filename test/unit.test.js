const ProductsModel = require('../models/productsModel');
const ProductsService = require('../services/productService');
const ProductsController = require('../controllers/productController');
const SalesModel = require('../models/salesModel');
const SalesService = require('../services/salesService');
const SalesController = require('../controllers/salesController');

const sinon = require('sinon');
const { expect } = require('chai');


describe('Cobertura de testes da aplicação', () => {
  const mockProducts =   [
    {
      id: 1,
      name: 'Martelo de Thor',
      quantity: 10
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
      quantity: 20
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
      quantity: 30
    }
  ];

  const mockSales = [
    {
      id: 1,
      date: 31/05/2022, 
    },
    {
      id: 2,
      date: 31/05/2022,
    }
  ];

  const mosckSalesProducts = [
    {
      id: 1,
      product_id: 1,
      quantity: 5,
    },
    {
      id: 1,
      product_id: 2,
      quantity: 10,
    },
    {
      id: 2,
      product_id: 3,
      quantity: 15,
    }
  ];
  // let connection;

  // beforeEach(async() => {
  // });

  // afterEach(async () => {
  //   restore();
  // });

  describe('Testa Camada Model', () => {
    it('deve retornar um array não vazio', async () =>{
      const [response] = await ProductsModel.getAllProducts();
      expect(response).to.be.an('array');
      expect(response).not.to.be.empty;
    });

    // it()
  });

  // describe('Testa Camada Service', () => {});

  // describe('Testa Camada Controller', () => {});
});