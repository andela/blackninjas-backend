import db from '../database/models';
/**
 * Class for checking user in the database
 */
class UserServices {
  /**
   * checking user in the database
   * @param {Object} email The request object
   * @returns {Object} A user object if user doesn't exist it returns null
   */
  static async findUserByEmail(email) {
    const user = await db.user.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}

export default UserServices;
