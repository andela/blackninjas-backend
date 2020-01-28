import { config } from 'dotenv';
import { clients } from '../helpers/socket.helper';
import UserService from '../services/user.service';
import chatService from '../services/chat.service';
import response from '../helpers/response.helper';


config();
/** Function to list all users
    * @returns {*} data returned
*/
class ChatController {
  /** Function to list all users
    * @param {object} req the request sent
    * @param {object} res the response returned
    * @returns {*} data returned
    */
  static async getAllUsers(req, res) {
    try {
      const newArray = [];
      const allUsers = await UserService.getAllUsers();

      allUsers.forEach((user) => {
        const u = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          image: user.profileImage
        };
        const client = clients.get(user.id);
        if (client) {
          newArray.push({
            ...u,
            isOnline: true
          });
        } else {
          newArray.push({
            ...u,
            isOnline: false
          });
        }
      });
      return response.successMessage(res, 'users available', 200, newArray.sort((a, b) => a.isOnline.toString().localeCompare(b.isOnline.toString())).reverse());
    } catch (error) {
      return error.message;
    }
  }

  /** Get Private and public message between two users
    * @param {object} req the request sent
    * @param {object} res the response returned
    * @returns {*} data returned
    */
  static async getMessages(req, res) {
    try {
      const { userId } = req.params;
      const { id } = req.user;
      if (!userId) {
        const publicMessages = await chatService.getPublicMessage();
        return response.successMessage(res, 'Messages', 200, publicMessages);
      }
      const privateMessages = await chatService.getPrivateMessage(userId, id);
      return response.successMessage(res, 'Messages', 200, privateMessages);
    } catch (error) {
      response.errorMessage(res, error.message, 500);
    }
  }
}

export default ChatController;
