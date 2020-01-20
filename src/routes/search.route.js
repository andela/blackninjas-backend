import { Router } from 'express';
import tripController from '../controllers/trip.controller';
import verifyToken from '../middlewares/verify.token.middleware';

const router = Router();

/**
 * @swagger
 * /trip-requests/search:
 *    get:
 *      summary: user and manager can search for a trip request
 *      tags: [search]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: keyword
 *         in: query
 *         description: query to search for
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: page number
 *         required: true
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: limit number
 *         required: true
 *      responses:
 *        "200":
 *          description: Search record schema
 */
router.get('/search', verifyToken.headerToken, tripController.search);

export default router;
