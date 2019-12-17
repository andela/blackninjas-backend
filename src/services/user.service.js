import db from '../database/models';

/**
 * This class contains functions for all user services.
 */
class UserServices {
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
      // TODO: looger('error', error);
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
          { active: updateUser },
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
}
export default UserServices;
