import Queries from './Queries';
import db from '../database/models';

/** */
class userManagement {
  /**
     * This method provides a servis of finding
     * a manager in database by user id
     * @param { Integer } user user id
     * @returns { Integer } manager id
     */
  static async findManagerByUserId(user) {
    return Queries.findManagerByUserId(db.usermanagement, user);
  }


  /**
 * creating user query
 * @param {string} NewUserManagement users and managers table in database.
 * @returns {array} data the data to be returned.
 */
  static async CreateUserManagement(NewUserManagement) {
    return Queries.create(db.usermanagement, NewUserManagement);
  }

  /**
 * assigning user to manager
 * @param {integer} userId id of the user to assign a manager.
 * @param {integer} managerId id of the manager to update.
 * @returns {array} data the data to be returned.
 */
  static async assignUsersManagers(userId, managerId) {
    try {
      const updatedUserManagement = await db.usermanagement.update(
        { managerId },
        { where: { userId }, returning: true },
      );
      return updatedUserManagement;
    } catch (error) {
      return error;
    }
  }

  /** Service to get all users with their managers
   * @param {*} limit the limit of rows retrieved
   * @param {*} offset the range of records retrieved
   * @returns {*} response to the user
   */
  static async getUsersWithManagers(limit, offset) {
    try {
      const usersManagers = db.sequelize.query(
        `SELECT us.id, us."firstName",us."lastName", us.email, us.role, ul."firstName" as Manager FROM usermanagements um JOIN users us on um."userId" = us.id left JOIN users ul ON um."managerId" = ul.id ORDER BY us."firstName" limit ${limit} offset ${offset}`,
        { type: db.sequelize.QueryTypes.SELECT }
      );
      return usersManagers;
    } catch (error) {
      return error;
    }
  }

  /** Service to get all managers
   * @returns {*} response to the user
   */
  static async getAllManagers() {
    try {
      const allManagers = await db.user.findAll({ attributes: ['id', 'firstName', 'lastName'], where: { role: 'manager' } });
      return allManagers;
    } catch (error) {
      return error;
    }
  }
}

export default userManagement;
