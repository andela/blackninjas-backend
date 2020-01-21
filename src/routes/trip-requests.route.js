import express from 'express';
import tripController from '../controllers/trip.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import tripRequestValidation from '../middlewares/comment.validation.middleware';
import requestMiddleware from '../middlewares/request.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
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
  '/',
  verifyToken.headerToken,
  verifyUser,
  verifyIfIsManager.verifyManager,
  tripController.getTripRequestsByManager
);

/**
 * @swagger
 *
 * /trip/trip-requests/{tripRequestId}:
 *    patch:
 *      summary: Manager can approve or reject
 *      tags: [Trips]
 *      parameters:
 *       - name: tripRequestId
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
 *              $ref: '#/components/schemas/status'
 *      responses:
 *        "200":
 *           description: trip request schema
 *
 * components:
 *    schemas:
 *      status:
 *        type: object
 *        required:
 *          - status
 *        properties:
 *          status:
 *            type: string
 *
 */

router.patch(
  '/:tripRequestId',
  verifyToken.headerToken,
  verifyUser, requestMiddleware.checkIfUserIsManager,
  requestMiddleware.checkIfRequestFound,
  requestMiddleware.checkIfUsersManager,
  requestMiddleware.checkIfBodyIsValid,
  requestMiddleware.checkIfAlreadyChanged,
  tripController.updateTripRequestStatus
);
/**
 * @swagger
 *
 * /trip-requests/{tripRequestID}:
 *    get:
 *      summary: user can get a specific trip request
 *      tags: [Trips]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: tripRequestID
 *         in: path
 *         description: get a specific trip request
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *           description: trip request schema
 *
 */
router.get(
  '/:tripRequestID', verifyToken.headerToken,
  tripRequestValidation.validateUserAndSubjectRelationships, tripController.getTripRequest
);
/**
 * @swagger
 *
 * /trip-requests/{tripRequestId}:
 *    patch:
 *      summary: Manager can approve or reject
 *      tags: [Trips]
 *      parameters:
 *       - name: tripRequestId
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
 *              $ref: '#/components/schemas/status'
 *      responses:
 *        "200":
 *           description: trip request schema
 *
 * components:
 *    schemas:
 *      status:
 *        type: object
 *        required:
 *          - status
 *        properties:
 *          status:
 *            type: string
 *
 */

router.patch(
  '/:tripRequestId',
  verifyToken.headerToken,
  verifyUser, requestMiddleware.checkIfUserIsManager,
  requestMiddleware.checkIfRequestFound,
  requestMiddleware.checkIfUsersManager,
  requestMiddleware.checkIfBodyIsValid,
  requestMiddleware.checkIfAlreadyChanged,
  tripController.updateTripRequestStatus
);

export default router;
