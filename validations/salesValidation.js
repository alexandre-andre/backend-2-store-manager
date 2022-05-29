const { STATUS, MIN_QUANTITY, blank, lengthLessThan } = require('../utils');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = STATUS;

const MSG_SALE = {
  BLANK_ID: "\"productId\" is required",
  BLANK_QUANTITY: "\"quantity\" is required",
  INVALID_QUANTITY: "\"quantity\" must be greater than or equal to 1",
};

const salesValidation = (body) => {
  let result;

  body.forEach(({ productId, quantity }) => {
    if (blank(productId)) {
      result = { code: BAD_REQUEST, message: MSG_SALE.BLANK_ID }; 
    };

    if (blank(quantity)) result = { code: BAD_REQUEST, message: MSG_SALE.BLANK_QUANTITY };

    if (lengthLessThan(quantity, MIN_QUANTITY)) {
      result = { code: UNPROCESSABLE_ENTITY, message: MSG_SALE.INVALID_QUANTITY };
    };
  });

  console.log(result);
  
  return result;
};

module.exports = { salesValidation };
