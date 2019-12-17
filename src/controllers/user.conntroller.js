import UserServices from '../services/users/servises';
import responseHandler from '../helpers/responseHandler';

/**
 * user class
 */
class UserController {
  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async updatedUser(req, res) {
    const activate = true;
    // const id = parseInt(req.params.id, 10);
    const updaUser = await UserServices.activeUser(req.user.email, activate);

    if (updaUser.status === 200) {
      responseHandler.successMessage(req, res, updaUser.message, updaUser.status, 'isVerified:True');
    } else {
      responseHandler.errorMessage(req, res, updaUser.message, updaUser.status);
    }
  }
}

export default UserController;
