import { Op } from 'sequelize';
import db from '../database/models';
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

  /**
    * searching a trip
    * @param {string} table table users table in database.
    * @param {integer} userId requestUserId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findAllRecord(table, userId) {
    const data = await table.findAll({ where: userId });
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
            { id: { [Op.eq]: accomodationId } }, { status: 'available' }
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
  static async findOneRecord(table, value) {
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
  static async paginationSearch(table, managerId, limit, offset) {
    try {
      const requestedTrip = await table.findAndCountAll({
        where:
          managerId,
        group: table.status,
        order: [
          ['createdAt', 'DESC']
        ],
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

  /** function that gets all trips that a user created in a given time
   * @param {object} table the table to be finding that request from
   * @param {integer} userId id of the request from the params
   * @param {date} searchDate the date the user searches from
   * @returns {object} the found trip request
   */
  static async getTripCreatedByUser(table, userId, searchDate) {
    try {
      const tripFound = await table.findAll({
        distinct: 'tripId',
        where: { [Op.and]: [{ userId: { [Op.eq]: userId } }, db.sequelize.where(db.sequelize.fn('date', db.sequelize.col('createdAt')), '<=', `${searchDate}`)] }
      });
      return tripFound;
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

  /**
    * This servise delete a trip request comment
    * @param {String} table table
    * @param {Object} value subject id and accoment id
    * @returns { Object } user response as object
    */
  static async deleteComment(table, value) {
    const result = await table.destroy({ where: value });
    if (result) {
      return result;
    }

    return false;
  }

  /**
 * find or create query
 * @param {string} table users table in database.
 * @param {string} data the data to be inputed in database.
 * @param {string} condition to prevent the same data in database.
 * @returns {array} data the data to be returned.
 */
  static async findOrCreate(table, data, condition) {
    try {
      const datas = await table.findOrCreate({
        where: condition,
        defaults: data
      });
      return datas[0];
    } catch (error) {
      return error;
    }
  }

  /**
   * find trip function
   * @param {String} table table name
   * @param {Object} tripId trip id
   * @returns { Object } result
   */
  static async getTripByTripId(table, tripId) {
    const data = await table.findAll({
      where: {
        tripId,
      }
    });
    return data;
  }

  /**
   *
   * Function to update the status to approved or reject
   * @param {String} table the name of the table to updated
   * @param {string} tripId the id of the selected trip
   * @param {Object} data it gets the data from req.body
   * @returns {object} updated data
   */
  static async updateTrip(table, tripId, data) {
    try {
      const updatedRequest = await table.update(
        data,
        { where: { id: tripId } }
      );
      return updatedRequest;
    } catch (error) {
      return error;
    }
  }

  /** Function to update the status to approved or reject
   *
   * @param {object} table to be updating in
   * @param {integer} id trip id to be found and then replace the status
   * @returns {object} updated data
   */
  static async updateTripRequestStatusById(table, id) {
    try {
      const updatedRequest = await table.update(
        { status: 'pending' },
        { where: { id } }
      );
      return updatedRequest;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * This method will be used to delete a certain request in multicity when the request of the user decreased
   * @param {String} table the name of the table to updated
   * @param {string} tripId the id of the selected trip
   * @param {Object} data it gets the data from req.body
   * @returns {object} updated data
   */
  static async deleteMultiCityTripRequestByTripId(table, tripId) {
    try {
      const updatedRequest = await table.destroy({ where: { id: tripId } });
      return updatedRequest;
    } catch (error) {
      return error;
    }
  }

  /** Function to find if the user booked that specific accommodation
   *
   * @param {object} table table to be searching from
   * @param {Object} userid user id
   * @param {Object} accommodationid accomodation id
   * @returns {object} data of the accommodation found that corresponds to that user id and accomodation id
   */
  static async findIfAccomodationBooked(table, userid, accommodationid) {
    try {
      const tripData = table.findOne({
        where: {
          [Op.and]: [
            { userid: { [Op.eq]: userid } },
            { accommodationid: { [Op.eq]: accommodationid } }
          ]
        }
      });
      return tripData;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * This method will be used to get all messages between a sender and receiver upon login
   * @param {String} table the name of the table to updated
   * @param {integer} senderId the id of the user who sent the message
   * @param {integer} receiverId the id of the connected user
   * @returns {object} messages retrieved
   */
  static async getPrivateMessage(table, senderId, receiverId) {
    try {
      const privateMessages = await table.findAll({
        where: {
          [Op.or]: [
            {
              [Op.and]: [{ senderId },
                { receiverId }]
            }, {
              [Op.and]: [{ senderId: receiverId },
                { receiverId: senderId }]
            }
          ]
        }
      });
      return privateMessages;
    } catch (error) {
      return error;
    }
  }

  /**
 * checking if the accommodation exist
 * @param {object} table table to be searching from
 * @param {string} accomodationId rate data.
 * @returns {array} data the data to be returned.
 */
  static async checkAccommodationById(table, accomodationId) {
    const data = await table.findAll({
      where: {
        id: accomodationId
      }
    });
    return data;
  }

  /**
 * checking if the accommodation exist
 * @param {object} table table to be searching from
 * @param {string} accommodationId rate data.
 * @returns {array} data the data to be returned.
 */
  static async getRatedAccommodations(table, accommodationId) {
    const data = await table.findAll({
      where: {
        accommodationId
      }
    });
    return data;
  }

  /**
 * updating average rate in accommodation
 * @param {object} table table to be searching from
 * @param {integer} accomodationId accommodation id
 * @param {integer} averageRate the rate average
 * @returns {array} data the data to be returned.
 */
  static async updateAverageRate(table, accomodationId, averageRate) {
    try {
      const updatedRate = await table.update(
        { averageRate },
        { where: { id: accomodationId } }
      );
      return updatedRate;
    } catch (error) {
      return error;
    }
  }

  /**
 * updating rating
 * @param {object} table table to be searching from
 * @param {integer} accomodationId accommodation id
 * @param {Object} userId user id
 * @param {integer} rate rating value
 * @returns {array} data the data to be returned.
 */
  static async updateAccomodationRate(table, accomodationId, userId, rate) {
    try {
      const updatedRate = await table.update(
        { rate },
        {
          where: {
            [Op.and]: [
              { userId: { [Op.eq]: userId } },
              { accomodationId: { [Op.eq]: accomodationId } }
            ]
          }
        }
      );
      return updatedRate;
    } catch (error) {
      return error;
    }
  }

  /** Function to find updated rating
   *
   * @param {object} table table to be searching from
   * @param {Object} accommodationId accomodation id
   * @param {Object} userId user id
   * @returns {object} data of the trip found that corresponds to that user and accomodation id
   */
  static async getAccommodationRate(table, accommodationId, userId) {
    try {
      const updatedRate = table.findOne({
        where: {
          [Op.and]: [
            { userId: { [Op.eq]: userId } },
            { accommodationId: { [Op.eq]: accommodationId } }
          ]
        }
      });
      return updatedRate;
    } catch (error) {
      return error;
    }
  }

  /**
 * Get average accommodation using accommodation id
 * @param {object} table table to be searching from
 * @param {integer} accomodationId accommodation id
 * @returns {array} data the data to be returned.
 */
  static async getAverageRatings(table, accomodationId) {
    try {
      const averageRate = await table.findAll({ where: { id: accomodationId } });
      return averageRate;
    } catch (error) {
      return error;
    }
  }

  /** Query to find and count all request made by a certain manager directs
   *
   * @param {*} table to search into
   * @param {Object} where which includes
   * @param {Object} limit which includes
   * @param {Object} offset number
   * @returns { array } data found
   */
  static async commentsPaginationSearch(table, where, limit, offset) {
    try {
      const comments = await table.findAndCountAll({
        where,
        include: [{
          model: db.user,
          attributes: ['firstName', 'lastName', 'email', 'profileImage']
        }],
        order: [
          ['createdAt', 'DESC']
        ],
        limit,
        offset
      });
      return comments;
    } catch (error) {
      return error;
    }
  }
}
export default Queries;
