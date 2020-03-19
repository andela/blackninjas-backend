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

  /**
   * Validate user preference data
   * @returns {[{ValidationChain}]}.
   */
  static userPreference() {
    return [
      check('appNotification', 'App notification need to be boolean').isBoolean(),
      check('emailNotification', 'Email notification need to be boolean').isBoolean()
    ];
  }

  /**
   * Validate when updating notification
   * @returns {[{ValidationChain}]}.
   */
  static validateOnUpdateNotification() {
    return [
      check('isRead', 'isRead needs to be a boolean').isBoolean(),
    ];
  }

  /**
   * This method validate a comment on trip request
   * @returns { Object } user message
   */
  static CommentValidation() {
    return [
      check('comment', 'Comment should be valid.').isLength({ min: 3 }).isString()
    ];
  }

  /**
 * this function validate creating accomodation
 * @returns {Object} user response
 */
  static accomodationValidation() {
    return [
      check('accommodationName', 'accomodation name should be valid.').isString(),
      check('description', 'accomodation description should be valid.').isString().optional(),
      check('locationId', 'accommodation location should be valid.').isInt(),
      check('owner', 'owner name should be valid.').isString(),
      check('category', 'accomodation category should be valid.').isString().optional(),
      check('images', 'images should be valid.').isArray().optional(),
      check('rooms', 'rooms should be valid.').isArray().optional(),
      check('services', 'accomodation services should be valid.').isArray().optional(),
      check('amenities', 'accomodation amenities should be valid.').isArray().optional(),
    ];
  }

  /**
   * This method validate a booking an accommodation facility request
   * @returns {[{ValidationChain}]}.
   */
  static bookingValidation() {
    return [
      check('tripId', 'tripId needs to be a number').isInt(),
      check('accommodationId', 'accommodationId needs to be a number').isInt(),
      check('roomTypeId', 'roomTypeId needs to be a number').isInt(),
      check('departureDate', 'departureDate needs to be a date format').toDate(),
      check('checkoutDate', 'checkoutDate needs to be a date format').toDate(),
    ];
  }

  /**
   * This method validate a like or unlike accommodation request
   * @returns { Object } user message
   */
  static likeOrUnlikeValidation() {
    return [
      check('isLike', 'isLike needs to be a boolean').isBoolean(),
    ];
  }
}
export default Validate;
