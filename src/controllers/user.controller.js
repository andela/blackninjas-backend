import checkEmailpassword from '../middlewares/user.middleware';
import UserServices from '../services/user.service';
import response from '../helpers/response.helper';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class userController {
  /**
   * Logs in a user by checking if they exist in the database
   * and if the supplied password matches the stored password
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async signIn(req, res) {
    await checkEmailpassword(req, res);
  }

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
      response.successMessage(res, updaUser.message, updaUser.status, 'isVerified:True');
    } else {
      response.errorMessage(res, updaUser.message, updaUser.status);
    }
  }

  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async profilePage(req, res) {
    const user = await UserServices.findUserByEmail(req.user.email);
    const status = 200;
    response.successMessage(res, user, status);
  }
}

export default userController;
