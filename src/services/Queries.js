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

  /**
    * searching a trip
    * @param {string} table table users table in database.
    * @param {integer} requestUserId requestUserId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findUserRequest(table, requestUserId) {
    const data = await table.findAll({
      where: {
        userId: requestUserId
      }
    });
    return data;
  }

  /**
   * find trip function
   * @param {String} table table name
   * @param {integer} from city id
   * @param {integer} to destination city id
   * @param { date } departuredate departure date
   * @returns { Object } result
   */
  static async findUserTrip(table, from, to) {
    const data = await table.findAll({
      where: {
        originId: from,
        destinationId: to
      }
    });
    return data;
  }

  // /**
  //   * searching a trip
  //   * @param {string} table users table in database.
  //   * @param {string} supportedPlace the supported places in database.
  //   * @returns {array} data the data to be returned.
  //   */
  // static async findPlace(table, supportedPlace) {
  //   try {
  //     const place = await table.findOne({ where: { supportedPlace } });
  //     return place;
  //   } catch (error) {
  //     return error;
  //   }
  // }

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

  /**
   * find user manager
   * @param {String} table database table
   * @param {integer} user user id
   * @returns {integer} manager id
   */
  static async findManagerByUserId(table, user) {
    const data = await table.findOne({ where: { userId: user } });
    if (data) {
      return data.dataValues.managerId;
    }
    return false;
  }

  /**
 * find location
 * @param { String } table location database table
 * @param { Object } value attribute and value
 * @returns { boolean } data or false
 */
  static async findByOneAttribute(table, value) {
    const data = await table.findOne({ where: value });
    if (data) {
      return data;
    }
    return false;
  }

  /** Query to find and count all request made by a certain manager directs
   *
   * @param {*} table to search into
   * @param {*} managerId the id of the manager
   * @param {Object} limit which includes
   * @param {Object} offset number
   * @returns { array } data found
   */
  static async findTripRequestsByManager(table, managerId, limit, offset) {
    try {
      const requestedTrip = await table.findAndCountAll({
        where: {
          managerId
        },
        group: table.status,
        limit,
        offset
      });
      if (requestedTrip.count > offset) {
        return requestedTrip;
      }

      return {
        managerId
      };
    } catch (error) {
      return error;
    }
  }

  /**
   *
    * @param {string} table users table in database.
   * @param {Integer} userId the id of the user
   * @param {Integer} limit the integer that indicate the entry per page
   * @param {Integer} offset the intiger that Skip entry to go on next page
   * @returns {Object} the booking of the exact passed user id
   */
  static async findRecordById(table, userId, limit, offset) {
    try {
      const bookUser = await table.findAndCountAll({
        where: { userId }, order: [['createdAt', 'DESC']], limit, offset
      });
      return bookUser;
    } catch (error) {
      return error;
    }
  }

  /** function that gets a pending trip request from the parameter
   * @param {object} table the table to be finding that request from
   * @param {integer} requestId id of the request from the params
   * @returns {object} the found trip request
   */
  static async getTripRequestData(table, requestId) {
    try {
      const requestFound = await table.findOne({
        where: {
          [Op.and]: [
            { id: { [Op.eq]: requestId } },
          ]
        }
      });
      return requestFound;
    } catch (error) {
      return error;
    }
  }

  /** Function to find a user with a manager role
   *
   * @param {object} table table to be searching from
   * @param {integer} managerId id of the manager to be finding
   * @returns {object} data of the manager found
   */
  static async findInUserManager(table, managerId) {
    try {
      const managerData = table.findOne({
        where: {
          [Op.and]: [
            { id: { [Op.eq]: managerId } },
            { role: 'manager' }
          ]
        }
      });
      return managerData;
    } catch (error) {
      return error;
    }
  }

  /** Function to update the status to approved or reject
   *
   * @param {object} table to be updating in
   * @param {string} status status to repplacing the current one
   * @param {integer} requestId request id to be found and then replace the status
   * @returns {object} updated data
   */
  static async updateTripRequestStatus(table, status, requestId) {
    try {
      const updatedRequest = await table.update(
        status,
        { where: { id: requestId }, returning: true }
      );
      return updatedRequest;
    } catch (error) {
      return error;
    }
  }
}
export default Queries;
