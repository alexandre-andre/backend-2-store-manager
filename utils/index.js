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
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422
};

const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 0;

const blank = (value) => (!value);
const lengthLessThan = (value, min) => (value.length < min);

module.exports = {
  serializeAllSales,
  serializeById,
  STATUS,
  MIN_LENGTH_NAME,
  MIN_QUANTITY,
  blank,
  lengthLessThan
}