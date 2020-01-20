import express from 'express';
import Accommodation from '../controllers/accomodation.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';
import AccomodationMiddleware from '../middlewares/accomodation.middleware';

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
 * /accommodation/accommodationID:
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
 * * components:
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
export default router;
