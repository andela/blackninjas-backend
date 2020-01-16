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
}
export default accommodationService;
