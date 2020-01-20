import Queries from './Queries';
import db from '../database/models';

/** */
class Image {
  /**
     * save an image
     * @param { Object } newImage contains imageUrl and recordId
     * @returns {array} data the data to be returned.
     */
  static async saveImage(newImage) {
    const condition = { imageUrl: newImage.imageUrl, recordId: newImage.recordId, imageType: newImage.imageType };
    return Queries.findOrCreate(db.image, newImage, condition);
  }

  /**
     * find an accomodation Image
     * @param { Integer } accomodationId image accomodationId
     * @returns {array} data the data to be returned.
     */
  static async findImages(accomodationId) {
    return Queries.findAllRecord(db.image, { recordId: accomodationId });
  }
}

export default Image;
