import faker from 'faker';
import tripsService from '../services/trips.services';
import userService from '../services/user.service';
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
  static async oneWayTrip(req, res) {
    try {
      const status = 'pending';
      const {
        From,
        To,
        reasons,
        accomodation,
        travelDate
      } = req.body;
      const user = await userService.findUserByEmail(req.user.email);
      const userId = user.id;
      const data = {
        status
      };


      const tripsRequestData = {
        From, To, reasons, accomodation, travelDate, status, userId
      };
      tripsService.CreateTrip(tripsRequestData);
      response.successMessage(
        res,
        'trip request made successfully',
        201,
        data
      );
    } catch (e) {
      return response.errorMessage(
        res,
        e.message,
        500,
      );
    }
  }

  /**
   * user creates a round trip and data is saved in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async returnTripController(req, res) {
    try {
      const tripId = faker.random.uuid();
      const createdTrip = await tripsService.CreateTrip(req, req.body, tripId, 'return trip');
      const userManager = await tripsService.findUserManager(createdTrip.userId);
      const userdata = {
        userId: createdTrip.userId,
        managerId: userManager[0].managerId,
        tripId,
        status: 'pending'
      };
      await tripsService.CreateTripRequest(userdata);
      return response.successMessage(res, 'Trip created successfully', 201, { status: userdata.status });
    } catch (error) {
      return response.errorMessage(
        res,
        error.message,
        500,
      );
    }
  }
}

export default tripsController;
