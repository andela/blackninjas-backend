import { check } from 'express-validator';

/**
 * A class that contains functions for all validations
 */
class Validate {
  /**
 * This return a validation chain for signup data.
 * @returns {[{ValidationChain}]}.
 */
  static signup() {
    return [
      check('firstName', 'First name should be valid.').isString(),
      check('lastName', 'Last name should be valid.').isString(),
      check('email', 'Invalid email address, example: example@gmail.com.').isEmail(),
      check('password', 'Password should be provided and must be alphanumeric with atleast 8 charactors.').isLength({ min: 8 }).isAlphanumeric(),
      check('country', 'Provided country is not valid.').isString().isLength({ min: 3 }),
      check('gender', 'Provided gender is not valid.').isString().isLength({ min: 3 }).optional(),
      check('birthday', 'Provided birthday is not valid.').isString().isLength({ min: 3 }).optional(),
      check('phoneNumber', 'Provided phone number is not valid.').isString().isLength({ min: 10, max: 13 }).optional()
    ];
  }

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

  /**
 * this function validate reset password form
 * @returns {Object} user response
 */
  static resetPassword() {
    return [
      check('password', 'Password should be provided and must be alphanumeric with atleast 8 charactors.').isLength({ min: 8 }).isAlphanumeric(),
      check('confirmPassword', 'conform Password should be provided and must be alphanumeric with atleast 8 charactors.').isLength({ min: 8 }).isAlphanumeric()
    ];
  }

  /**
   * this function send reset password link via email
   * @returns {Object} user response
   */
  static sendResetPasswordLink() {
    return [
      check('email', 'Invalid email address, example: example@gmail.com.').isEmail()
    ];
  }

  /**
 * this function validate trip requests
 * @returns {Object} user response
 */
  static tripsValidation() {
    return [
      check('From', 'origin should be valid.').isInt(),
      check('To', 'destination should be valid.').isInt(),
      check('reason', 'reason should be valid.').isString(),
      check('accommodation', 'accomodation should be valid.').isInt().optional(),

    ];
  }
}
export default Validate;
