import db from '../database/models';
import Queries from './Queries';
/** accommodation service */
class accommodationService {
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
}
export default accommodationService;
