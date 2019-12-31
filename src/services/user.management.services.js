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
}

export default userManagement;
