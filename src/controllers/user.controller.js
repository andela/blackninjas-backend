import checkEmailpassword from '../middlewares/user.middleware';
import UserServices from '../services/user.service';
import EncryptPassword from '../helpers/Encryptor';
import response from '../helpers/response.helper';
import mailer from '../helpers/send.email.helper';
import helper from '../helpers/token.helper';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class UserController {
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
      const password = EncryptPassword(req.body.password);
      const isVerified = false;
      const token = helper.GenerateToken(email, password, isVerified, firstName);
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
        res,
        'user created successfully visit email to verify account',
        201,
        data
      );
    } catch (e) {
      return response.errorMessage(
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
    const activate = {
      active: true
    };
    const updaUser = await UserServices.activeUser(req.user.email, activate);

    if (updaUser.status === 200) {
      return response.successMessage(res, updaUser.message, updaUser.status, 'isVerified:True');
    }
    return response.errorMessage(res, updaUser.message, updaUser.status);
  }

  /**
  *login function to get profile from google and facebook and manipulate it
  *
  *
  *@param {object} accessToken response
  *@param {object} refreshToken response
  *@param {object} profile object
  *@param {object} done callback
  *@returns {object} object
*/
  static async googleAndFacebookPlusAuth(accessToken, refreshToken, profile, done) {
    try {
      const userData = {
        id: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        authtype: profile.provider,
        isVerified: true
      };
      const {
        email, firstName, lastName, isVerified, authtype
      } = userData;
      await UserServices.findOrCreate({
        email, firstName, lastName, isVerified, authtype
      });
      done(null, userData);
    } catch (error) {
      done(error, false);
    }
  }


  /**
  *login function to return data from social accounts to the user
  *
  *
  *@param {object} req request
  *@param {object} res response
  *@returns {object} object
  */
  static async authGoogleAndFacebook(req, res) {
    const token = helper.GenerateToken(req.user);
    await UserServices.updateUser(req.user.email, { token });
    return response.successMessage(res, `user logged in successfully with ${req.user.authtype}`, 200, token);
  }

  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {object} req This is a request coming from a user
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async logout(req, res) {
    await UserServices.updateUser(req.user.email, { token: null });
    return response.successMessage(res, 'User is successfully logged out.', 200);
  }

  /**
 * It used to reset a user password
 * @param {object} req user request
 * @param {object} res user response
 * @returns {object} result
 */
  static resetPassword(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return response.errorMessage(res, 'Password does not match!', 400);
    }

    const data = {
      password: EncryptPassword(req.body.password)
    };
    UserServices.resetPassword(req, res, req.user.email, data);
  }

  /**
   * send a reset password link to the user
   * @param {Object} req user request
   * @param {Object} res user response
   * @returns {Object} return user response
   */
  static async sendResetPasswordLink(req, res) {
    const result = await UserServices.findUserByEmail(req.body.email);
    if (result !== null) {
      const token = helper.GenerateToken(req.body.email, '', '');
      const emailView = mailer.resetPasswordView(token, result.firstName);
      mailer.sendEmail(req.body.email, 'Reset Password', emailView);
      return response.successMessage(res, 'Email sent please check you email to reset your password', 200, token);
    }
    return response.errorMessage(res, 'user not found!', 404);
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

export default UserController;
