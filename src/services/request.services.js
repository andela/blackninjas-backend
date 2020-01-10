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
}

export default TripRequestService;
