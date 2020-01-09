import Queries from './Queries';
import db from '../database/models';

/** */
class room {
  /**
     * find room status
     * @param { Integer } roomId room id
     * @returns { boolean } true or false
     */
  static async findRoom(roomId) {
    return Queries.findOneRecord(db.rooms, { id: roomId });
  }
}

export default room;
