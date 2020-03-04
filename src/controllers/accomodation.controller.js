import response from '../helpers/response.helper';
import accomodationServices from '../services/accomodation.service';
import AccommodationHelper from '../helpers/accomodation.helper';
import imageServices from '../services/image.services';
import roomServices from '../services/room.services';
import commentService from '../services/comment.service';
import Paginate from '../helpers/paginate.helper';
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
   * This function helps to get all accomodations
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return user response
   */
  static async getAllAccomodation(req, res) {
    try {
      const { page } = req.query;
      const limit = 10;
      const offset = Paginate(page, limit);
      const Accomodations = await accomodationServices.getAccomodations(limit, offset);
      if (Accomodations.count > offset) {
        return response.successMessage(
          res,
          'Accomodations',
          200,
          Accomodations
        );
      }
      return response.errorMessage(
        res,
        'No Accomodation',
        404
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This function helps to get all rooms
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return user response
   */
  static async getAllRooms(req, res) {
    try {
      const { page } = req.query;
      const { accomodationId } = req.params;
      const limit = 10;
      const offset = Paginate(page, limit);

      const rooms = await accomodationServices.getRooms(accomodationId, limit, offset);
      if (rooms.count > offset) {
        return response.successMessage(
          res,
          'rooms',
          200,
          rooms
        );
      }
      return response.errorMessage(
        res,
        'No Rooms',
        404
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This function helps to get all accommodation types
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return  response
   */
  static async getAllAccommodationTypes(req, res) {
    try {
      const AccommodationTypes = await accomodationServices.getAccommodationType();
      return response.successMessage(res, 'all accommodation types', 200, AccommodationTypes);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
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

  /**
   * This function helps user to rate accommodation which he booked.
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return accommodation response
   */
  static async rateAccomodation(req, res) {
    try {
      const { rate } = req.body;
      const userId = req.user.id;
      const { accommodationId } = req.params;

      const rateData = { rate, userId, accommodationId };

      const ratedAccommodation = await accomodationServices.CreateAccomodationRate(rateData);
      const ratings = await AccommodationHelper.getRateValues(accommodationId);


      const sum = ratings.reduce((total, amount) => total + amount);
      const averageRate = (sum / ratings.length);

      const average = averageRate.toFixed(3);
      await accomodationServices.updateAverageRate(accommodationId, average);
      return response.successMessage(res, 'You rated this accomodation successfully', 201, ratedAccommodation);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This function helps user to update accommodation rate.
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return accommodation response
   */
  static async updateAccomodationRate(req, res) {
    try {
      const { rate } = req.body;
      const userId = req.user.id;
      const { accommodationId } = req.params;
      await accomodationServices.updateAccomodationRate(accommodationId, userId, rate);
      const rateData = { rate };
      const ratings = await AccommodationHelper.getRateValues(accommodationId);

      const sum = ratings.reduce((total, amount) => total + amount);
      const averageRate = (sum / ratings.length);

      const average = averageRate.toFixed(3);
      await accomodationServices.updateAverageRate(accommodationId, average);
      return response.successMessage(res, 'Rate was updated successfully', 200, rateData);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This function helps user to get accommodation rate
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return accommodation response
   */
  static async getAccommodationRate(req, res) {
    try {
      const userId = req.user.id;
      const { accommodationId } = req.params;
      const accommodationRate = await accomodationServices.getAccommodationRate(accommodationId, userId);
      if (!accommodationRate) {
        return response.errorMessage(res, 'Rating not found', 404);
      }
      return response.successMessage(res, 'Accommodation rate', 201, accommodationRate);
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This function helps user to rate accommodation which he booked.
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return accommodation response
   */
  static async getAverageRatings(req, res) {
    try {
      const { accommodationId } = req.params;
      const ratingsAverage = await accomodationServices.getAverageRatings(accommodationId);
      let average;
      if (ratingsAverage[0].averageRate === null || ratingsAverage[0].averageRate === 0) {
        average = 0;
      } else {
        average = ratingsAverage[0].averageRate;
      }
      return response.successMessage(res, 'The average rate of this accommodation', 200, { average });
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }
  }

  /**
   * This function helps to get accomodations located in user destination
   * @param {Object} req request
   * @param {*} res response
   * @returns {Object} return user response
   */
  static async getAccomodationsByDestination(req, res) {
    const { userDestination } = req.params;
    const destinaton = parseInt(userDestination, 10);
    const accommodations = await accomodationServices.findAccomodationByCity(destinaton);
    const accommodationDetails = [];
    await Promise.all(accommodations.map(async (accomodation) => {
      const { id, name } = accomodation;
      const accommodationImages = await imageServices.findImages(id);
      const indexImageUrl = accommodationImages.map((image) => {
        const { imageUrl } = image;
        return imageUrl;
      });
      const firstImage = indexImageUrl[0];
      accommodationDetails.push({ id, name, firstImage });
    }));
    return response.successMessage(res, 'accommodation data', 201, accommodationDetails);
  }
}

export default Accommodation;
