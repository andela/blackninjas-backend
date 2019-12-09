/**
 * Class is for all response return message and errors
 */
class response {
  /**
   * Checking error return Message
   * @param {Object} res The response object
   * @param {Object} msg The response object
   * @param {Object} status The response object
   * @returns {Object} the response
   */
  static errorMessage(res, msg, status) {
    res.status(status).json({
      status,
      error: msg,
    });
  }

  /**
   * Checking error return Message
   * @param {Object} res The response object
   * @param {Object} msg The response object
   * @param {Object} status The response object
   * @param {Object} data The response object
   * @returns {Object} the response
   */
  static successMessage(res, msg, status, data) {
    res.status(status).json({
      status,
      message: msg,
      data,
    });
  }
}
export default response;
