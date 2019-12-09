import database from '../../database/models';

/**
 * add user class
 */
class Users {
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
      const userToUpdate = await database.users.findOne({
        where: { email }
      });
      if (userToUpdate && userToUpdate.active) {
        return {
          status: 409,
          message: 'user already activated'
        };
      }
      if (userToUpdate) {
        await database.users.update(
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

export default Users;
