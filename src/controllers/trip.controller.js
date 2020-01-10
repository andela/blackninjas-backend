import faker from 'faker';
import tripService from '../services/trip.services';
import userService from '../services/user.service';
import tripRequestService from '../services/request.services';
import response from '../helpers/response.helper';
import userManagement from '../services/user.management.services';
import Paginate from '../helpers/paginate.helper';

/**
* Class for users to create trip
*/
class tripController {
  /**
   * This controller helps to know the type of trip
   * sothat it can redirect the request to a tageted controller
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return user response
   */
  static async combineTripsConctroller(req, res) {
    const body = Object.prototype.toString.call(req.body);
    if (body === '[object Array]') {
      await tripController.multiCityTripRequest(req, res);
    } else {
      await tripController.requestTrip(req, res);
    }
  }

  /**
   * user create a trip and is saved in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected field
   */
  static async requestTrip(req, res) {
    try {
      const tripid = faker.random.uuid();
      const status = 'pending';
      const { type } = req.body;

      const createdTrip = await tripService.CreateTrip(req, req.body, tripid, type);

      const { tripId } = createdTrip;

      const userId = req.user.id;


      const userManager = await userService.findUserManager(userId);
      const { managerId } = userManager[0];
      const requestData = {
        tripId, userId, managerId, status
      };
      const tripRequest = await tripService.CreateTripRequest(requestData);

      return response.successMessage(res, 'Trip created successfully', 201, tripRequest.status);
    } catch (e) {
      return response.errorMessage(
        res,
        e.message,
        500,
      );
    }
  }

  /**
   * This controller will help a user to creates multiple sity trip
   * and he or she will input multiple tips as objects inside an array.
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async multiCityTripRequest(req, res) {
    const GeneralTripId = faker.random.uuid(); const trips = []; let result;
    try {
      await Promise.all(req.body.map(async (trip) => {
        const newTrip = await tripService.CreateMultiCityTrip(req, trip, GeneralTripId, 'multi-city');
        trips.push(newTrip);
      }));
      if (trips.length > 0) {
        const manager = await userManagement.findManagerByUserId(req.user.id);
        const data = {
          userId: req.user.id, managerId: manager, tripId: GeneralTripId, status: 'panding'
        };
        result = await tripService.CreateMultiCityTripRequest(data);
      }
      if (!result) {
        return response.errorMessage(res, 'trip request has failed please try again', 500);
      }
      return response.successMessage(res, 'Trip successfully created ', 201);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /** Function to approve the trip request and return the updated trip request
   *
   * @param {object} req the request we send to the server
   * @param {object} res the response we get from the server
   * @returns {object} data updated
   */
  static async updateTripRequestStatus(req, res) {
    const { tripRequestId } = req.params;
    const { status } = req.body;
    const changedStatus = {
      status
    };
    const [, updateTripRequestStatus] = await tripRequestService.updateTripRequestStatus(changedStatus, tripRequestId);
    return response.successMessage(res, `Trip request has been ${status} successfully`, 200, ...updateTripRequestStatus);
  }

  /**
   * user will recieve all requests he/she  made and data is retrieved from the database
   * @param {Object} req The request object that contains (UserId and the page number)
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async getTripRequestsByUser(req, res) {
    const userId = req.user.id;
    const { page } = req.query;
    const limit = 10;
    const offset = Paginate(page, limit);
    const requests = await tripService.getTripRequestsByUserId(userId, limit, offset);
    if (requests.count > offset) {
      return response.successMessage(
        res,
        'My Trip Requests',
        200,
        requests
      );
    }
    return response.errorMessage(
      res,
      'No Trip Request Found',
      404
    );
  }

  /**
   * manager get trip requests made by their direct reports
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected field
   */
  static async getTripRequestsByManager(req, res) {
    try {
      const { page } = req.query;
      const managerId = req.manager.id;
      const limit = 10;
      const offset = Paginate(page, limit);
      const tripFound = await tripService.findTripRequestsByManager(managerId, limit, offset);
      if (tripFound.managerId) return response.errorMessage(res, 'No trip requests on this page', 404, 'error');

      return response.successMessage(res, 'Trips requested by your direct reports', 200, tripFound);
    } catch (e) {
      return response.errorMessage(
        res,
        e.message,
        500,
      );
    }
  }
}
export default tripController;
