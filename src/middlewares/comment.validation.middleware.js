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
    const tripID = req.params.subjectID;
    const tripRequestInfo = await tripService.searchTripRequestByTripId(tripID);
    if (!tripRequestInfo) {
      return response.errorMessage(res, 'Trip not found', 404);
    } if (tripRequestInfo.userId === userId || tripRequestInfo.managerId === userId) {
      return next();
    }
    return response.errorMessage(res, 'You are not authorized for this kind of request', 401);
  }

  /**
   * This method validate the availability
   * of accommodation
   * @param {Object} req request
   * @param {Object} res responce
   * @param {Object} next next steps
   * @returns {Object} message
   */
  static async validateSubjectAvailability(req, res, next) {
    const { subjectID } = req.params;
    if (!isValide(subjectID)) return response.errorMessage(res, 'Accommodation id must be a number', 400);

    const result = await Queries.findOneRecord(db.accomodation, { id: subjectID });

    if (!result) return response.errorMessage(res, 'Accommodation not found', 404);

    if (req.route.stack[0].method === 'post') {
      const hasBookedThisAccomodation = await Queries.findOneRecord(db.booking, { userid: req.user.dataValues.id, accommodationid: subjectID });
      if (!hasBookedThisAccomodation) {
        return response.errorMessage(res, 'You are not allowed to provide the feedback on this accommodation', 401);
      }
    }

    return next();
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
    const id = parseInt(req.params.commentID, 10);
    const subjectId = req.params.subjectID;
    if (!isValide(id)) return response.errorMessage(res, 'Comment id must be a number', 400);
    const comment = await Queries.findOneRecord(db.comment, { subjectId, id });
    if (!comment) {
      return response.successMessage(res, 'Comment not found', 204);
    }
    if (comment && comment.dataValues.commentorId !== req.user.id) {
      return response.errorMessage(res, 'You are not authorized to delete this comment', 401);
    }
    return next();
  }
}
export default CommentValidation;
