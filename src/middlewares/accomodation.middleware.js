
import response from '../helpers/response.helper';
import UserServices from '../services/user.service';
import accommodationService from '../services/accomodation.service';
import roomService from '../services/room.services';


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
    const accomodations = await accommodationService.findAccomodationByCity(To);
    if (accomodationId !== accomodations[0].id) { return response.errorMessage(res, 'There are no available accommodations in that destination', 404); }
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
    if (!((roleId === 3) || (roleId === 6))) {
      response.errorMessage(res, 'You are not authorized to perform this action', 401, 'error');
    }
    return next();
  }

  /** This function if the rate is correct not greater five and if it is not a string
   *  @param {req} req it contains the request from the body
   *  @param {res} res it contains the response to be returned
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async checkValidAccomodationRates(req, res, next) {
    const { rate } = req.body;
    const { accommodationId } = req.params;
    if (rate >= 6) { return response.errorMessage(res, 'Rating value can not be greater than five', 401); }
    if (!/[0-9]/g.test(rate) || !/[0-9]/g.test(accommodationId)) { return response.errorMessage(res, 'Rating or accommodation id value must be integer', 401); }
    next();
  }

  /** This function if used to check if the user has booked that accommodation
   *  @param {req} req it contains the request from the body
   *  @param {res} res it contains the response to be returned
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async checkIfUserBookedThatAccomodation(req, res, next) {
    const userid = req.user.id;
    const accommodationid = req.params.accommodationId;
    const accommodationExist = await accommodationService.findIfAccomodationBooked(userid, accommodationid);
    if (!accommodationExist) { return response.errorMessage(res, 'You have not booked that accomodation', 401); }
    next();
  }

  /** Checks if the accomodation selected have facilities available and choose a room for a client
   *  @param {req} req it contains the request of the user
   *  @param {res} res it contains the response the user receive
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async checkBookingFacilitiesAvailability(req, res, next) {
    const accomodation = await accommodationService.findAccomodation(req.body.accommodationId);
    if (!accomodation) {
      return response.errorMessage(res, 'We don\'t have accommodation for an accommodationId provided.', 404);
    }
    const room = await roomService.getAvalableRoom(req.body.accommodationId, req.body.roomTypeId);
    if (accomodation.availableRooms === 0 || room === null) {
      return response.successMessage(res, 'There\'s no rooms available for accommodation facility provided.', 404);
    }
    req.body.roomId = room.id;
    next();
  }

  /** Chech if departure date greater than checkout date
   *  @param {req} req it contains the request of the user
   *  @param {res} res it contains the response the user receive
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async validateDates(req, res, next) {
    const departureDate = new Date(req.body.departureDate);
    const checkoutDate = new Date(req.body.checkoutDate);
    if (checkoutDate <= departureDate) {
      return response.errorMessage(res, 'The departure date cannot be later than the return date', 400);
    }
    req.body.departureDate = departureDate;
    req.body.checkoutDate = checkoutDate;
    next();
  }

  /** This function if the the accommodation id provided is in our database
   *  @param {req} req it contains the request from the body
   *  @param {res} res it contains the response to be returned
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async checkIfAccommodationIdExist(req, res, next) {
    const { accommodationId } = req.params;
    const accomodations = await accommodationService.checkAccommodationById(accommodationId);
    if (!accomodations[0]) { return response.errorMessage(res, 'This accommodation does not exist', 401); }
    next();
  }
}
export default AccomodationMiddleware;
