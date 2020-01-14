import response from '../helpers/response.helper';
import UserServices from '../services/user.service';
/**
 * class for verifying if the signerd user is manager
 */
class verifyIfIsManager {
  /**
 *
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} object
 */
  static async verifyManager(req, res, next) {
    const user = await UserServices.findUserByEmail(req.user.email);


    if (user.role === 'requester' || user.role === null) {
      return response.errorMessage(res, 'You are not authorised to perform this task', 401, 'error');
    }
    req.manager = user;
    return next();
  }
}
export default verifyIfIsManager;
