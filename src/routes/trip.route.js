import express from 'express';
import tripController from '../controllers/trip.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';
import TripMiddleware from '../middlewares/trip.middleware';
import AccomodationMiddleware from '../middlewares/accomodation.middleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Trips
 *   description: Trips activities
 */

/**
 * @swagger
 *
 * /trip:
 *    post:
 *      summary: User can request a trip
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
 *              $ref: '#/components/schemas/tripRequest'
 *      responses:
 *        "201":
 *          description: trips schema
 *
 * components:
 *    schemas:
 *      tripRequest:
 *        type: object
 *        required:
 *          - From
 *          - To
 *          - departureDate
 *          - accomodationId
 *        properties:
 *          From:
 *            type: integer
 *          To:
 *            type: integer
 *          departureDate:
 *            type: string
 *          accomodationId:
 *            type: integer
 */
router.post(
  '/',
  Validate.tripsValidation(),
  isValid,
  verifyToken.headerToken,
  verifyUser,
  TripMiddleware.checkIfDateisValid,
  TripMiddleware.checkLocations,
  AccomodationMiddleware.findAccommodationByCity,
  TripMiddleware.checkTripExist,
  TripMiddleware.multiCityDataValidation,
  tripController.combineTripsConctroller
);


/**
 * @swagger
 *
 * /trips/my-trip-requests:
 *   get:
 *     summary: User can see all requests he/she submitted to barefoot nomad
 *     tags: [Trips]
 *     description: All User Requests
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: page
 *         in: path
 *         description: page number
 *         required: true
 *         type: string
 *     responses:
 *        "201":
 *          description: trips schema
 *
 */
router.get('/my-trip-requests', verifyToken.headerToken, verifyUser, tripController.getTripRequestsByUser);
/**
 * @swagger
 *
 * /trips/{tripId}:
 *    patch:
 *      summary: user should be able to edit trip
 *      tags: [Trips]
 *      parameters:
 *       - name: tripId
 *         in: path
 *         description: Update that specific request
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
 *              $ref: '#/components/schemas/tripRequest'
 *      responses:
 *        "200":
 *           description: trip request schema
 *
 * components:
 *    schemas:
 *      tripRequest:
 *        type: object
 *        required:
 *          - From
 *          - To
 *          - departureDate
 *          - accomodationId
 *        properties:
 *          From:
 *            type: integer
 *          To:
 *            type: integer
 *          departureDate:
 *            type: string
 *          accomodationId:
 *            type: integer
 */

router.patch(
  '/:tripId',
  Validate.tripsValidation(),
  isValid,
  verifyToken.headerToken,
  verifyUser,
  TripMiddleware.checkTripRequestStatus,
  TripMiddleware.checkIfDateisValid,
  TripMiddleware.checkLocations,
  AccomodationMiddleware.findAccommodationByCity,
  TripMiddleware.multiCityDataValidation,
  tripController.redirectTripFunctionsByType

);

// swagger

router.get('/trip-statistics', verifyToken.headerToken, verifyUser, tripController.getTripStatistics);

export default router;
