import response from '../helpers/responseHandler';
import checkEmailpassword from '../middlewares/checkEmailPassword';

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
    try {
      checkEmailpassword(req, res);
    } catch (e) {
      return response.errorMessage(
        req,
        res,
        'server error',
        400,
        'error'
      );
    }
  }
}

export default userController;
