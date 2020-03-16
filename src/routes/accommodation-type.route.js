import express from 'express';
import Accommodation from '../controllers/accomodation.controller';
import verifyUser from '../middlewares/verify.user.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import AccomodationMiddleware from '../middlewares/accomodation.middleware';


const router = express.Router();

/**
 * @swagger
 *
 * /accomodationType:
 *    get:
 *      summary: Trip-administration can get all accommodation types
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
 *      responses:
 *        "201":
 *          description: accomodation schema
 */
router.get('/', verifyToken.headerToken, verifyUser, AccomodationMiddleware.checkIfRequesterIsAdmin, Accommodation.getAllAccommodationTypes);

/**
 * @swagger
 *
 * /accomodationType/id:
 *    get:
 *      summary: Get accommodation rooms type
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
 *      responses:
 *        "200":
 *          description: accomodation schema
 */
router.get('/:accommodationId', verifyToken.headerToken, verifyUser, Accommodation.getAccomodationRoomsType);

export default router;
