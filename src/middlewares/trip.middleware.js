import moment from 'moment';
import response from '../helpers/response.helper';
import tripService from '../services/trip.services';
import tripHelper from '../helpers/trip.helper';
import multyCity from '../helpers/joi.validate';
import accomodationHelper from '../helpers/accomodation.helper';
import db from '../database/models';


/**
* Class for users to create trips
*/
class TripMiddleware {
/**
 * this functions checks if the trip requested is already created
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} returned
 */
  static async checkTripExist(req, res, next) {
    const bodyData = Object.prototype.toString.call(req.body);
    if (bodyData === '[object Array]') return next();
    const { departureDate } = req.body;
    const userId = req.user.id;
    const trip = await tripService.findTrip(userId);
    const foundTrip = trip.filter((trips) => departureDate === moment(trips.departureDate).format('YYYY-MM-DD'));
    if (trip.length === 0 || foundTrip.length === 0) return next();
    const requestUser = await tripService.findRequestByID(db.requesttrip, { tripId: foundTrip[0].tripId });
    if (requestUser[0]) {
      return response.errorMessage(res, 'this trip has been already created', 409);
    }
    return next();
  }

  /** checks if the date is valid if the travel date is not later in the future than the return date
   * @param {Object} req request
   * @param {Object} res response
   * @param {Object} next jumps to the next middleware on the chain
   * @returns {Object} object
   */
  static async checkIfDateisValid(req, res, next) {
    const { departureDate, returnDate, type } = req.body;
    const bodyData = Object.prototype.toString.call(req.body);
    if (bodyData === '[object Array]' || type !== 'round trip') return next();
    const travel = new Date(departureDate);
    const returDate = new Date(returnDate);
    if (travel > returDate) {
      return response.errorMessage(res, 'the departure date cannot be later than the return date', 400);
    }
    return next();
  }

  /** check if the locations are stored in the database
   *  check if the origin is not the same as the destination
   *  @param {req} req it contains the request of the user
   *  @param {res} res it contains the response the user receive
   *  @param {function} next it jumps to the next middleware in the route
   *  @return {object} the data from the first middleware
   */
  static async checkLocations(req, res, next) {
    const bodyData = Object.prototype.toString.call(req.body);
    if (bodyData === '[object Array]') return next();
    const { From, To } = req.body;
    const findPlace = await tripService.findSupportedPlaces(From, To);
    if (From === To) return response.errorMessage(res, 'you cannot create  that trip', 403);
    if (findPlace.origin === null) return response.errorMessage(res, 'barefoot nomad does not have an office in that origin', 404);
    if (findPlace.destination === null) return response.errorMessage(res, 'barefoot nomad does not have an office in your destination', 404);
    next();
  }

  /**
   * validate multcities inputed by user
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next next to the middleware chain
   * @returns { Object} return user response
   */
  static async multiCityDataValidation(req, res, next) {
    const bodyData = Object.prototype.toString.call(req.body);
    if (bodyData !== '[object Array]') return next();
    if (req.body.length <= 1) {
      req.errorMessage = 'Multi city can not go below two cities kindly use one way or round trip';
      req.errorStatus = 401;
    }
    await Promise.all(req.body.map(async (trip, index) => {
      const { error } = multyCity.validate(trip);
      if (error) {
        req.errorMessage = `${error.details[0].message} kindly check trip number ${index + 1}`;
        req.errorStatus = 401;
      } else {
        await accomodationHelper.checkAccomodationAvailability(req);
        await tripHelper.checkLocationExistance(req);
        const { firstTravelDate, secondTravelDate } = tripHelper.extractDaysInDate(req);
        tripHelper.validateTripPattern(req, firstTravelDate, secondTravelDate);
        if (req.route.stack[0].method !== 'patch') {
          await tripHelper.checkTripExistence(req, res);
        }
      }
    }));

    if (req.errorMessage) {
      return response.errorMessage(res, req.errorMessage, req.errorStatus, 'error');
    }

    return next();
  }

  /**
   * this function is used to check status of the trip so that it can be edited
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next next to the middleware chain
   * @returns { Object} return user response
   */
  static async checkTripRequestStatus(req, res, next) {
    const { tripId } = req.params;
    const tripRequest = await tripService.getTripRequestByTripId(tripId);

    const { status } = tripRequest[0];
    if (status === 'approved') {
      return response.errorMessage(res, 'trip request is closed,you can not edit it. ', 401);
    }
    req.tripRequest = tripRequest;
    return next();
  }
}
export default TripMiddleware;
