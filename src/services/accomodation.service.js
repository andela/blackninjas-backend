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

  /** Finds all accommodations that belong in a given city
   *
   * @param {Integer} to destination  id
   * @returns { array } list of accommodations
   */
  static async findAccomodationByCity(to) {
    try {
      const requestedAccomodation = await Queries.findAccommodation(db.accomodation, to);
      return requestedAccomodation;
    } catch (error) {
      return error;
    }
  }

  /**
  * book an accommodation facilities
  * @param { Number } userId user id
  * @param { Number } accommodationId accommodation id
  * @param { String } roomid room id
  * @param { Date } departureDate departure date
  * @param { Date } checkoutDate checkout date
  * @returns { Object } an accommodation
  */
  static async bookAccommodation(userId, accommodationId, roomid, departureDate, checkoutDate) {
    const query = await db.booking.create({
      userid: userId,
      accommodationid: accommodationId,
      roomid,
      departuredate: departureDate,
      checkoutdate: checkoutDate
    });
    await db.accomodation.decrement('availableRooms', { by: 1, where: { id: accommodationId } });
    return query;
  }

  /**
* check if user has already booked an accommodation facilities on the same date
* @param { Number } userId user id
* @param { Number } accommodationId accommodation id
* @param { Date } departureDate departure date
* @param { Date } checkoutDate checkout date
* @returns { Object } an accommodation
*/
  static async checkIfUserAlreadyBookedAccommodation(userId, accommodationId, departureDate, checkoutDate) {
    const query = await db.bookedaccommodations.findOne({
      where: {
        userid: userId,
        accommodationid: accommodationId,
        departuredate: departureDate,
        checkoutdate: checkoutDate
      }
    });
    return query;
  }


  /**
  * like or unlike an accommodation facilities
  * @param { Boolean } isLike this will be true or false
  * @param { Number } userId user id
  * @param { Number } accommodationId accommodation id
  * @returns { Object } an accommodation
  */
  static async likeOrUnlike(isLike, userId, accommodationId) {
    const result = await this.findIfUserAlreadLiked(userId, accommodationId);
    if (result) {
      if (result.islike === isLike) return this.findAccomodation(accommodationId);
      await result.update({ islike: isLike });
      if (isLike) {
        await db.accomodation.increment('likes', { by: 1, where: { id: accommodationId } });
        await db.accomodation.decrement('unlikes', { by: 1, where: { id: accommodationId } });
        return this.findAccomodation(accommodationId);
      }
      await db.accomodation.increment('unlikes', { by: 1, where: { id: accommodationId } });
      await db.accomodation.decrement('likes', { by: 1, where: { id: accommodationId } });
      return this.findAccomodation(accommodationId);
    }
    await db.accommodationLikesAndUnlikes.create({ islike: isLike, userid: userId, accommodationid: accommodationId });
    if (isLike) {
      await db.accomodation.increment('likes', { by: 1, where: { id: accommodationId } });
      return this.findAccomodation(accommodationId);
    }
    await db.accomodation.increment('unlikes', { by: 1, where: { id: accommodationId } });
    return this.findAccomodation(accommodationId);
  }

  /**
  * like or unlike an accommodation facilities
  * @param { Number } userId user id
  * @param { Number } accommodationId accommodation id
  * @returns { Object } an accommodation
  */
  static async findIfUserAlreadLiked(userId, accommodationId) {
    const query = await db.accommodationLikesAndUnlikes.findOne({ where: { userid: userId, accommodationid: accommodationId } });
    return query;
  }
}
export default accommodationService;
