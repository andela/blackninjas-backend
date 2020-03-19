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
  * @param { Number } tripid trip id
  * @param { Number } accommodationId accommodation id
  * @param { String } roomid room id
  * @param { Date } departureDate departure date
  * @param { Date } checkoutDate checkout date
  * @returns { Object } an accommodation
  */
  static async bookAccommodation(userId, tripid, accommodationId, roomid, departureDate, checkoutDate) {
    const query = await db.booking.create({
      userid: userId,
      accommodationid: accommodationId,
      roomid,
      departuredate: departureDate,
      checkoutdate: checkoutDate,
      tripid
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
      if (result.islike == null) {
        await result.update({ islike: isLike });
        if (isLike) {
          await db.accomodation.increment('likes', { by: 1, where: { id: accommodationId } });
          return this.findAccomodation(accommodationId);
        }
        await db.accomodation.increment('unlikes', { by: 1, where: { id: accommodationId } });
        return this.findAccomodation(accommodationId);
      }
      if (result.islike === isLike) {
        await result.update({ islike: null });
        if (isLike) {
          await db.accomodation.decrement('likes', { by: 1, where: { id: accommodationId } });
          return this.findAccomodation(accommodationId);
        }
        await db.accomodation.decrement('unlikes', { by: 1, where: { id: accommodationId } });
        return this.findAccomodation(accommodationId);
      }
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

  /**
 * creating rating query
 * @param {string} rateData rate data.
 * @returns {array} data the data to be returned.
 */
  static async CreateAccomodationRate(rateData) {
    return Queries.create(db.accomodationRates, rateData);
  }

  /**
 * creating rating query
 * @param {integer} accomodationId accommodation id
 * @param {integer} averageRate the rate average
 * @returns {array} data the data to be returned.
 */
  static async updateAverageRate(accomodationId, averageRate) {
    return Queries.updateAverageRate(db.accomodation, accomodationId, averageRate);
  }

  /**
 * checking if the accommodation exist using it's id
 * @param {integer} accomodationId accommodation id
 * @returns {array} data the data to be returned.
 */
  static async checkAccommodationById(accomodationId) {
    return Queries.checkAccommodationById(db.accomodation, accomodationId);
  }

  /**
 * get dated accommodations to that id
 * @param {integer} accommodationId accommodation id
 * @returns {array} data the data to be returned.
 */
  static async getRatedAccommodations(accommodationId) {
    return Queries.getRatedAccommodations(db.accomodationRates, accommodationId);
  }

  /**
   * This service get a booked accommodation that corresponds to user id and accomodation id
   * @param {Object} userid user id
   * @param {Object} accommodationid accomodation id
   * @returns {Object} user response
   */
  static async findIfAccomodationBooked(userid, accommodationid) {
    const accommodatioBooked = await Queries.findIfAccomodationBooked(db.booking, userid, accommodationid);
    if (accommodatioBooked) {
      return accommodatioBooked;
    }
    return false;
  }


  /**
 * creating of updating rate
 * @param {integer} accomodationId accommodation id
 * @param {Object} userId user id
 * @param {integer} rate rating value
 * @returns {array} data the data to be returned.
 */
  static async updateAccomodationRate(accomodationId, userId, rate) {
    return Queries.updateAccomodationRate(db.accomodationRates, accomodationId, userId, rate);
  }

  /**
 * Get updated ratings
 * @param {integer} accommodationId accommodation id
 * @param {Object} userId user id
 * @returns {array} data the data to be returned.
 */
  static async getAccommodationRate(accommodationId, userId) {
    return Queries.getAccommodationRate(db.accomodationRates, accommodationId, userId);
  }

  /**
 * Get average accommodation using accommodation id
 * @param {integer} accomodationId accommodation id
 * @returns {array} data the data to be returned.
 */
  static async getAverageRatings(accomodationId) {
    return Queries.getAverageRatings(db.accomodation, accomodationId);
  }

  /**
 * service to all accommodations in database by filtering 10 accommodations by page
 * @param {Object} limit accommodation request
 * @param {Object} offset accommodation for the page
 * @returns {Object} return accommodation message
 */
  static async getAccomodations(limit, offset) {
    try {
      const results = await Queries.getAllAccommodations(db.accomodation, limit, offset);

      if (!results) return null;
      return results;
    } catch (error) {
      return undefined;
    }
  }

  /**
 * service to all rooms in database by filtering 10 rooms by page
 * @param {integer} accomodationId accommodation id
 * @param {Object} limit room request
 * @param {Object} offset room for the page
 * @returns {Object} return room message
 */
  static async getRooms(accomodationId, limit, offset) {
    try {
      const results = await Queries.getAllRooms(db.rooms, { accomodationId }, limit, offset);
      if (!results) return null;
      return results;
    } catch (error) {
      return undefined;
    }
  }

  /**
     * get all accommodation types
     * @returns { Object } accommodation types
     */
  static async getAccommodationType() {
    const data = await db.accomodationtype.findAll();
    return data;
  }

  /**
 * service to all location name by location id
 * @param {integer} locationId Location id
 * @returns {Object} return accommodation message
 */
  static async getLocationNameById(locationId) {
    return Queries.getLocationNameById(db.locations, locationId);
  }

  /**
     * get all accommodation's room types
     * @param { integer } accomodationId Location id
     * @returns { Object } accommodation types
     */
  static async getAccommodationRoomType(accomodationId) {
    const data = await db.sequelize.query(`SELECT DISTINCT(t.name),rooms."accomodationId",t.id as typeId
    FROM rooms
    INNER JOIN accomodationtypes t ON t.id=rooms."typeId"
    WHERE rooms."accomodationId"=${accomodationId}`, { type: db.sequelize.QueryTypes.SELECT });
    return data;
  }
}
export default accommodationService;
