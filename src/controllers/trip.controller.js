import faker from 'faker';
import tripService from '../services/trip.services';
import userService from '../services/user.service';
import response from '../helpers/response.helper';
/**
* Class for users to create trips
*/
class tripController {
/**
   * user create a trip and is saved in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
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
