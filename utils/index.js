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
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422
};

const MSG_PRODUCT = {
  NOT_FOUND: 'Product not found',
  ALREADY_EXISTS: 'Product already exists'
};

const MSG_SALE = {
  NOT_FOUND: 'Sale not found',
};

const MIN_LENGTH_NAME = 5;
const MIN_QUANTITY = 1;

const blank = (value) => (!value);
const lengthLessThan = (value, min) => (value < min);

module.exports = {
  serializeAllSales,
  serializeById,
  STATUS,
  MSG_PRODUCT,
  MSG_SALE,
  MIN_LENGTH_NAME,
  MIN_QUANTITY,
  blank,
  lengthLessThan
}