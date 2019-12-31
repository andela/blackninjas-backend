import express from 'express';
import tripController from '../controllers/trip.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';
import TripMiddleware from '../middlewares/trip.middleware';
import AccomodationMiddleware from '../middlewares/accomodation.middleware';
import verifyIfIsManager from '../middlewares/verify.manager.middleware';

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
 * /trip/requests/:page:
 *    get:
 *      summary: Manager get request made by his
 *      tags: [Trips]
 *      parameters:
 *      responses:
 *       200:
 *         description: "Successful operation"
 *       400:
 *         description: "Bad request"
 *       401:
 *         description: "Unauthorized"
 *       409:
 *         description: "Conflict"
 *
 * */
router.get(
  '/trip-requests',
  verifyToken.headerToken,
  verifyUser,
  verifyIfIsManager.verifyManager,
  tripController.getTripRequestsByManager
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

export default router;
