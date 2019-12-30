import moment from 'moment';
import tripService from '../services/trip.services';
import locationServices from '../services/location.services';

/**
 * all trip helpers
 */
class tripHelper {
  /**
   * This method helps to validate if a location
   * exist in database
   * @param {Object} req user request
   * @returns {null} no return
   */
  static async checkLocationExistance(req) {
    await Promise.all(req.body.map(async (trip, index) => {
      const origin = await locationServices.findLocation(trip.From);
      const destination = await locationServices.findLocation(trip.To);
      if (!origin) {
        req.errorMessage = `Origin of trip number ${index + 1} not found`;
        req.errorStatus = 404;
      } else if (!destination) {
        req.errorMessage = `Destination of trip number ${index + 1} not found`;
        req.errorStatus = 404;
      }
    }));
  }

  /**
   * This method helps to extract days between two dates
   * it will accept to date and find the days twee them
   * @param {Object} req user request
   * @returns {Object} not return
   */
  static extractDaysInDate(req) {
    let firstTravelDate = '';
    let secondTravelDate = '';
    req.body.map((trip, index) => {
      req.body[index].leavingDays = 0;
      if (index > 0) {
        firstTravelDate = new Date(req.body[index - 1].departureDate);
        secondTravelDate = new Date(req.body[index].departureDate);
        const DifferenceInTime = (secondTravelDate > firstTravelDate)
          ? secondTravelDate.getTime() - firstTravelDate.getTime() : 0;
        const days = DifferenceInTime / (1000 * 3600 * 24);
        req.body[index].leavingDays = days;
      }
      return 0;
    });
    return {
      firstTravelDate,
      secondTravelDate
    };
  }

  /**
   * This method validate if the trips pattern
   * are consecutive
   * @param {Object} req user request
   * @param {Date} firstTravelDate privious trip date
   * @param {Date} secondTravelDate nexttrip date
   * @returns {null} not return
   */
  static validateTripPattern(req, firstTravelDate, secondTravelDate) {
    req.body.map((trip, index) => {
      if (index > 0 && req.body[index - 1].To !== req.body[index].From) {
        req.errorMessage = `Destination of trip number ${index}, mush be equal to the Origin of trip number ${index + 1}`;
        req.errorStatus = 403;
      } else if ((index > 0 && firstTravelDate >= secondTravelDate)) {
        req.errorMessage = `Departure date of trip number ${index} can not be greater than Departure date of trip number ${index + 1}`;
        req.errorStatus = 403;
      }
      return 0;
    });
  }

  /**
   * This method checks if a user request a trip twice
   * @param {Object} req user request
   * @param {Object} res user respnse
   * @returns { null} not return
   */
  static async checkTripExistence(req, res) {
    await Promise.all(req.body.map(async (trip, index) => {
      const bookedTrips = [];
      const trips = await tripService.findUserTrip(res, req.body[index].From, req.body[index].To);

      trips.filter((trip2) => {
        const tripDepartureDate = moment(trip2.dataValues.departureDate).format('YYYY-MM-DD');
        if (tripDepartureDate === trip.departureDate) {
          req.checker = true;
        }
        return 0;
      });
      if (req.checker)bookedTrips.push(index + 1);
      req.errorMessage = (bookedTrips.length > 0) ? `Trip number ${bookedTrips} alread exist ` : req.errorMessage;
      req.errorStatus = (bookedTrips.length > 0) ? 409 : req.errorStatus;
      req.checker = false;
    }));
  }
}
export default tripHelper;
