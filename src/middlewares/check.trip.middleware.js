import moment from 'moment';
import response from '../helpers/response.helper';
import tripsService from '../services/trips.services';
import db from '../database/models';

/**
* Class for users to create trips
*/
class checkTripExist {
/**
 * @param {Object} req req
 * @param {Object} res res
 * @param {Object} next ment
 * @returns {Object} hghfgjh
 */
  static async checkTrip(req, res, next) {
    const { departureDate } = req.body;
    const userId = req.user.id;
    const trip = await tripsService.findTrip(userId);
    const foundTrip = trip.filter((trips) => departureDate === moment(trips.departureDate).format('YYYY-MM-DD'));
    if (trip.length === 0 || foundTrip.length === 0) return next();


    const data = {
      tripId: foundTrip[0].tripId
    };
    const requestUser = await tripsService.findAccomodation(db.requesttrip, data);

    if (requestUser[0]) {
      return response.errorMessage(res, 'this trip has been booked already', 409);
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
    const { departureDate, returnDate } = req.body;
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
    const { From, To } = req.body;
    const findPlace = await tripsService.findSupportedPlaces(From, To);
    if (From === To) return response.errorMessage(res, 'you cannot book that trip', 403);
    if (findPlace.origin === null) return response.errorMessage(res, 'barefoot nomad does not have an office in that origin', 404);
    if (findPlace.destination === null) return response.errorMessage(res, 'barefoot nomad does not have an office in your destination', 404);
    next();
  }

  /** checks if the accomodation selected are in the same location as the destination of the user
   *  @param {req} req it contains the request of the user
   *  @param {res} res it contains the response the user receive
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async checkValidAccommodation(req, res, next) {
    const { To } = req.body;
    const { accomodationId } = req.room;

    const findAccomodation = await tripsService.findAccomodation(db.accomodation, accomodationId);


    const isAccomodation = findAccomodation.map((accomodation) => accomodation.locationId === To || accomodation.category === 'family');
    if (!isAccomodation[0]) return response.errorMessage(res, 'we do not have available accommodations in that destination', 404);
    next();
  }

  /** Function to check available rooms
   * @param {object} req request from the user
   * @param {object} res response the user receive
   * @param {Function} next calls the next middleware in the route
   * @returns {array} room found and save it in the request
   */
  static async checkAvailableRooms(req, res, next) {
    const { accomodationId } = req.body;
    const foundRoom = await tripsService.findRoom(accomodationId);
    // console.log(foundRoom);
    if (!foundRoom[0]) return response.errorMessage(res, 'This room is booked', 403);
    [req.room] = foundRoom;
    next();
  }

  /** Function to check available rooms
   * @param {object} req request from the user
   * @param {object} res response the user receive
   * @param {Function} next calls the next middleware in the route
   * @returns {array} room found and save it in the request
   */
  static async checkTripType(req, res, next) {
    const { returnDate } = req.body;
    let tripType;

    if (returnDate !== undefined) {
      tripType = 'round trip';
    } else {
      tripType = 'one way trip';
    }
    req.tripType = tripType;
    next();
  }
}
export default checkTripExist;
