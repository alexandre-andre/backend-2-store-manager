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
const date = new Date().toISOString();
const currentDate = date.slice(0, 10).replace(/-/g, '/');
// const extendedCurrentDate = new Date().toISOString();

const mockSales = [
  {
    id: 1,
    date: currentDate, 
  },
  {
    id: 2,
    date: currentDate,
  }
];

const mockSalesProducts = [
  {
    sale_id: 1,
    product_id: 1,
    quantity: 5,
  },
  {
    sale_id: 1,
    product_id: 2,
    quantity: 10,
  },
  {
    sale_id: 2,
    product_id: 3,
    quantity: 15,
  }
];

const mockAllSales = [
  {
    sale_id: 1,
    date,
    product_id: 1,
    quantity: 5
  },
  {
    sale_id: 1,
    date,
    product_id: 2,
    quantity: 10
  },
  {
    sale_id: 2,
    date,
    product_id: 3,
    quantity: 15
  }
];

const mockAllSalesSerialized = [
  {
    saleId: 1,
    date,
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date,
    productId: 2,
    quantity: 10
  },
  {
    saleId: 2,
    date,
    productId: 3,
    quantity: 15
  }
];

const mockSalesProductsUpdate = {
  saleId: 1,
  date,
  productId: 1,
  quantity: 50
};

module.exports = {
  mockProducts,
  mockSales,
  mockSalesProducts,
  mockAllSales, 
  mockAllSalesSerialized,
  mockSalesProductsUpdate,
};
