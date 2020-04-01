import faker from 'faker';
import { config } from 'dotenv';
import tripService from '../services/trip.services';
import userService from '../services/user.service';
import tripRequestService from '../services/request.services';
import response from '../helpers/response.helper';
import userManagement from '../services/user-management.services';
import Paginate from '../helpers/paginate.helper';
import NotificationService from '../services/notification.service';
import commentService from '../services/comment.service';
import tripHelper from '../helpers/trip.helper';
import AccomodationServises from '../services/accomodation.service';
import managerToken from '../helpers/createManagerToken';
import db from '../database/models';

config();

/**
* Class for users to create trip
*/
class TripController {
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
      await TripController.multiCityTripRequest(req, res);
    } else {
      await TripController.requestTrip(req, res);
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
      const token = await managerToken(managerId);
      await NotificationService.sendNotification('trip_request_event', managerId, `New ${type} trip request.`, `${req.user.firstName} has requested a new ${type}`, tripRequest.id, `${process.env.BASE_URL_REACT}/trips/${tripId}/${token}`, tripId);
      return response.successMessage(res, 'Trip created successfully', 201, createdTrip);
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
    let manager = '';
    try {
      await Promise.all(req.body.map(async (trip) => {
        const newTrip = await tripService.CreateMultiCityTrip(req, trip, GeneralTripId, 'multi-city');
        trips.push(newTrip);
      }));
      if (trips.length > 0) {
        manager = await userManagement.findManagerByUserId(req.user.id);
        const data = {
          userId: req.user.id, managerId: manager, tripId: GeneralTripId, status: 'pending'
        };
        result = await tripService.CreateMultiCityTripRequest(data);
      }
      if (!result) {
        return response.errorMessage(res, 'trip request has failed please try again', 500);
      }
      const createdtrip = await tripService.getTripByTripId(GeneralTripId);
      const token = await managerToken(manager);
      await NotificationService.sendNotification('trip_request_event', manager, 'New multi-city trip request.', `${req.user.firstName} has requested a new multi-city trip`, createdtrip[0].dataValues.id, `${process.env.BASE_URL_REACT}/trips/${GeneralTripId}/${token}`, GeneralTripId);
      return response.successMessage(res, 'Trip successfully created ', 201, createdtrip);
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
    const changedStatus = { status };
    const [, updateTripRequestStatus] = await tripRequestService.updateTripRequestStatus(changedStatus, tripRequestId);
    const token = managerToken(updateTripRequestStatus[0].managerId);
    await NotificationService.sendNotification('approve-or-reject-trip_request_event', updateTripRequestStatus[0].userId, `New ${status} request trip`, `Your manager has ${status} your trip request`, updateTripRequestStatus[0].id, `${process.env.BASE_URL_REACT}/trips/${tripRequestId}/${token}`, tripRequestId);
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
    const limit = req.query.limit || 10;
    const offset = Paginate(page, limit);
    const requests = await tripService.findTripRequestsById(userId, limit, offset);
    const manager = await tripRequestService.getUserById({ id: requests.rows[0].dataValues.managerId });
    const user = await tripRequestService.getUserById({ id: requests.rows[0].dataValues.userId });
    const requestTrips = await tripRequestService.getTripRequestsOfUser(requests, manager, user);
    return response.successMessage(res, 'My Trip Requests', 200, requestTrips);
  }

  /**
   * user will recieve all requests he/she  made and data is retrieved from the database
   * @param {Object} req The request object that contains (UserId and the page number)
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async getTripRequestsByManager(req, res) {
    const managerId = req.user.id;
    const { page } = req.query;
    const limit = req.query.limit || 10;
    const offset = Paginate(page, limit);
    const requests = await tripService.findTripRequestsByManagerID(managerId, limit, offset);
    const manager = await tripRequestService.getUserById({ id: requests.rows[0].dataValues.managerId });
    const user = await tripRequestService.getUserById({ id: requests.rows[0].dataValues.userId });
    const requestTrips = await tripRequestService.getTripRequestsOfUser(requests, manager, user);
    return response.successMessage(res, 'Trips requested by your direct reports', 200, requestTrips);
  }

  /**
     * This method create a comment
     * @param {Object} req request data
     * @param {Object} res response data
     * @returns { Object} return a user message
     */
  static async createComment(req, res) {
    const subjectType = 'trip request';
    const data = await commentService.createComment(req, res, subjectType);
    const Id = req.params.subjectID;
    const tripRequest = await tripService.findRequestByID(db.requesttrip, { tripId: Id });
    const tripRequestData = tripRequest[0].dataValues;
    const receiver = (req.user.dataValues.id === tripRequestData.managerId) ? tripRequestData.userId : tripRequestData.managerId;
    await NotificationService.sendNotification('trip_request_comment_event', receiver, 'New Comment', `${req.user.firstName} has posted a new comment`, data.dataValues.id, `${process.env.BASE_URL_REACT}/trips/${Id}/comments?page=1`, Id);
    return response.successMessage(res, 'comment created successfuly', 201, data);
  }

  /**
     *
     * This method will help to view all
     * comments
     * @param {Object} req user request data
     * @param {Object} res user response data
     * @returns { Object} return a user message
     */
  static async getAllComments(req, res) {
    const subjectType = 'trip request';
    await commentService.getAllCommets(req, res, subjectType);
  }

  /**
     * This method help to delete a comment
     * @param { Object } req request
     * @param { Object } res response
     * @returns { Object } user respose as object
     */
  static async deleteComment(req, res) {
    await commentService.deleteComment(req, res);
  }

  /**
   * This method get a specific trip request
   * @param {Object} req requestx
   * @param {Object} res response
   * @returns {Object} user response
   */
  static async getTripRequest(req, res) {
    const trips = [];
    const { subjectID } = req.params;
    const userID = req.user.id;
    const data = await tripService.getTripRequest(subjectID, userID);
    const managerInfo = await userService.findUser({ id: data.tripRequest.managerId });
    const userInfo = await userService.findUser({ id: data.tripRequest.userId });
    const accommodationName = await AccomodationServises.findAccomodation(data.trips[0].accomodationId);
    data.trips.map((trip) => {
      trip.dataValues.name = accommodationName.dataValues.name;
      trip.dataValues.status = data.tripRequest.status;
      trip.dataValues.firstName = userInfo.dataValues.firstName;
      trip.dataValues.lastName = userInfo.dataValues.lastName;
      trips.push(trip.dataValues);
      return 0;
    });
    const searchResult = await tripHelper.addAdditionalSearchInfo(trips, managerInfo.dataValues);
    if (data) return response.successMessage(res, 'success', 200, { tripRequest: data.tripRequest, trips: searchResult[0] });
    return response.errorMessage(res, 'Trip not found', 404);
  }


  /** Function to search in the trip requests table according to what the user is typing
   * @param {object} req the request sent to the server
   * @param {object} res the response returned
   * @returns {object} found data
   */
  static async search(req, res) {
    const { id } = req.user;
    const {
      keyword, limit, page, searchType
    } = req.query;
    try {
      const offset = Paginate(page, limit);
      const foundTripRequestRecord = await tripRequestService.search(searchType, id, keyword, limit, offset);
      const userManager = await db.usermanagement.findOne({ where: { userId: id } });
      const managerInfo = await userService.findUser({ id: userManager.managerId });
      const searchResult = await tripHelper.addAdditionalSearchInfo(foundTripRequestRecord, managerInfo);
      const returnResponse = (searchResult.length > 0) ? response.successMessage(res, `Record found for keyword ${keyword}`, 200, searchResult)
        : response.errorMessage(res, `No Records were found for keyword ${keyword}`, 404);

      return returnResponse;
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This controller helps to know the type of trip
   * sothat it can redirect the request to a tageted controller
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return user response
   */
  static async redirectTripFunctionsByType(req, res) {
    const body = Object.prototype.toString.call(req.body);
    if (body === '[object Array]') {
      await TripController.updateMultiCityTripInfo(req, res);
    } else {
      await TripController.updateTripInfo(req, res);
    }
  }

  /**
   * user should be able to edit trip  which is when the request is still open
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected field
   */
  static async updateTripInfo(req, res) {
    try {
      const { tripId } = req.params;
      const { id } = req.tripRequest[0];
      const { type } = req.body;
      const userId = req.user.id;
      const userManager = await userService.findUserManager(userId);
      const { managerId } = userManager[0];
      const Trip = await tripService.getTripByTripId(tripId);
      await tripService.updateTrip(Trip[0].id, req.body);
      await tripRequestService.updateTripRequestStatusById(id);
      const updatedtrip = await tripService.getTripByTripId(tripId);
      const token = await managerToken(managerId);
      await NotificationService.sendNotification('edit-trip-request', managerId, `New edited ${type} trip request.`, `${req.user.firstName} has edited ${type} trip request`, id, `${process.env.BASE_URL_REACT}/trips/${tripId}/${token}`, tripId);
      return response.successMessage(res, 'Trip request was updated successfully', 200, updatedtrip);
    } catch (e) {
      return response.errorMessage(
        res,
        e.message,
        500,
      );
    }
  }

  /**
   * This controller will help a user to edit multiple city trip
   * and user will input multiple trips as objects inside an array.
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async updateMultiCityTripInfo(req, res) {
    try {
      const { tripId } = req.params;
      const tripBody = req.body;
      let trips = 0;
      const type = 'multi-city';
      const { id } = req.tripRequest[0];
      const userId = req.user.id;
      const userManager = await userService.findUserManager(userId);
      const { managerId } = userManager[0];
      const Trip = await tripService.getTripByTripId(tripId);
      if (Trip.length > tripBody.length) {
        trips = Trip;
      } else {
        trips = tripBody;
      }

      await Promise.all(trips.map(async (trip, index) => {
        if (tripBody[index] && !Trip[index]) {
          await tripService.CreateMultiCityTrip(req, tripBody[index], tripId, 'multi-city');
        } else if (Trip[index] && !tripBody[index]) {
          await tripRequestService.deleteMultiCityTripRequestByTripId(Trip[index].id);
        } else if (Trip[index] && tripBody[index] && tripBody[index].isUpdated === 'true') {
          await tripService.updateTrip(Trip[index].id, tripBody[index]);
          await tripRequestService.updateTripRequestStatusById(id);
        }
      }));
      const token = await managerToken(managerId);
      await NotificationService.sendNotification('edit-trip-request', managerId, `New edited ${type} trip request.`, `${req.user.firstName} has edited ${type} trip request`, id, `${process.env.BASE_URL_REACT}/trips/${tripId}/${token}`, tripId);
      const updatedtrip = await tripService.getTripByTripId(tripId);
      return response.successMessage(res, 'Trip request was updated successfully', 200, updatedtrip);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /** Function to return the number of trips created by a user and breaks them down into
   * types
   *
   * @param {*} req the request sent to the server
   * @param {*} res the response
   * @returns {*} the data found and the message
   */
  static async getTripStatistics(req, res) {
    try {
      const { startDate } = req.query;
      const someDate = new Date(startDate);
      someDate.setDate(someDate.getDate() + 1);
      const dateFormated = someDate.toISOString().substr(0, 10);
      const { id, firstName } = req.user;
      const details = await tripService.findTripsCreatedByuser(id, dateFormated);
      const totalNumber = details.reduce((sum, trip) => sum + parseInt(trip.count, 10), 0);
      return response.successMessage(res, `Trip statistics for ${firstName}`, 200, { totalTrips: totalNumber, details });
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }
}
export default TripController;
