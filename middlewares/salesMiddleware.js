const { salesValidation } = require('../validations/salesValidation');

const middlewareSalesValidation = (req, res, next) => {
  const validations = salesValidation(req.body);

  if (validations) {
    return res.status(validations.status).json({ message: validations.message });
  }

  next();
};

module.exports = { middlewareSalesValidation };