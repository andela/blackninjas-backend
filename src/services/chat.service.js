import db from "../database/models";
import Queries from "./Queries";

/**
 * This class contains all chat functionality
 * @class ChatService
 */
class ChatService {
  /**
   * save Chat Message
   * @param { Object } chatData
   * @returns { Promise } Returns a a saved message.
   */
  static async saveMessage(chatData) {
    try {
      return Queries.create(db.chats, chatData);
    } catch (error) {
      return error;
    }
  }

  /**
   * get Private Message
   * @param { Integer } sender .
   * @param { Integer } receiver .
   * @param { Integer } limit .
   * @param { Integer } offset .
   * @returns { Promise } Returns a list of messages
   */
  static async getPrivateMessage(sender, receiver, limit, offset) {
    try {
      const privateMessages = Queries.getPrivateMessage(
        db.chats,
        sender,
        receiver,
        limit,
        offset
      );
      return privateMessages;
    } catch (error) {
      return error;
    }
  }

  /**
   * get Public Message
   * @param {*} receiverId receiverId
   * @param {*} limit limit number to retrieve
   * @param {*} offset the range to retrieve
   * @returns { Promise } Returns a list of Public messages
   */
  static async getPublicMessage(receiverId, limit, offset) {
    try {
      const publicMessages = await Queries.findAllMessages(
        db.chats,
        receiverId,
        limit,
        offset
      );
      return publicMessages;
    } catch (error) {
      return error;
    }
  }
}

export default ChatService;
