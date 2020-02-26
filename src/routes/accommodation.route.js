import express from 'express';
import Accommodation from '../controllers/accomodation.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';
import AccomodationMiddleware from '../middlewares/accomodation.middleware';
import commentMiddleware from '../middlewares/comment.validation.middleware';

const router = express.Router();

/**
 * @swagger
 *
 * /accomodation:
 *    post:
 *      summary: Trip-administration can create an accomodation
 *      tags: [Accommodations]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tripRequest'
 *      responses:
 *        "201":
 *          description: accomodation schema
 *
 * components:
 *    schemas:
 *      tripRequest:
 *        type: object
 *        required:
 *          - name
 *          - description
 *          - locationId
 *          - owner
 *          - category
 *          - images
 *          - rooms
 *        properties:
 *          name:
 *            type: string
 *          description:
 *            type: string
 *          locationId:
 *            type: integer
 *          owner:
 *            type: string
 *          category:
 *            type: string
 *          images:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                imageUrl:
 *                   type: string
 *          rooms:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                nameRoom:
 *                   type: string
 *                typeId:
 *                   type: integer
 *                price:
 *                   type: integer
 *                currency:
 *                   type: string
 *                status:
 *                   type: string
 */
router.post('/', verifyToken.headerToken, verifyUser, AccomodationMiddleware.verifyTravelAdminAndSupplier, Validate.accomodationValidation(), isValid, Accommodation.createAccomodation);
router.get('/:accomodationId', verifyToken.headerToken, verifyUser, Accommodation.getAccomodation);
/**
 * @swagger
 *
 * /booking:
 *    patch:
 *      summary: Book an accommodation
 *      tags: [Accommodation]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check authentication
 *         required: true
 *         type: string
 *      responses:
 *        "201":
 *          description: Booking was successfully processed.
 *
 * components:
 *    schemas:
 *      booking:
 *        type: object
 *        required:
 *          - accommodationId
 *          - roomTypeId
 *          - departureDate
 *          - checkoutDate
 *        properties:
 *          userId:
 *            type: integer
 *          accommodationId:
 *            type: integer
 *          roomTypeId:
 *            type: integer
 *          departureDate:
 *            type: string
 *          checkoutDate:
 *            type: string
 */
router.post('/booking', Validate.bookingValidation(), isValid, verifyToken.headerToken, AccomodationMiddleware.validateDates, AccomodationMiddleware.checkBookingFacilitiesAvailability, Accommodation.bookAccommodation);

/**
 * @swagger
 * tags:
 *   name: comment
 *   description: Accommodation activities
 */

/**
 * @swagger
 *
 * /accommodations/{subjectID}/comments:
 *    post:
 *      summary: All users can comment to an Accommodation
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: subjectID
 *         in: path
 *         description: Accommodation ID
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Accommodationcomment'
 *      responses:
 *        "201":
 *          description: Accommodation comment schema
 *
 * components:
 *    schemas:
 *      Accommodationcomment:
 *        type: object
 *        required:
 *          - comment
 *        properties:
 *          comment:
 *            type: string
 */
router.post(
  '/:subjectID/comments', verifyToken.headerToken, Validate.CommentValidation(),
  isValid, commentMiddleware.validateSubjectId, commentMiddleware.validateSubjectAvailability,
  AccomodationMiddleware.checkIfUserBookedThatAccomodation, Accommodation.createAccomodationComment
);


/**
 * @swagger
 * tags:
 *   name: comment
 *   description: Accommodation activities
 */

/**
 * @swagger
 *
 * /accommodations/{subjectID}/comments:
 *    get:
 *      summary: All users can view Accommodation comments of
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: subjectID
 *         in: path
 *         description: Accommodation ID
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: page number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: limit number
 *         required: true
 *      responses:
 *        "200":
 *          description: Accommodation comment schema
 */
router.get('/:subjectID/comments', verifyToken.headerToken, commentMiddleware.validateSubjectId, commentMiddleware.validateSubjectAvailability, Accommodation.getAccommodationComments);

