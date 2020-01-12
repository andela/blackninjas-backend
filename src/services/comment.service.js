import db from '../database/models';
import Queries from './Queries';
import response from '../helpers/response.helper';

/**
 * This class will provide all service ralated
 * with comment
 */
class CommentServices {
  /**
    * This method will help to create
    * a comment
    * @param { Object } req request data
    * @param {String} subjectId subjectId
    * @param {String} subjectType subjectId
    * @returns {array} data that was created
    */
  static async createComment(req, subjectId, subjectType) {
    const data = {
      subjectId,
      subjectType,
      commentorId: req.user.id,
      comment: req.body.comment,
    };
    const comment = await Queries.findOneRecord(db.comment, data);
    if (comment.dataValues) return false;

    return Queries.create(db.comment, data);
  }

  /**
   * This method will help to search all comments
   * @param {object} subjectId trip id
   * @param { Object } subjectType subject type
   * @param { Object } limit number of record
   * @param { Object } offset offset
   * @returns { Object } all information needed
   */
  static async getAllCommets(subjectId, subjectType, limit, offset) {
    const tripRequest = await Queries.findOneRecord(db.requesttrip, { tripId: subjectId });
    const trip = await Queries.findOneRecord(db.trips, { tripId: subjectId });
    const comment = await Queries.paginationSearch(db.comment, { subjectId, subjectType }, limit, offset);
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
    * This servise delete a comment
    * @param {Object} res response
    * @param {String} subjectId subjectId ID
    * @param {integer} id comment id
    * @returns { Object } user response as object
    */
  static async deleteComment(res, subjectId, id) {
    await Queries.deleteComment(db.comment, { subjectId, id });
    return response.successMessage(res, 'Comment has been successfuly deleted', 200);
  }
}

export default CommentServices;
