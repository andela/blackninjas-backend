const { validationResult } = require('express-validator');

const isValid = (req, res, next) => {
  // Finds the validation errors in this request
  const results = validationResult(req);
  if (!results.isEmpty()) {
    return res.status(422).json(results.errors.map((i) => i.msg));
  }
  next();
};

export default isValid;
