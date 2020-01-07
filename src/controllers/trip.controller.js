import faker from 'faker';
import tripService from '../services/trip.services';
import userService from '../services/user.service';
import response from '../helpers/response.helper';
/**
* Class for users to create trips
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
}

export default tripController;
