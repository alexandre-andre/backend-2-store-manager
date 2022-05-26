const serializeAllSales = (array) => array.map((e) => ({
  saleId: e.sale_id,
  date: e.date,
  productId: e.product_id,
  quantity: e.quantity
}));

const serializeById = (array) => array.map((e) => ({
  date: e.date,
  productId: e.product_id,
  quantity: e.quantity,
}));

const STATUS = {
  OK: 200,
  NOT_FOUND: 404,
};

module.exports = {
  serializeAllSales,
  serializeById,
  STATUS
}