
import response from '../helpers/response.helper';
import UserServices from '../services/user.service';


/**
* Class for users to reset password
*/
class ResetPasswordMiddleware {
  /** This function checks if the user who is going to reset password exist in our database
   *  @param {req} req it contains the request from the body
   *  @param {res} res it contains the response to be returned
   *  @param {function} next it jumps to the next middleware in the route
   * @return {object} the data from the first middleware
   */
  static async checkIfUserExistanceByEmail(req, res, next) {
    const result = await UserServices.findUserByEmail(req.body.email);
    if (result === null) { return response.errorMessage(res, 'user not found!', 404); }
    next();
  }
}
export default ResetPasswordMiddleware;
