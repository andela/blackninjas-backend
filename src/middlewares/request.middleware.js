import response from '../helpers/response.helper';
import requestService from '../services/request.services';
import userService from '../services/user.service';

/** class to implement request service functionalities
 *
 */
class RequestMiddleware {
  /** function that checks if the user logged in is a manager
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfManager(req, res, next) {
    const managerId = req.user.id;
    const userData = await userService.findUserManager(managerId);
    if (!userData) response.errorMessage(res, 'You are not a manager, please consult your administrator for roles', 403);
    next();
  }

  /** function that checks if the request passed in the params exists and is pending
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfRequestFound(req, res, next) {
    const { requestId } = req.params;
    const requestFound = await requestService.getRequestData(requestId);
    if (!requestFound) return response.errorMessage(res, 'Trip request not found', 404);
    req.tripRequest = requestFound;
    next();
  }

  /** function that checks if the user logged is the manager of the user who requested the trip
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfUserManager(req, res, next) {
    const { id } = req.user; // logged in user
    const { managerId } = req.tripRequest;
    if (id !== managerId) return response.errorMessage(res, 'You are not the manager of this trip request', 403);
    next();
  }
}
export default RequestMiddleware;
