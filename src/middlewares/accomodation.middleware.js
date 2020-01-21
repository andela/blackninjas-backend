import response from '../helpers/response.helper';
import tripServicres from '../services/trip.services';
import db from '../database/models';
import UserServices from '../services/user.service';

/**
* Class for users to create trips
*/
class AccomodationMiddleware {
  /** checks if the accomodation selected are in the same location as the destination of the user
   *  @param {req} req it contains the request of the user
   *  @param {res} res it contains the response the user receive
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async findAccommodationByCity(req, res, next) {
    const bodyData = Object.prototype.toString.call(req.body);
    if (bodyData === '[object Array]') return next();
    const { To, accomodationCategory, accomodationId } = req.body;
    if (accomodationCategory) return next();
    const accomodations = await tripServicres.findRequestByID(db.accomodation, { locationId: To });
    if (accomodationId !== accomodations[0].id) return response.errorMessage(res, 'There are no available accommodations in that destination', 404);
    next();
  }

  /**
 *
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} hghfgjh
 */
  static async verifyTravelAdminAndSupplier(req, res, next) {
    const user = await UserServices.findUserByEmail(req.user.email);
    const role = user.role.toLowerCase();
    const supportedRole = await UserServices.getRole(role);
    const roleId = supportedRole.dataValues.id;
    if (!(roleId === 3)) {
      response.errorMessage(res, 'You are not authorized to perform this action', 401, 'error');
    }
    return next();
  }
}
export default AccomodationMiddleware;
