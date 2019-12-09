import { check } from 'express-validator';
/**
 * Class is for validating all users
 */
class Validate {
  /**
   * validating User Inputs
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static signin() {
    return [
      // username must be an email
      check('email', 'Invalid email address, example: example@gmail.com.').isEmail(),
      // password must be at least 5 chars long
      check('password', 'Invalid password, your password should be alphanumeric with atleast 8 charactors.').isLength({ min: 8 }).isAlphanumeric()
    ];
  }
}
export default Validate;
