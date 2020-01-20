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

  /**
     * create an accomodation Room
     * @param { Object } newRoom accomodation room
     * @returns {array} data the data to be returned.
     */
  static async createRoom(newRoom) {
    return db.rooms.bulkCreate(newRoom);
  }

  /**
     * find an accomodation Rooms
     * @param { Integer } accomodationId room accomodationId
     * @returns {array} data the data to be returned.
     */
  static async findRooms(accomodationId) {
    return Queries.findAllRecord(db.rooms, { accomodationId });
  }
}

export default room;
