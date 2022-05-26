const { STATUS, MIN_LENGTH_NAME, MIN_QUANTITY, blank, lengthLessThan } = require('../utils');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = STATUS;

const validateProducts = (name, quantity) => {
  if (blank(name)) return { code: BAD_REQUEST, message: '"name" is required' };
  if (lengthLessThan(name, MIN_LENGTH_NAME)) {
    return { code: UNPROCESSABLE_ENTITY, message: '"name" length must be at least 5 characters long' };
  }

  if (blank(quantity)) return { code: BAD_REQUEST, message: '"quantity" is required'};
  if (lengthLessThan(quantity, MIN_QUANTITY)) return { code: UNPROCESSABLE_ENTITY, message: '"quantity" must be greater than or equal to 1'}
  return {};
} 

module.exports = {
  validateProducts,
}