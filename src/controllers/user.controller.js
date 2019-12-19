import checkEmailpassword from '../middlewares/user.middleware';
import UserServices from '../services/user.service';
import EncryptPassword from '../helpers/Encryptor';
import Token from '../helpers/token';
import response from '../helpers/response.handler';
import mailer from '../helpers/send.email.helper';


/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class userController {
/**
   * signup a user and saving user data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async signup(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        gender,
        country,
        birthday,
        phoneNumber
      } = req.body;
      const password = await EncryptPassword(req.body.password);
      const isVerified = false;
      const token = Token.GenerateToken(email, password, isVerified, firstName);
      const NewUser = {
        firstName,
        lastName,
        email,
        gender,
        country,
        birthday,
        password,
        phoneNumber,
        isVerified: false,
        token
      };
      UserServices.CreateUser(NewUser);
      const data = {
        token,
      };
      // const userName = firstName;
      const emailView = mailer.activateAccountView(token, firstName);
      mailer.sendEmail(email, 'Verification link', emailView);


      response.successMessage(
        req,
        res,
        'user created successfully visit email to verify account',
        201,
        data
      );
    } catch (e) {
      return response.errorMessage(
        req,
        res,
        e.message,
        500,


      );
    }
  }

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
      response.successMessage(req, res, updaUser.message, updaUser.status, 'isVerified:True');
    } else {
      response.errorMessage(req, res, updaUser.message, updaUser.status);
    }
  }
}

export default userController;
