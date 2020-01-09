import commentService from '../services/comment.service';
import response from '../helpers/response.helper';
import UserServices from '../services/user.service';
import Queries from '../services/Queries';
import db from '../database/models';

/**
 * This class manage all comment
 * activities
 */
class commentValidation {
  /**
     * This method validate userID and tripID
     * @param { Object } req request data
     * @param { Object } res response data
     * @param { Object } next redirect to the next activity
     * @returns { Object } return error message
     */
  static async validateTipIdAndUserId(req, res, next) {
    const { id } = await UserServices.findUserByEmail(req.user.email);
    req.user.id = id;
    const userId = id;
    const tripID = req.params.tripId;
    const tripRequestInfo = await commentService.searchTripRequestByTripId(tripID);
    if (!tripRequestInfo) {
      return response.errorMessage(res, 'Trip not found', 404);
    } if (tripRequestInfo.userId === userId || tripRequestInfo.managerId === userId) {
      return next();
    }
    return response.errorMessage(res, 'You are not authorized for this kind of request', 401);
  }

  /**
    * This servise delete a trip request comment
    * @param {Object} req request
    * @param {Object} res response
     * @param {Object} next next
    * @returns { Object } user response as object
    */
  static async deleteCommentValidation(req, res, next) {
    const id = req.params.commentId;
    const comment = await Queries.findOneRecord(db.comment, { id });
    if (comment.dataValues.commentorId === req.user.id) {
      return next();
    }
    return response.errorMessage(res, 'You are not authorized to delete this comment', 401);
  }
}
export default commentValidation;
