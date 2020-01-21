import UserServices from '../services/user.service';
import locationServices from '../services/location.services';
import accomodationServices from '../services/accomodation.service';
import roomServices from '../services/room.services';
import imageServices from '../services/image.services';

/**
 * all trip helpers
 */
class Accomodation {
  /**
   * This method helps to validate accomodation and
   *  it check if accomodation exist in database and  also if it exist
   * in destination area using accomodation id
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next next to the middleware chain
   * @returns { Object} return user response
   */
  static async checkAccomodationAvailability(req) {
    const { id } = await UserServices.findUserByEmail(req.user.email); req.user.id = id;
    await Promise.all(req.body.map(async (trip, index) => {
      const accomodation = await accomodationServices.findAccomodation(trip.accomodationId);
      if (accomodation.dataValues) {
        const accomodationLocation = await locationServices.findLocation(accomodation.dataValues.locationId);
        if (accomodationLocation.dataValues.id !== req.body[index].To) {
          req.errorMessage = `Accomodation does not exist on destination area check trip number ${index + 1}`; req.errorStatus = 404;
        }
      } else {
        req.errorMessage = `Accomodation not found check trip number ${index + 1}`; req.errorStatus = 404;
      }
    }));
    return id;
  }

  /**
   * This function helps to save set of images information
   * @param { Array } images images of accomodation
   * @param { Integer } accomodationId id of accomodation
   * @returns {Object} return created Accommodation Images
   */
  static async saveImages(images, accomodationId) {
    return Promise.all(images.map(async (image) => {
      const { imageUrl } = image;
      const newImage = { recordId: accomodationId, imageType: 'accomodation', imageUrl };
      const savedImage = await imageServices.saveImage(newImage);
      const data = savedImage.dataValues;
      return data;
    }));
  }

  /**
    * This function helps to create set of rooms information
    * @param { Array } rooms rooms of accomodation
    * @param { Integer } accomodationId id of accomodation
    * @returns {Object} return created Accommodation Rooms
    */
  static async createRooms(rooms, accomodationId) {
    return Promise.all(rooms.map(async (room) => {
      const {
        numberOfRoom, typeId, price, currency, roomTypeImageUrl
      } = room;
      const newRoom = {
        accomodationId, typeId, price, status: 'available', currency
      };
      const makeRepeated = (arr, repeats) => Array.from({ length: repeats }, () => arr).flat();
      const roomsData = makeRepeated([newRoom], numberOfRoom);
      const createdRooms = await roomServices.createRoom(roomsData);
      await accomodationServices.updateAccommodationNumberOfRooms(accomodationId, numberOfRoom);
      const newImage = { recordId: accomodationId, imageType: `roomType ${typeId}`, imageUrl: roomTypeImageUrl };
      let roomTypeImage = await imageServices.saveImage(newImage);
      roomTypeImage = roomTypeImage.dataValues;
      const data = {
        createdRooms,
        roomTypeImage
      };
      return data;
    }));
  }

  /**
   * This function helps to create services of accommodation
   * @param { Array } services services of accomodation
   * @param { Integer } accomodationId id of accomodation
   * @returns {Object} return data of Accommodation services
   */
  static async createAccommodationServices(services, accomodationId) {
    return Promise.all(services.map(async (service) => {
      const { serviceName } = service;
      const newServices = { name: serviceName, accomodationId };
      const createdServices = await accomodationServices.createAccommodationService(newServices);
      const data = createdServices.dataValues;
      return data;
    }));
  }

  /**
   * This function helps to create amenities of accommodation
   * @param { Array } amenities amenities of accomodation
   * @param { Integer } accomodationId id of accomodation
   * @returns {Object} return created Accommodation amenities
   */
  static async createAccommodationAmenities(amenities, accomodationId) {
    return Promise.all(amenities.map(async (amenity) => {
      const { amenityName } = amenity;
      const newAmenity = { name: amenityName, accomodationId };
      const createdAmenities = await accomodationServices.createAccommodationAmenity(newAmenity);
      const data = createdAmenities.dataValues;
      return data;
    }));
  }
}

export default Accomodation;
