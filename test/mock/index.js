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

const mockSalesProducts = [
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

const mockSalesProductsSerialized = [
  {
    id: 1,
    productId: 1,
    quantity: 5,
  },
  {
    id: 1,
    productId: 2,
    quantity: 10,
  },
  {
    id: 2,
    productId: 3,
    quantity: 15,
  }
];

module.exports = {
  mockProducts,
  mockSales,
  mockSalesProducts, 
};
