import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import tripController from '../controllers/trip.controller';

const router = express.Router();

/**
 * @swagger
 *
 * /trip-statistics:
 *    get:
 *      summary: user and manager can search
 *      tags: [statistics]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: startDate
 *         in: query
 *         description: query to search for
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Search record schema
 */

router.get('/trip-statistics', verifyToken.headerToken, verifyUser, tripController.getTripStatistics);

export default router;
