import Queries from './Queries';
import db from '../database/models';

/** */
class accomodation {
  /**
     * find room status
     * @param { Integer } accId accomodation id
     * @returns { boolean } true or false
     */
  static async findAccomodation(accId) {
    return Queries.findByOneAttribute(db.accomodation, { id: accId });
  }
}

export default accomodation;
