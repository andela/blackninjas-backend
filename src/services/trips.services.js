import db from '../database/models';
import Queries from './Queries';

/** */
class tripsService {
/**
    * creating user query
    * @param {string} tripsRequest users table in database.
    * @returns {array} data the data to be returned.
    */
  static async CreateTripRequest(tripsRequest) {
    return Queries.create(db.requesttrip, tripsRequest);
  }

  /**
    * creating trip query
    * @param {object} req users table in database.
    * @param {Object} body it gets the data from req.body
    * @param {long} tripId it will specify which type of trip(round, one-way, multi-city)
    * @param {String} tripType it will specify which type of trip(round, one-way, multi-city)
    * @returns {array} data that was created
    */
  static async CreateTrip(req, body, tripId, tripType) {
    const data = {
      reasons: body.reasons,
      originId: body.From,
      destinationId: body.To,
      accomodationId: body.accomodationId,
      departureDate: body.departureDate,
      returnDate: '' || body.returnDate,
      userId: req.user.id,
      tripId,
      tripType
    };
    return Queries.create(db.trips, data);
  }


  /**
    * searching a trip
    * @param {date} travelDate the travel date in database.
    * @param {integer} userId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findBooking(travelDate, userId) {
    try {
      const booking = await Queries.findBooking(db.bookings, travelDate, userId);
      return booking;
    } catch (error) {
      return error;
    }
  }

  /** Searchs for trip by the origin and destination of the trip
   * @param {integer} userId the origin
   * @param {integer} travelDate the destination
   * @returns {array} trip that was found
   */
  static async findTrip(userId) {
    try {
      const trip = await Queries.findTrip(db.trips, userId);
      return trip;
    } catch (error) {
      return error;
    }
  }

  /**
   * @param {integer} userId the origin
   * @returns {array} trip that was found
   */
  static async findUserManager(userId) {
    try {
      const trip = await Queries.findTrip(db.usermanagement, userId);
      return trip;
    } catch (error) {
      return error;
    }
  }

  /**
    * searching a trip
    * @param {string} from the supported places in database.
    * @param {string} to the supported places in database.
    * @returns {array} data the data to be returned.
    */
  static async findSupportedPlaces(from, to) {
    try {
      const place = await Queries.findPlace(db.locations, from, to);
      return place;
    } catch (error) {
      return error;
    }
  }

  /** Finds all bookings of a single user
   *
   * @param {integer} tripId
   * @returns {array} the bookings that was found
   */
  static async findRequestByUser(tripId) {
    try {
      const requestedTrip = await Queries.findRequestByUser(db.requesttrip, tripId);
      return requestedTrip;
    } catch (error) {
      return error;
    }
  }

  /** Finds all accommodations
   *
   * @param {*} id id of the accommodation
   * @returns { array } the accommodations that were found
   */
  static async findAccomodation(id) {
    try {
      const requestedAccomodation = await Queries.findAccommodation(db.accomodation, id);
      return requestedAccomodation;
    } catch (error) {
      return error;
    }
  }

  /** Query to find a room by id
   *
   * @param {integer} id id of the room
   * @return {array} room found
   */
  static async findRoom(id) {
    try {
      const requestedRoom = await Queries.findRoom(db.rooms, id);
      return requestedRoom;
    } catch (error) {
      return error;
    }
  }
}

export default tripsService;
