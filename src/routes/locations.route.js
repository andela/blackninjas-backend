import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import locationsController from '../controllers/lacations.controller';

const router = express.Router();
/**
 * @swagger
 *
 * /most-travelled:
 *    get:
 *      summary: Get most traveled locations
 *      tags: [Locations]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Most traveled locations
 *      components:
 *          schemas:
 *            location:
 *              type: object
 *              required:
 *                - city
 *                - travelledTimes
 *              properties:
 *                city:
 *                  type: string
 *                travelledTimes:
 *                  type: intiger
 */
router.get('/most-travelled', verifyToken.headerToken, locationsController.getMostTraveledLocations);
export default router;
