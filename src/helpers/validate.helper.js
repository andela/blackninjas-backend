import { check } from 'express-validator';

/**
 * A class that contains functions for all validations
 */
class Validate {
  /**
 * Adds two numbers together.
 * @returns {[{ValidationChain}]}.
 */
  static signup() {
    return [
      check('firstname', 'Provided first name is not valid.').isString(),
      check('lastname', 'Provided last name is not valid.').isString(),
      check('email', 'Invalid email address, example: example@gmail.com.').isEmail(),
      check('password', 'Invalid password, your password should be alphanumeric with atleast 8 charactors.').isLength({ min: 8 }).isAlphanumeric(),
      check('country', 'Provided country is not valid.').isString(),
      check('gender', 'Provided gender is not valid.').isString(),
      check('birthday', 'Provided birthday is not valid.').isString()
    ];
  }
}

export default Validate;
