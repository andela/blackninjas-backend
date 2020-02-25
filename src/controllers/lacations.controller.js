import LocationsService from '../services/location.services';
import response from '../helpers/response.helper';

/**
 * This class contains functions for locations controller.
 * @class NotificationController
 */
class LocationsController {
  /**
   * Get most traveled locations
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} res
   */
  static async getMostTraveledLocations(req, res) {
    const query = await LocationsService.getMostTraveled();
    return response.successMessage(res, 'Most traveled locations', 200, query);
  }

  /**
   * Get supported locations
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} res
   */
  static async getSupportedLocations(req, res) {
    const locations = await LocationsService.getLocations();
    const data = locations.map(async (location) => {
      const { country, city, id } = location;
      return ({ country, city, id });
    });
    return response.successMessage(res, 'all supported locations', 200, data);
  }
}
export default LocationsController;
