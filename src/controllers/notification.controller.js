import NotificationService from '../services/notification.service';
import UserService from '../services/user.service';
import response from '../helpers/response.helper';

/**
 * This class contains functions for all notification controller.
 * @class NotificationController
 */
class NotificationController {
  /**
   * Get notification for a user
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Promise} res
   */
  static async getUserNotifications(req, res) {
    const query = await NotificationService.getNotifications({ receiver: req.user.id });
    return response.successMessage(res, `${req.user.firstName}'s notifications`, 200, query);
  }

  /**
   * View a spesific notification
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Promise} res
   */
  static async getNotificationById(req, res) {
    const query = await NotificationService.getNotification({ id: req.params.id, receiver: req.user.id });
    return response.successMessage(res, 'A spesific notification', 200, query);
  }

  /**
   * Change user preference for email and in app notification
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Promise} res
   */
  static async changePreference(req, res) {
    const { emailNotification, appNotification } = req.body;
    await UserService.updateUser(req.user.email, { appNotification, emailNotification });
    return response.successMessage(res, 'Successfully update user preference.', 200);
  }
}
export default NotificationController;
