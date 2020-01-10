import response from '../helpers/response.helper';
import requestService from '../services/request.services';
import userService from '../services/user.service';

/** class to implement request service functionalities
 *
 */
class TripRequestMiddleware {
  /** function that checks if the user logged in is a manager
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfUserIsManager(req, res, next) {
    const managerId = req.user.id;
    const userData = await userService.findInUserManager(managerId);
    if (!userData) return response.errorMessage(res, 'You are not a manager, please consult your administrator for roles', 403);
    return next();
  }

  /** function that checks if the request passed in the params exists and is pending
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfRequestFound(req, res, next) {
    const requestid = req.params.tripRequestId;
    const requestFound = await requestService.getTripRequestData(requestid);
    if (!requestFound) return response.errorMessage(res, 'Trip request not found', 404);
    req.tripRequest = requestFound;
    return next();
  }

  /** function that checks if the user logged is the manager of the user who requested the trip
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfUsersManager(req, res, next) {
    const { id } = req.user; // logged in user
    const { managerId } = req.tripRequest;
    if (id !== managerId) return response.errorMessage(res, 'You are not authorized to perform this operation', 403);
    return next();
  }

  /** function that checks if the request trip is already approved or rejected
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfAlreadyChanged(req, res, next) {
    const { status } = req.body;
    if (req.tripRequest.status === status) return response.errorMessage(res, `You have already ${status} this trip request`, 409);
    return next();
  }

  /** function that checks if the user logged is the manager of the user who requested the trip
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @param {function} next calls the next middleware in the route
   * @returns {function} next calls the next middleware in the route
   */
  static async checkIfBodyIsValid(req, res, next) {
    const validStatuses = ['approved', 'rejected'];
    const { status } = req.body;
    if (!status) return response.errorMessage(res, 'Bad request, it should be status!', 400);
    if (!validStatuses.includes(status)) return response.errorMessage(res, 'The status can only be approved or rejected', 400);
    return next();
  }
}
export default TripRequestMiddleware;
