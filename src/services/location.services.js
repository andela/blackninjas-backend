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
}

export default location;
