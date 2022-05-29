const { STATUS, MIN_LENGTH_NAME, MIN_QUANTITY, blank, lengthLessThan } = require('../utils');
const { BAD_REQUEST, UNPROCESSABLE_ENTITY } = STATUS;

const MSG_PROD = {
  BLANK_NAME: '\"name"\ is required',
  BLANK_QTT: '\"quantity"\ is required',
  INVALID_LENGTH_NAME:'\"name"\ length must be at least 5 characters long',
  INVALID_LENGTH_QUANTITY: '\"quantity"\ must be greater than or equal to 1',
};

const productsValidation = (res, name, quantity) => {
  if (blank(name)) return res.status(BAD_REQUEST).json({ message: MSG_PROD.BLANK_NAME });

  if (lengthLessThan(name.length, MIN_LENGTH_NAME)) {
    return res.status(UNPROCESSABLE_ENTITY).json({ message: MSG_PROD.INVALID_LENGTH_NAME });
  };

  if (lengthLessThan(quantity, MIN_QUANTITY)) { 
    return res.status(UNPROCESSABLE_ENTITY).json({ message: MSG_PROD.INVALID_LENGTH_QUANTITY });
  };

  if (blank(quantity)) return res.status(BAD_REQUEST).json({ message: MSG_PROD.BLANK_QTT });
  
  return {};
};

module.exports = {
  productsValidation,
};
