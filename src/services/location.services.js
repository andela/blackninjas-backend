import Queries from './Queries';
import db from '../database/models';

/** */
class location {
  /**
     * find user manager
     * @param { Integer } locationId location id
     * @returns { boolean } true or false
     */
  static async findLocation(locationId) {
    return Queries.findOneRecord(db.locations, { id: locationId });
  }

  /**
     * get most traveled destinations
     * @returns { Object } Locations and travelledTimes
     */
  static async getMostTraveled() {
    return db.sequelize.query('SELECT locations.country, locations.city, count (locations.city) as "travelledTimes" FROM trips INNER JOIN locations ON trips."destinationId"=locations.id group by locations.country,locations.city ORDER BY "travelledTimes" DESC;', { type: db.sequelize.QueryTypes.SELECT });
  }

  /**
     * get most traveled destinations
     * @returns { Object } Locations and travelledTimes
     */
  static async getLocations() {
    const data = await db.locations.findAll();
    return data;
  }
}

export default location;
