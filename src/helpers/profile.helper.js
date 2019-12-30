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
      firstName,
      lastName, country,
      gender, birthdate,
      preferredlanguage,
      preferredcurrency,
      place, department, profileImage
    } = userData;
    return {
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
      profileImage
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
    if (!user) {
      return response.errorMessage(res, 'Profile not found', 404);
    }
    const userProfile = this.chooseProfileData(email, user);
    return response.successMessage(res, 'User Profile', 200, userProfile);
  }
}
export default ProfileHelper;
