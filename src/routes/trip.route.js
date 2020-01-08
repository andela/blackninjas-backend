import express from 'express';
import tripController from '../controllers/trip.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
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
 * /trips:
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
// router.post('/', verifyToken.headerToken, Validate.tripsValidation(), isValid, verifyUser, TripMiddleware.checkIfDateisValid,
//   TripMiddleware.checkLocations, TripMiddleware.checkAvailableRooms,
//   TripMiddleware.checkValidAccommodation, TripMiddleware.checkTrip,
//   TripMiddleware.checkTripType, TripMiddleware.multiCityDataValidation,
//   tripController.combineTripsConctroller);
router.post(
  '/',
  Validate.tripsValidation(),
  isValid,
  verifyToken.headerToken,
  verifyUser,
  TripMiddleware.checkIfDateisValid,
  TripMiddleware.checkLocations,
  AccomodationMiddleware.findAccommodationByCity,
  TripMiddleware.checkTripExist, TripMiddleware.multiCityDataValidation,
  tripController.combineTripsConctroller
);
export default router;
