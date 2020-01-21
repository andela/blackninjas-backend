import db from '../database/models';
import Queries from './Queries';

/** trip service */
class TripService {
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

  /** Finds all bookings of a single user
  * @param {String} table table name
   * @param {integer} tripId
   * @returns {array} the bookings that was found
   */
  static async findRequestByID(table, tripId) {
    try {
      const requestedTrip = await Queries.findAllRecord(table, tripId);
      return requestedTrip;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method will provide a service of inserting
   * a trip data in database
   * @param {Object} req request from user
   * @param {Object} body data posted by user
   * @param { integer } tripId trip id as integer
   * @param {Object} tripType type of trip
   * @returns { Object } response data
   */
  static async CreateMultiCityTrip(req, body, tripId, tripType) {
    const data = {
      tripId,
      originId: body.From,
      reason: body.reason,
      destinationId: body.To,
      departureDate: body.departureDate,
      accomodationId: body.accomodationId,
      tripType,
      leavingDays: body.leavingDays,
      userId: req.user.id
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
   *
   * @param {Integer} userId the id of the user
   * @returns {Object} the booking of the exact passed user id
   */
  static async findBookingByUser(userId) {
    try {
      const bookUser = await Queries.findAccommodation(db.trips, userId);
      return bookUser;
    } catch (error) {
      return error;
    }
  }

  /**
    * This method will provide a service of inserting
    * a trip request in database
    * @param {Object} data posted by user
    * @returns { Object } response data
    */
  static async CreateMultiCityTripRequest(data) {
    return Queries.create(db.requesttrip, data);
  }

  /**
    * searching a trip
    * @param {integer} userId user id in database.
    * @returns {array} data the data to be returned.
    */
  static async findUserRequest(userId) {
    try {
      const request = await Queries.findAllRecord(db.requesttrips, { userId });
      if (request.dataValues) return request;
    } catch (error) {
      return error;
    }
  }

  /**
    * searching a trip that is created by a given user in a given period of time
    * @param {object} userId id of the user who created trips.
    * @param {object} searchDate date to get the trips that was created since this date.
    * @returns {array} data the data to be returned.
    */
  static async findTripsCreatedByuser(userId, searchDate) {
    try {
      const foundTrips = await db.sequelize.query(
        `SELECT trips."tripType", count(DISTINCT trips."tripId") from trips where trips."userId" = ${userId} and trips."createdAt" < '${searchDate}' GROUP BY trips."tripType"`,
        { type: db.sequelize.QueryTypes.SELECT }
      );
      return foundTrips;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param {Integer} userId the id of the user
   * @returns {Object} the booking of the exact passed user id
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
    * find trip services
    * @param {Object} res user response
    * @param {Object} from from origin
    * @param {Object} to user response
    * @returns { Object} user response
    */
  static async findUserTrip(res, from, to) {
    try {
      const trip = await Queries.findUserTrip(db.trips, from, to);
      if (!trip) {
        return false;
      }
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

  /**
    * find trip services
    * @param {Object} tripId trip id
    * @returns { Object} user response
    */
  static async getTripByTripId(tripId) {
    try {
      const trip = await Queries.getTripByTripId(db.trips, tripId);
      if (!trip) {
        return false;
      }

      return trip;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param {Integer} managerId the id of the manager
   * @param {Object} limit which includes
   * @param {Object} offset number
   * @returns {Object} the booking of the exact passed user id
   */
  static async findTripRequestsById(managerId, limit, offset) {
    try {
      const bookUser = await Queries.paginationSearch(db.requesttrip, { managerId }, limit, offset);
      return bookUser;
    } catch (error) {
      return error;
    }
  }

  /**
   * This method search trip reqest by trip id
   * @param { Integer } tripID the tripID
   * @returns { Object } trip request data
   */
  static async searchTripRequestByTripId(tripID) {
    const tripRequest = await Queries.findOneRecord(db.requesttrip, { tripId: tripID });
    if (tripRequest !== 0) return tripRequest;
    return null;
  }

  /**
   * This service get a spacific trip request data
   * @param {Object} tripId tripID
   * @returns {Object} user response
   */
  static async getTripRequest(tripId) {
    const trips = await Queries.findAllRecord(db.trips, { tripId });
    const tripRequest = await Queries.findOneRecord(db.requesttrip, { tripId });
    if (tripRequest) {
      return {
        tripRequest,
        trips
      };
    }

    return false;
  }

  /**
    * find trip services
    * @param {Object} tripId trip id
    * @returns { Object} user response
    */
  static async getTripRequestByTripId(tripId) {
    try {
      const trip = await Queries.getTripByTripId(db.requesttrip, tripId);


      if (!trip) {
        return false;
      }
      return trip;
    } catch (error) {
      return error;
    }
  }

  /** Function to update the trip which has the status of approved or reject
   *
   * @param {string} tripId the id of the selected trip
   * @param {Object} body it gets the data from req.body
   * @returns {object} updated data
   */
  static async updateTrip(tripId, body) {
    const data = {
      reason: body.reason,
      originId: body.From,
      destinationId: body.To,
      accomodationId: body.accomodationId,
      departureDate: body.departureDate,
      returnDate: '' || body.returnDate,
      tripType: body.type
    };
    const updatedRequest = Queries.updateTrip(db.trips, tripId, data);
    return updatedRequest;
  }
}

export default TripService;
