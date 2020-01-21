import checkEmailpassword from '../middlewares/user.middleware';
import UserServices from '../services/user.service';
import EncryptPassword from '../helpers/Encryptor';
import response from '../helpers/response.helper';
import mailer from '../helpers/send.email.helper';
import GenerateToken from '../helpers/token.helper';
import profileHelper from '../helpers/profile.helper';
import Paginate from '../helpers/paginate.helper';

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
        birthdate
      } = req.body;
      const password = EncryptPassword(req.body.password);
      const token = GenerateToken({ email, firstName, isVerified: false });
      const NewUser = {
        firstName,
        lastName,
        email,
        gender,
        country,
        birthdate,
        password,
        isVerified: false,
        token
      };
      UserServices.CreateUser(NewUser);

      const data = {
        token,
      };
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
      isVerified: true
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
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        authtype: profile.provider,
        profileImage: profile.photos[0].value,
        isVerified: true,
      };
      const [userCreated] = await UserServices.findOrCreateUser(userData);
      done(null, userCreated.dataValues);
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
    const {
      email, isVerified, id, authtype
    } = req.user;
    const token = GenerateToken({ email, isVerified, id });
    await UserServices.updateUser(req.user.email, { token });
    return response.successMessage(res, `user logged in successfully with ${authtype}`, 200, token);
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
      const token = GenerateToken({ email: req.body.email, isVerified: result.isVerified, id: result.id });
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
  static async viewProfile(req, res) {
    const { email } = req.user;
    return profileHelper.getProfileData(email, req, res);
  }

  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async editProfile(req, res) {
    // can not update to an existing email
    // check if user provided email
    const { email } = req.user;
    const profile = profileHelper.chooseProfileData(email, req.body);
    // Check if user is verified
    if (!req.user.isVerified === true) {
      const status = 401;
      return response.errorMessage(res, 'User Is Not Verified, Please verify the User First', status);
    }
    const userId = req.user.email;
    UserServices.updateUser(userId, profile);
    return response.successMessage(
      res,
      'User Profile are Updated',
      200,
      profile
    );
  }

  /**
   * This logs out a user by updating token attribute to null
   * @param {object} req This is a request coming from a user
   * @param {object} res This is a response will be sent to a user
   * @returns {object} return promise object
   */
  static async logout(req, res) {
    await UserServices.updateUser(req.user.email, { token: null });
    return response.successMessage(res, 'User is successfully logged out.', 200);
  }

  /** It gets all users especially username, email, role, created At, updated At
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getUsers(req, res) {
    const { page } = req.query;
    const limit = 10;
    const offset = Paginate(page, limit);
    const users = await UserServices.getUsers(limit, offset);
    if (users.count > offset) {
      return response.successMessage(
        res,
        'Users',
        200,
        users
      );
    }
    return response.errorMessage(
      res,
      'No User Found',
      404
    );
  }

  /**
   * It activate a user account by updating isVerified attribute to true
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async updateRole(req, res) {
    const { role } = req.body;
    const { userId } = req.params;
    const roleToUpdate = { role: role.toLowerCase() };
    const getRole = await UserServices.getRole(role);
    if (getRole) {
      const data = await UserServices.updateUserById(userId, roleToUpdate);
      const userData = data.getDataValue('role');
      return response.successMessage(
        res,
        'User Role successfully updated',
        200,
        { role: userData }
      );
    }
    return response.errorMessage(
      res,
      'We dont support that role',
      401
    );
  }
}


export default userController;
