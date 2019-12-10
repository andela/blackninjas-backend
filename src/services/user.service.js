import db from '../database/models/index';

/**
 * A class that contains functions for all user services
 */
class UserServices {
/**
 * Adds two numbers together.
 * @param {email} email - User email.
 * @returns {boolean}.
 */
  static isEmailExist(email) {
    return db.User.count({ where: { email } })
      .then((count) => {
        if (count > 0) {
          return true;
        }
        return false;
      });
  }
}
export default UserServices;
