import UserServices from '../services/user.service';
import locationServices from '../services/location.services';
import accomodationServices from '../services/accomodation.services';

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
    const { id } = await UserServices.findUserByEmail(req.user.email); req.user.id = id || 0;
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
}

export default Accomodation;
