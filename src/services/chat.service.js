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
      console.log("chatData", error.message);
      return error;
    }
  }

  /**
   * get Private Message
   * @param { Integer } sender .
   * @param { Integer } receiver .
   * @returns { Promise } Returns a list of messages
   */
  static async getPrivateMessage(sender, receiver) {
    try {
      const privateMessages = Queries.getPrivateMessage(
        db.chats,
        sender,
        receiver
      );
      return privateMessages;
    } catch (error) {
      return error;
    }
  }

  /**
   * get Public Message
   * @returns { Promise } Returns a list of Public messages
   */
  static async getPublicMessage() {
    try {
      const condition = { receiverId: null };
      const publicMessages = Queries.findAllRecord(db.chats, condition);
      return publicMessages;
    } catch (error) {
      return error;
    }
  }
}

export default ChatService;
