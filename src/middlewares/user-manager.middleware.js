import response from '../helpers/response.helper';
import UserServices from '../services/user.service';


/**
* Class for users to create trips
*/
class UserManagementMiddleware {
/** Function that checks if the user passed in the params exists in our system and is not an admin
 * @param {*} req the request sent to the server
 * @param {*} res the response from the server
 * @param {*} next the next middleware on the chain
 * @returns {*} the next middleware on the chain
*/
  static async checkIfUserExistAndNotAdmin(req, res, next) {
    const foundUser = await UserServices.findUser({ id: req.params.userId });
    if (!foundUser) return response.errorMessage(res, 'user does not exist', 404);
    if (foundUser.role === 'admin') return response.errorMessage(res, 'You cannot perform this action', 403);
    return next();
  }

  /** Function that checks if the user passed in the params exists in our system and is not an admin
 * @param {*} req the request sent to the server
 * @param {*} res the response from the server
 * @param {*} next the next middleware on the chain
 * @returns {*} the next middleware on the chain
*/
  static async checkIfManagerExist(req, res, next) {
    const foundManager = await UserServices.findUser({ id: req.body.managerId });
    if (!foundManager || foundManager.role !== 'manager') return response.errorMessage(res, 'The user has to be a manager to be assigned a user', 404);
    if (req.body.managerId === parseInt(req.params.userId, 10)) return response.errorMessage(res, 'A user cannot be his own manager', 403);
    return next();
  }
}

export default UserManagementMiddleware;
