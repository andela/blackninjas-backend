import db from '../database/models';
import Queries from './Queries';
import response from '../helpers/response.helper';

/**
 * This class will provide all service ralated
 * with comment
 */
class tripRequestComment {
  /**
    * This method will help to create
    * a comment on trip request
    * @param { Object } req request data
    * @param {String} tripId it will specify which type of trip(round, one-way, multi-city)
    * @returns {array} data that was created
    */
  static async CreateTripRequestComment(req, tripId) {
    const data = {
      subjectId: tripId,
      subjectType: 'trip request',
      commentorId: req.user.id,
      comment: req.body.comment,
    };
    const comment = await Queries.findOneRecord(db.comment, data);
    if (comment.dataValues) return false;

    return Queries.create(db.comment, data);
  }

  /**
   * This method will help to search all information
   * related to the comment of trip request
   * @param {object} tripId trip id
   * @param { Object } subjectType subject type
   * @param { Object } limit number of record
   * @param { Object } offset offset
   * @returns { Object } all information needed
   */
  static async searchTripRequestCommentInfo(tripId, subjectType, limit, offset) {
    const tripRequest = await Queries.findOneRecord(db.requesttrip, { tripId });
    const trip = await Queries.findOneRecord(db.trips, { tripId });
    const comment = await Queries.paginationSearch(db.comment, { subjectId: tripId, subjectType }, limit, offset);
    if (!Object.prototype.hasOwnProperty.call(comment, 'managerId')) {
      const userInfo = await Queries.findOneRecord(db.user, { id: tripRequest.dataValues.userId });
      const managerInfo = await Queries.findOneRecord(db.user, { id: tripRequest.dataValues.managerId });
      const data = {
        userId: userInfo.id,
        managerId: managerInfo.id,
        username: userInfo.firstName,
        managerName: managerInfo.firstName,
        date: trip.dataValues.departureDate,
        comment
      };

      return data;
    }
    return null;
  }

  /**
   * This method search trip reqest by trip id
   * @param { Integer } tripID the tripID
   * @returns { Object } trip request data
   */
  static async searchTripRequestByTripId(tripID) {
    const tripRequest = await Queries.findOneRecord(db.requesttrip, { tripId: tripID });
    if (tripRequest !== 0) return tripRequest;
    return null;
  }

  /**
    * This servise delete a trip request comment
    * @param {Object} res response
    * @param {integer} id trip id
    * @returns { Object } user response as object
    */
  static async deleteComment(res, id) {
    await Queries.deleteComment(db.comment, { id });
    return response.successMessage(res, 'Comment has been successfuly deleted', 200);
  }
}

export default tripRequestComment;
