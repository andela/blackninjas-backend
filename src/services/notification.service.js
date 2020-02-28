import db from '../database/models';
import emailHelper from '../helpers/send.email.helper';
import userService from './user.service';
import { clients } from '../helpers/socket.helper';

/**
 * This class contains functions for all notification service.
 * @class NotificationService
 */
class NotificationService {
  /**
   * Send notification
   * @param { String } event example: `trip_request_event, connect_user, ...`.
   * @param { Number } receiverId User Id.
   * @param { String } title Notification title.
   * @param { String } message Custom message.
   * @param { Number } requestId Request Id.
   * @param { String } redirectLink Link to be sent to email. example: `https://{host}/{requestId}/{token}`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async sendNotification(event, receiverId, title, message, requestId, redirectLink) {
    try {
      const data = {
        receiver: receiverId, requestId, title, message
      };
      // get receiver data from database
      const receiverInfo = await userService.findUser({ id: receiverId });
      // Save in database
      const result = await db.notification.create(data);
      data.id = result.dataValues.id;
      if (receiverInfo.appNotification) {
        const client = clients.get(receiverInfo.id);
        if (client) {
          client.emit(event, data);
        }
      }
      if (receiverInfo.emailNotification) {
        emailHelper.sendEmail(
          receiverInfo.email,
          title,
          `<div style="display: grid; align-content: center; justify-content: center;">
          <div style="width: 774px; padding: 48px; margin: 48px; background-color: white;">
              <img src="https://res.cloudinary.com/dby88h516/image/upload/v1575884218/Group_13_hwi0ze.png" alt=""/>
              <div style="padding: 18px 0px;">
                  <div style="width: 678px; font-family: Roboto; font-style: normal; font-weight: normal; font-size: 22px; padding-bottom: 14px; color: rgb(61, 61, 61);">Hi ${receiverInfo.firstName},</div>
                  <div style="width: 678px; font-family: Roboto; font-style: normal; font-weight: normal; font-size: 18px; color: rgb(61, 61, 61);">${message}</div>
              </div>
              <a target="#" href="${redirectLink}" style="text-decoration: none; cursor: pointer; padding: 8px 40px; font-size: 18px; height: 37px; background-color: #0094FF; box-shadow: 0.2px 0.2px 4px rgba(0, 0, 0, 0.25); color: white;">View request</a>
          </div>
      </div>`
        );
      }
    } catch (error) {
      return error;
    }
  }

  /**
   * get notifications
   * @param { Object } where example: `{ receiver, userId }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async getNotifications(where) {
    return db.notification.findAll({ where, order: [['read', 'ASC'], ['createdAt', 'DESC']] });
  }

  /**
   * get a spesific notification
   * @param { Object } where example: `{ receiver, userId }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async getNotification(where) {
    const query = await db.notification.findOne({ where });
    if (query) return query;
  }

  /**
   * update notifications
   * @param { Object } where example: `{ receiver, userId }`.
   * @param { Object } data example: `{ read: true }`.
   * @returns { Promise } Returns a notification query result object.
   */
  static async updateNotifications(where, data) {
    const query = await db.notification.update(data, { where });
    return query;
  }
}
export default NotificationService;
