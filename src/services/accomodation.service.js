import db from '../database/models';
import Queries from './Queries';
/** accommodation service */
class accommodationService {
  /**
     * find room status
     * @param { Integer } accId accomodation id
     * @returns { boolean } true or false
     */
  static async findAccomodation(accId) {
    return Queries.findOneRecord(db.accomodation, { id: accId });
  }

  /**
     * create an accomodation
     * @param { Object } newAccomodation accomodation id
     * @returns {array} data the data to be returned.
     */
  static async createAccomodation(newAccomodation) {
    const condition = { name: newAccomodation.name, locationId: newAccomodation.locationId };
    return Queries.findOrCreate(db.accomodation, newAccomodation, condition);
  }

  /**
     * create accommodation additional services
     * @param { Object } newService contains services name and accommodationId
     * @returns {array} data the data to be returned.
     */
  static async createAccommodationService(newService) {
    const condition = { name: newService.name, accomodationId: newService.accomodationId };
    return Queries.findOrCreate(db.accomodationservice, newService, condition);
  }

  /**
     * create accommodation amenities
     * @param { Object } newAmenity contains amenity name and accommodationId
     * @returns {array} data the data to be returned.
     */
  static async createAccommodationAmenity(newAmenity) {
    const condition = { name: newAmenity.name, accomodationId: newAmenity.accomodationId };
    return Queries.findOrCreate(db.accomodationamenity, newAmenity, condition);
  }

  /**
     * get accommodation
     * @param { Object } accomodationId contains amenity name and accommodationId
     * @returns {array} data the data to be returned.
     */
  static async getAccomodation(accomodationId) {
    return Queries.findAllRecord(db.accomodation, { id: accomodationId });
  }

  /**
     * get accommodation
     * @param { Object } accomodationId contains amenity name and accommodationId
     * @returns {array} data the data to be returned.
     */
  static async getAccomodationServices(accomodationId) {
    return Queries.findAllRecord(db.accomodationservice, { accomodationId });
  }

  /**
     * get accommodation
     * @param { Object } accomodationId contains amenity name and accommodationId
     * @returns {array} data the data to be returned.
     */
  static async getAccomodationAmenities(accomodationId) {
    return Queries.findAllRecord(db.accomodationamenity, { accomodationId });
  }

  /**
     * updating AccommodationNumberOfRooms
     * @param { Object } accomodationId contains amenity name and accommodationId
     * @param { Object } numberOfRooms contains amenity name and accommodationId
     * @returns {array} data the data to be returned.
     */
  static async updateAccommodationNumberOfRooms(accomodationId, numberOfRooms) {
    return db.accomodation.increment(
      { numberOfRooms, availableRooms: numberOfRooms },
      { where: { id: accomodationId }, returning: true }
      );
  }
}
export default accommodationService;
