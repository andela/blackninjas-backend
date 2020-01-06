import express from 'express';
import tripsController from '../controllers/trips.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import checkTrip from '../middlewares/check.trip.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';


const router = express.Router();


/**
 * @swagger
 *
 * /trips/oneway:
 *    post:
 *      summary: User can create one way trip
 *      tags: [Trips]
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
 *              $ref: '#/components/schemas/trips'
 *      responses:
 *        "201":
 *          description: trip creates
 *
 * components:
 *    schemas:
 *      trips:
 *        type: object
 *        required:
 *          - From
 *          - To
 *          - reasons
 *          - accomodation
 *          - travelDate
 *        properties:
 *          From:
 *            type: string
 *          To:
 *            type: string
 *          reasons:
 *            type: string
 *          accomodation:
 *            type: string
 *          travelDate:
 *            type: string
 *
 */


router.post('/oneway', Validate.tripsValidation(), isValid, verifyToken.headerToken, verifyUser, checkTrip.checkLocations, checkTrip.checkAvailableRooms, checkTrip.checkValidAccommodation, checkTrip.checkTrip, checkTrip.checkTripType, tripsController.tripRequest);


/**
 * @swagger
 *
 * /trips/return_trip:
 *    post:
 *      summary: User can create round trip
 *      tags: [Trips]
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
 *              $ref: '#/components/schemas/trips'
 *      responses:
 *        "201":
 *          description: trip create
 *
 * components:
 *    schemas:
 *      trips:
 *        type: object
 *        required:
 *          - From
 *          - To
 *          - departureDate
 *          - returnDate
 *          - reasons
 *          - accomodationId
 *        properties:
 *          From:
 *            type: integer
 *          To:
 *            type: integer
 *          departureDate:
 *            type: string
 *          returnDate:
 *            type: string
 *          reasons:
 *            type: string
 *          accomodationId:
 *            type: integer
 *
 */

router.post('/return_trip', verifyToken.headerToken, verifyUser, checkTrip.checkIfDateisValid, checkTrip.checkLocations, checkTrip.checkAvailableRooms, checkTrip.checkValidAccommodation, checkTrip.checkTrip, checkTrip.checkTripType, tripsController.tripRequest);

export default router;