/**
 * @swagger
 *
 * /accommodations/{subjectID}/comments/{commentID}:
 *    delete:
 *      summary: All users can delete an Accommodation comment
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: subjectID
 *         in: path
 *         description: subject ID
 *         required: true
 *         type: string
 *       - name: commentID
 *         in: path
 *         description: comment ID
 *         required: true
 *         type: integer
 *      responses:
 *        "200":
 *          description: Accommodation comment schema
 */
router.delete('/:subjectID/comments/:commentID', verifyToken.headerToken, commentMiddleware.validateSubjectId, commentMiddleware.validateSubjectAvailability, commentMiddleware.deleteCommentValidation, Accommodation.deleteAccommodationComment);

/**
 * @swagger
 *
 * /accommodations/{accommodationId}/ratings:
 *    post:
 *      summary: user should be to rate an accommodation
 *      tags: [Accommodations]
 *      parameters:
 *       - name: accomodationId
 *         in: path
 *         description: rate that specific accomodation
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rate'
 *      responses:
 *        "201":
 *           description: rate create successfully
 *
 * components:
 *    schemas:
 *      rate:
 *        type: object
 *        required:
 *          - rate
 *        properties:
 *          rate:
 *            type: integer
 */

router.post('/:accommodationId/ratings', verifyToken.headerToken, verifyUser, AccomodationMiddleware.checkValidAccomodationRates, AccomodationMiddleware.checkIfUserBookedThatAccomodation, Accommodation.rateAccomodation);
/**
 * @swagger
 *
 * /accommodations/{accommodationId}/ratings:
 *    patch:
 *      summary: user should be to update accommodation rate
 *      tags: [Accommodations]
 *      parameters:
 *       - name: accomodationId
 *         in: path
 *         description: rate that specific accomodation
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/rate'
 *      responses:
 *        "200":
 *           description: rate updated successfully
 *
 * components:
 *    schemas:
 *      rate:
 *        type: object
 *        required:
 *          - rate
 *        properties:
 *          rate:
 *            type: integer
 */

router.patch('/:accommodationId/ratings', verifyToken.headerToken, verifyUser, AccomodationMiddleware.checkValidAccomodationRates, AccomodationMiddleware.checkIfUserBookedThatAccomodation, Accommodation.updateAccomodationRate);
/**
 * @swagger
 *
 * /accommodations/{accommodationId}/ratings:
 *    get:
 *      summary: user should get rate of an accommodation
 *      tags: [Accommodations]
 *      parameters:
 *       - name: accomodationId
 *         in: path
 *         description: id of the accommodation
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *           description: get rate successfully
 */
router.get('/:accommodationId/ratings', verifyToken.headerToken, verifyUser, Accommodation.getAccommodationRate);
/**
 * @swagger
 *
 * /accommodations/{accommodationId}/average-ratings:
 *    get:
 *      summary: user should get average rate of an accommodation
 *      tags: [Accommodations]
 *      parameters:
 *       - name: accomodationId
 *         in: path
 *         description: id of the accommodation
 *         required: true
 *         type: string
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *           description: get average rate successfully
 */
router.get('/:accommodationId/average-ratings', verifyToken.headerToken, verifyUser, AccomodationMiddleware.checkIfAccommodationIdExist, Accommodation.getAverageRatings);

/**
 * @swagger
 *
 * /accommodation/accommodationID:
 *    patch:
 *      summary: Like or unlike an accommodation
 *      tags: [Accommodation]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check authentication
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Like was successfully processed.
 */
router.patch('/:accommodationId', Validate.likeOrUnlikeValidation(), isValid, verifyToken.headerToken, Accommodation.likeOrUnlike);
/**
 * @swagger
 *
 * /accommodation/accommodationID/like-status:
 *    get:
 *      summary: Check if user has already like or unlike an accommodation
 *      tags: [Accommodation]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check authentication
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Check if user has already like or unlike an accommodation.
 */
router.get('/:accommodationId/like-status', isValid, verifyToken.headerToken, Accommodation.checkIfUserLikedOrUnlikedAccommodation);
router.get('/located/:userDesination', verifyToken.headerToken, Accommodation.getAccomodationsByDestination);
export default router;
