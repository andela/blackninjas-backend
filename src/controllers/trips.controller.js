import faker from 'faker';
import tripsService from '../services/trips.services';
import response from '../helpers/response.helper';
/**
* Class for users to create trips
*/
class tripsController {
/**
   * user creates one way trip and is saved in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async tripRequest(req, res) {
    try {
      const tripid = faker.random.uuid();
      const status = 'pending';
      const createdTrip = await tripsService.CreateTrip(req, req.body, tripid, req.tripType);
      const { tripId } = createdTrip;

      const userId = req.user.id;


      const userManager = await tripsService.findUserManager(userId);
      const { managerId } = userManager[0];
      const requestData = {
        tripId, userId, managerId, status
      };
      const tripRequest = await tripsService.CreateTripRequest(requestData);

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

export default tripsController;
