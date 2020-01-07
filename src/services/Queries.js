import { Op } from 'sequelize';

/**
 * class for responses
 */
class Queries {
  /**
 * creating user query
 * @param {string} table users table in database.
 * @param {string} data the data to be inputed in database.
 * @returns {array} data the data to be returned.
 */
  static async create(table, data) {
    try {
      const datas = await table.create(data);
      return datas;
    } catch (error) {
      return error;
    }
  }

  /**
   * searching a trip
   * @param {string} table users table in database.
   * @param {date} travelDate the travel date in database.
   * @param {integer} userId user id in database.
   * @returns {array} data the data to be returned.
   */
  static async findBooking(table, travelDate, userId) {
    const data = await table.findAll({
      where: {
        [Op.and]: [
          { travelDate: { [Op.eq]: travelDate } },
          { userId: { [Op.eq]: userId } }
        ]
      }
    });
    return data;
  }

  /** finds a trip where originId and destinationId are found
   *
   * @param {object} table the table to search from
   * @param {integer} userId the origin location
   * @returns {array} data that was found
   */
  static async findTrip(table, userId) {
    const data = await table.findAll({
      where: {
        [Op.and]: [
          { userId: { [Op.eq]: userId } }
        ]
      }
    });
    return data;
  }

  /**
   *
   * @param {object} table the table to search from
   * @param {integer} userId the origin location
   * @returns {array} data that was found
   */
  static async findUserManagement(table, userId) {
    const data = await table.findAll({
      where: {
        [Op.and]: [
          { userId: { [Op.eq]: userId } }
        ]
      }
    });
    return data;
  }

  /**
    * searching a trip
    * @param {string} table users table in database.
    * @param {string} from the supported places in database.
    * @param {string} to the supported places in database.
    * @returns {array} data the data to be returned.
    */
  static async findPlace(table, from, to) {
    try {
      const origin = await table.findOne({
        where: { id: from }
      });
      const destination = await table.findOne({
        where: { id: to }
      });
      const locations = { origin, destination };
      return locations;
    } catch (error) {
      return error;
    }
  }

  /** Finds all bookings of a single user
   *@param {object} table the table to search from
   * @param {integer} tripId
   * @returns {array} the bookings that was found
   */
  static async findRequestByUser(table, tripId) {
    try {
      const requestedTrip = await table.findAll({ where: { tripId } });
      return requestedTrip;
    } catch (error) {
      return error;
    }
  }

  /** Query to find all accomodations
   *
   * @param {*} table to search into
   * @param {*} to destination of the
   * @returns { array } data found
   */
  static async findAccommodation(table, to) {
    try {
      const requestedAccomodation = await table.findAll({
        where: {
          locationId: to
        }
      });
      return requestedAccomodation;
    } catch (error) {
      return error;
    }
  }

  /** Query to find a room by id
   *
   * @param {*} table table to find from
   * @param {*} accomodationId id of the room
   * @return {*} room found
   */
  static async findRoom(table, accomodationId) {
    try {
      const requestedRoom = await table.findAll({
        where: {
          [Op.and]: [
            { id: { [Op.eq]: accomodationId } },
            { status: 'available' }
          ]
        }
      });
      return requestedRoom;
    } catch (error) {
      return error;
    }
  }
}
export default Queries;
