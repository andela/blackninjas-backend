import { validationResult } from 'express-validator';
import response from '../helpers/response.helper';

const isValid = (req, res, next) => {
  const body = Object.prototype.toString.call(req.body);
  if (body === '[object Array]') return next();
  // Finds the validation errors in this request
  const results = validationResult(req);
  if (!results.isEmpty()) {
    return response.errorMessage(res, results.errors.map((i) => i.msg), 422);
  }
  next();
};
export default isValid;
