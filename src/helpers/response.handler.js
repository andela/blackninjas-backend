/**
* this class is contains two functions
* function errorMessage takes parameters of the error response
* function successMessage takes parameters of the success messageresponse
 */
class response {
  /**
   * getting response
   * @param {Object} req the object
   * @param {Object} res The response object
   * @param {Object} msg message to be displayed
   * @param {Object} status the status of the message
   * @returns {Object} A user object with selected fields
   */
  static errorMessage(req, res, msg, status) {
    res.status(status).json({
      status,
      error: msg,

    });
  }

  /**
   * getting response
   * @param {Object} req the object
   * @param {Object} res The response object
   * @param {Object} msg message to be displayed
   * @param {Object} status the status of the message
   * @param {Object} data the data to be displayed
   * @returns {Object} A user object with selected fields
   */
  static successMessage(req, res, msg, status, data) {
    res.status(status).json({
      status,
      message: msg,
      data,
    });
  }
}
export default response;
