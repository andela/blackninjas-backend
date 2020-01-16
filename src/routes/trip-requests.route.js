
import express from 'express';
import tripController from '../controllers/trip.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import tripRequestValidation from '../middlewares/comment.validation.middleware';


const router = express.Router();
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

export default router;
