/**
* class for responses
 */
class Queries {
  /**
 * creating user query
 * @param {string} table users table in database.
 * @param {string} userData the data to be inputed in database.
 * @returns {array} data the data to be returned.
 */
  static async create(table, userData) {
    const data = await table.create(userData);
    return data;
  }
}
export default Queries;
