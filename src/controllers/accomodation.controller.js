import response from '../helpers/response.helper';
import accomodationServices from '../services/accomodation.service';
import AccommodationHelper from '../helpers/accomodation.helper';
import imageServices from '../services/image.services';
import roomServices from '../services/room.services';

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
    response.successMessage(res, 'accommodation is successfully created', 201, data);
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
    response.successMessage(res, 'accommodation data', 201, data);
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
}

export default Accommodation;
