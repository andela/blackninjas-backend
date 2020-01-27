import response from '../helpers/response.helper';
import accomodationServices from '../services/accomodation.service';
import AccommodationHelper from '../helpers/accomodation.helper';
import imageServices from '../services/image.services';
import roomServices from '../services/room.services';
import commentService from '../services/comment.service';

/**
* Class for Travel administrator and supplier to deal with Accommodation
*/
class Accommodation {
  /**
   * This function helps to create new accomodation
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return accommodation response
   */
  static async createAccomodation(req, res) {
    const {
      accommodationName, description, locationId, category, owner, images, rooms, services, amenities
    } = req.body;
    const newAccomodation = {
      name: accommodationName, description, locationId, category, owner
    };
    const createdAccommodation = await accomodationServices.createAccomodation(newAccomodation);
    const accomodationId = createdAccommodation.dataValues.id;
    const accommodationImages = await AccommodationHelper.saveImages(images, accomodationId).then(data => data);
    const accommodationRooms = await AccommodationHelper.createRooms(rooms, accomodationId).then(data => data);
    const accommodationServices = await AccommodationHelper.createAccommodationServices(services, accomodationId).then(data => data);
    const accommodationAmenities = await AccommodationHelper.createAccommodationAmenities(amenities, accomodationId).then(data => data);
    const data = {
      createdAccommodation,
      accommodationImages,
      accommodationRooms,
      accommodationServices,
      accommodationAmenities
    };
    return response.successMessage(res, 'accommodation is successfully created', 201, data);
  }

  /**
   * This function helps to get an accomodation
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return user response
   */
  static async getAccomodation(req, res) {
    const { accomodationId } = req.params;
    const accommodations = await accomodationServices.getAccomodation(accomodationId);
    const accommodationImages = await imageServices.findImages(accomodationId);
    const accommodationRooms = await roomServices.findRooms(accomodationId);
    const accommodationServices = await accomodationServices.getAccomodationServices(accomodationId);
    const accommodationAmenities = await accomodationServices.getAccomodationAmenities(accomodationId);
    const data = {
      accommodations,
      accommodationImages,
      accommodationRooms,
      accommodationServices,
      accommodationAmenities
    };
    return response.successMessage(res, 'accommodation data', 201, data);
  }

  /**
     * This method create a comment
     * @param {Object} req request data
     * @param {Object} res response data
     * @returns { Object} return a user message
     */
  static async createAccomodationComment(req, res) {
    const subjectType = 'Accommodation';
    await commentService.createComment(req, res, subjectType);
  }

  /**
       *
       * This method will help to view all
       * comments
       * @param {Object} req user request data
       * @param {Object} res user response data
       * @returns { Object} return a user message
       */
  static async getAccommodationComments(req, res) {
    const subjectType = 'Accommodation';
    await commentService.getAllCommets(req, res, subjectType);
  }

  /**
       * This method help to delete a comment
       * @param { Object } req request
       * @param { Object } res response
       * @returns { Object } user respose as object
       */
  static async deleteAccommodationComment(req, res) {
    await commentService.deleteComment(req, res);
  }

  /**
   * Book an accommodation facility
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Promise} res
   */
  static async bookAccommodation(req, res) {
    const query = await accomodationServices.bookAccommodation(req.user.id, req.body.accommodationId, req.body.roomId, req.body.departureDate, req.body.checkoutDate);
    return response.successMessage(res, 'Booking was successfully processed', 201, query);
  }

  /**
   * Like an accommodation
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Promise} res
   */
  static async likeOrUnlike(req, res) {
    const query = await accomodationServices.likeOrUnlike(req.body.isLike, req.user.id, req.params.accommodationId);
    const likeOrUnlike = req.body.isLike ? 'Like' : 'Unlike';
    return response.successMessage(res, `${likeOrUnlike} has successfully done`, 200, query);
  }

  /**
   * Has user liked or unliked an accommodation
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Promise} res
   */
  static async checkIfUserLikedOrUnlikedAccommodation(req, res) {
    let query = null;
    query = await accomodationServices.findIfUserAlreadLiked(req.user.id, req.params.accommodationId);
    if (!query) {
      query = {
        like: false,
        dislike: false
      };
    }
    return response.successMessage(res, 'User status on liking or unliking an accommodation', 200, query);
  }
}

export default Accommodation;
