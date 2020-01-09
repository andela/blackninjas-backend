import db from '../database/models';
import Queries from './Queries';
import response from '../helpers/response.helper';


/**
 * This class contains functions for all user services.
 */
class UserServices {
  /**
 * creating user query
 * @param {string} NewUser users table in database.
 * @returns {array} data the data to be returned.
 */
  static async CreateUser(NewUser) {
    return Queries.create(db.user, NewUser);
  }

  /**
 * Find user by email
 * @param {Object} email User email.
 * @returns {Object} Returns a user object and if user doesn't exist it returns null.
 */
  static async findUserByEmail(email) {
    try {
      const user = await db.user.findOne({ where: { email } });
      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * This a function that creates a user if he is not found in the database
   * @param {object} user this is a user email to be updated
   * @returns {object} return  a response object
   */
  static async findOrCreateUser(user) {
    try {
      await db.user.findOrCreate({
        where: { email: user.email },
        defaults: user
      });
    } catch (error) {
      return null;
    }
  }

  /**
   * This a function that activete a user account
   * @param {string} email this is a user email to be updated
   * @param {object} updateUser this is a value need to update  a user account
   * @returns {object} return  a response object
   */
  static async activeUser(email, updateUser) {
    /**
     * This is exception handling
     *@return {object} return an error object if there is any
     */

    try {
      const userToUpdate = await db.user.findOne({
        where: { email }
      });
      if (userToUpdate && userToUpdate.isVerified) {
        return {
          status: 409,
          message: 'user already activated'
        };
      }
      if (userToUpdate) {
        await db.user.update(
          updateUser,
          { where: { email }, returning: true, plain: true }
        );

        return {
          status: 200,
          message: 'user account successfuly activated'
        };
      }
      return {
        status: 404,
        message: 'User not found'
      };
    } catch (error) {
      return {
        status: 400,
        message: error
      };
    }
  }

  /**
 * service to reset a password
 // eslint-disable-next-line valid-jsdoc
 * @param {Object} req user request
 * @param {Object} res user response
 * @param {Object} email user email
 * @param {Object} data user data
 * @returns {Object} return user message
 */
  static async resetPassword(req, res, email, data) {
    const userToUpdate = await this.findUserByEmail(email);
    if (userToUpdate !== null && !userToUpdate.isVerified) {
      response.errorMessage(res, 'Account is not verified', 401);
    } else if (userToUpdate !== null) {
      await db.user.update(data,
        { where: { email }, returning: true, plain: true });
      response.successMessage(res, 'Password has successfuly changed', 200, req.user.token);
    }
  }

  /**
   * This a function that update a user account fields
   * @param {string} email this is a user email
   * @param {object} userInfo this is user's fields you want to update
   * @returns {object} return  a response object
   */
  static async updateUser(email, userInfo) {
    const userToUpdate = await this.findUserByEmail(email);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found'
      };
    }
    const updatedUser = await userToUpdate.update(userInfo);
    return updatedUser;
  }

  /**
   *
   * @param {Integer} userId the id of the user
   * @returns {Object} the booking of the exact passed user id
   */
  static async findUserManager(userId) {
    try {
      const trip = await Queries.findTrip(db.usermanagement, userId);
      return trip;
    } catch (error) {
      return error;
    }
  }
}
export default UserServices;
