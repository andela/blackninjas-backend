import response from '../helpers/response.helper';
import accommodationService from '../services/accomodation.service';

/**
* Class for users to create trips
*/
class AccomodationMiddleware {
  /** checks if the accomodation selected are in the same location as the destination of the user
   *  @param {req} req it contains the request of the user
   *  @param {res} res it contains the response the user receive
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async findAccommodationByCity(req, res, next) {
    const { To, accomodationCategory, accomodationId } = req.body;
    if (accomodationCategory) return next();
    const accomodations = await accommodationService.findAccomodationByCity(To);
    if (accomodationId !== accomodations[0].id) return response.errorMessage(res, 'There are no available accommodations in that destination', 404);
    next();
  }
}
export default AccomodationMiddleware;
