import db from '../database/models';
import Queries from './Queries';
import logger from '../helpers/logger.helper';
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
      logger('error', error);
      return undefined;
    }
  }

  /**
   * This a function that creates a user if he is not found in the database
   * @param {string} user this is a user email to be updated
   * @returns {object} return  a response object
   */
  static async findOrCreate(user) {
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
    } else {
      response.errorMessage(res, 'User not found! please check your email and try again', 404);
    }
  }

  /**
 * service to reset a password
 // eslint-disable-next-line valid-jsdoc
 * @param {Object} email user request
 * @param {Object} userInfo user response
 * @returns {Object} return user message
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
}
export default UserServices;
