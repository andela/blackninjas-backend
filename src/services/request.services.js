import db from '../database/models';
import Queries from './Queries';

/** class to implement request service functionalities
 *
 */
class TripRequestService {
  /** function that gets a pending trip request from the parameter
   * @param {integer} requestId id of the request from the params
   * @returns {object} the found trip request
   */
  static async getTripRequestData(requestId) {
    const requestFound = await Queries.getTripRequestData(db.requesttrip, requestId);
    return requestFound;
  }

  /** Function to update the status to approved or reject
   *
   * @param {string} status status to replacing the current one
   * @param {integer} requestId request id to be found and then replace the status
   * @returns {object} updated data
   */
  static async updateTripRequestStatus(status, requestId) {
    const updatedRequest = Queries.updateTripRequestStatus(db.requesttrip, status, requestId);
    return updatedRequest;
  }

  /** Function to search according to what the user is typing
   * @param {integer} id the id of the logged in user
   * @param {string} queryString the query passed in the query params
   * @param {integer} limit the limit of the data retrieved
   * @param {integer} offset the offset to know how to divide pages
   * @returns {object} found data
   */
  static async search(id, queryString, limit, offset) {
    try {
      const foundRecords = db.sequelize.query(
        `SELECT users."firstName", users."lastName", lo.city as origin, lc.city as destination, trips."departureDate", trips."returnDate", ac.name, req.status
        FROM users inner join trips on users.id = trips."userId" inner join locations lo on lo.id = trips."originId" inner join locations lc on lc.id = trips."destinationId" 
        inner join accomodation ac on ac.id = trips."accomodationId" inner join requesttrips req on req."tripId" = trips."tripId"
        WHERE (users."firstName" ilike '%${queryString}%' or users."lastName" ilike '%${queryString}%' or lo.city ilike '%${queryString}%' or lc.city ilike '%${queryString}%' or ac.name ilike '%${queryString}%' or req.status ilike '%${queryString}%'
        or CAST(trips."departureDate" AS  varchar) like '%${queryString}%' or cast(trips."returnDate" as varchar) like '%${queryString}%') and (req."userId"= ${id} or req."managerId" = ${id}) ORDER BY trips."createdAt" DESC limit ${limit} offset ${offset}`,
        { type: db.sequelize.QueryTypes.SELECT }
      );
      return foundRecords;
    } catch (error) {
      return error.message;
    }
  }


  /**
   * This method will be user to delete the selected trip in multi city
* a trip data in database
   * @param { integer } tripId trip id as integer
   * @param {Object} tripType type of trip
   * @returns { Object } response data
   */
  static async deleteMultiCityTripRequestByTripId(tripId) {
    return Queries.deleteMultiCityTripRequestByTripId(db.trips, tripId);
  }

  /**
    * find trip services
    * @param {Object} tripId trip id
    * @returns { Object} user response
    */
  static async getTripRequestByTripId(tripId) {
    try {
      const trip = await Queries.getTripRequestByTripId(db.trips, tripId);


      if (!trip) {
        return false;
      }
      return trip;
    } catch (error) {
      return error;
    }
  }

  /** Function to update the status to approved or reject
   *
   * @param {string} id the id of the selected trip
   * @returns {object} updated data
   */
  static async updateTripRequestStatusById(id) {
    const updatedRequest = Queries.updateTripRequestStatusById(db.requesttrip, id);
    return updatedRequest;
  }
}

export default TripRequestService;
