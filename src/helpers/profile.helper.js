import UserServices from '../services/user.service';
import response from './response.helper';

/**
 * This class contains functions for all user to view and update profile.
 */
class ProfileHelper {
  /**
 * service to choose profile to edit
 // eslint-disable-next-line valid-jsdoc
 * @param {Object} email user request
 * @param {Object} userData user request
 * @returns {Object} return user message
 */
  static chooseProfileData(email, userData) {
    const {
      id,
      firstName,
      lastName, country,
      gender, birthdate,
      preferredlanguage,
      preferredcurrency,
      place, department, profileImage, appNotification, emailNotification
    } = userData;
    return {
      id,
      email,
      firstName,
      lastName,
      country,
      gender,
      birthdate,
      preferredlanguage,
      preferredcurrency,
      place,
      department,
      profileImage,
      appNotification,
      emailNotification
    };
  }

  /**
   * service to choose profile to edit
   * @param {Object} email The request object
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async getProfileData(email, req, res) {
    const user = await UserServices.findUserByEmail(email);
    const userProfile = this.chooseProfileData(email, user);
    return response.successMessage(res, 'User Profile', 200, userProfile);
  }
}
export default ProfileHelper;
