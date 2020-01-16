import tripService from '../services/trip.services';
import response from '../helpers/response.helper';
import Queries from '../services/Queries';
import db from '../database/models';
import isValide from '../helpers/id.validator.helper';

/**
 * This class manage all comment
 * validation
 */
class CommentValidation {
  /**
     * This method validate userID and subjectID
     * @param { Object } req request data
     * @param { Object } res response data
     * @param { Object } next redirect to the next activity
     * @returns { Object } return error message validateRelationships
     */
  static async validateUserAndSubjectRelationships(req, res, next) {
    const userId = req.user.id;
    const tripID = req.params.tripRequestID;
    const tripRequestInfo = await tripService.searchTripRequestByTripId(tripID);
    if (!tripRequestInfo) {
      return response.errorMessage(res, 'Trip not found', 404);
    } if (tripRequestInfo.userId === userId || tripRequestInfo.managerId === userId) {
      return next();
    }
    return response.errorMessage(res, 'You are not authorized for this kind of request', 401);
  }


  /**
    * This servise validate comment id and the ownership of a comment
    * which is going to be deleted
    * @param {Object} req request
    * @param {Object} res response
     * @param {Object} next next
    * @returns { Object } user response as object
    */
  static async deleteCommentValidation(req, res, next) {
    const id = req.params.commentID;
    if (!isValide(id)) return response.errorMessage(res, 'Comment id must be a number', 400);
    const comment = await Queries.findOneRecord(db.comment, { id });
    if (!comment) {
      return response.errorMessage(res, 'Comment not found', 404);
    }
    if (comment && comment.dataValues.commentorId !== req.user.id) {
      return response.errorMessage(res, 'You are not authorized to delete this comment', 401);
    }
    return next();
  }
}
export default CommentValidation;
