import response from '../helpers/response.helper';

/**
 *
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} hghfgjh
 */
const verifyUser = (req, res, next) => {
  if (!req.user.isVerified) {
    return response.errorMessage(res, 'Account not verified', 401, 'error');
  }

  return next();
};
export default verifyUser;
