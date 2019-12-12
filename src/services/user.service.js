import db from '../database/models';
// import looger from '../helpers/logger.helper';
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
      const user = await db.User.findOne({ where: { email } });
      if (!user) return null;
      return user;
    } catch (error) {
      // TODO: looger('error', error);
      return null;
    }
  }
}
export default UserServices;
