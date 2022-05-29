const { salesValidation } = require('../validations/salesValidation')

const middlewareSalesValidation = (req, res, next) => {
  const body = req.body || {};
  const { code, message } = salesValidation(body);

  console.log('MIDDLEWARE', code, message);
  
  if (code !== 200) return res.status(code).json({ message });
  
  next();
};

module.exports = { middlewareSalesValidation };