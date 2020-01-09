import tripRequestCommentService from '../services/comment.service';
import response from '../helpers/response.helper';
import Paginate from '../helpers/paginate.helper';


/**
 * This class will controll all action related to the
 * comment
 */
class comment {
  /**
     * This method will help
     * to comment to the trip request
     * @param {Object} req request data
     * @param {Object} res response data
     * @returns { Object} return a user message
     */
  static async createTripRequestComment(req, res) {
    const Id = req.params.tripId;
    const result = await tripRequestCommentService.CreateTripRequestComment(req, Id);
    if (result) return response.successMessage(res, 'comment created successfuly', 201);
    return response.errorMessage(res, 'Comment already exist', 409);
  }

  /**
   *
   * This method will help to view all
   * comment tha has been commented on
   * a spacifi trip request
   * @param {Object} req user request data
   * @param {Object} res user response data
   * @returns { Object} return a user message
   */
  static async viewTripRequestComment(req, res) {
    const Id = req.params.tripId;
    const { page } = req.query;
    const limitNumber = 10;
    const offset = Paginate(page, limitNumber);
    const data = await tripRequestCommentService.searchTripRequestCommentInfo(Id, 'trip request', limitNumber, offset);
    if (data) return response.successMessage(res, 'success', 200, data);
    return response.errorMessage(res, 'No comment yet', 404);
  }

  /**
   * This method help to delete a trip request comment
   * @param { Object } req request
   * @param { Object } res response
   * @returns { Object } user respose as object
   */
  static async deleteTripRequestComment(req, res) {
    const Id = parseInt(req.params.commentId, 10);
    await tripRequestCommentService.deleteComment(res, Id);
  }
}

export default comment;
