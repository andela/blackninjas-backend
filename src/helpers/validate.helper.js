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
}
export default Validate;
