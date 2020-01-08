import express from 'express';
import tripController from '../controllers/trip.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import TripMiddleware from '../middlewares/trip.middleware';
import AccomodationMiddleware from '../middlewares/accomodation.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';

const router = express.Router();


/**
 * @swagger
 *
 * /:
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
 *          returnDate:
 *            type: string
 *          type:
 *            type: string
 *
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
  tripController.combineTripsConctroller
);

export default router;
