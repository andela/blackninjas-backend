import db from '../database/models';
import Queries from './Queries';

/** class to implement request service functionalities
 *
 */
class RequestService {
  /** function that gets a pending trip request from the parameter
   * @param {integer} requestId id of the request from the params
   * @returns {object} the found trip request
   */
  static async getRequestData(requestId) {
    const requestFound = await Queries.getRequestData(db.requesttrip, requestId);
    return requestFound;
  }

  /** Function to update the status to approved or reject
   *
   * @param {string} status status to repplacing the current one
   * @param {integer} requestId request id to be found and then replace the status
   * @returns {object} updated data
   */
  static async updateRequestStatus(status, requestId) {
    const updatedRequest = Queries.updateRequestStatus(db.requesttrip, status, requestId);
    return updatedRequest;
  }
}

export default RequestService;
