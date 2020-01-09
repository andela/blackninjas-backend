import express from 'express';
import comment from '../controllers/comment.controller';
import commentMiddleware from '../middlewares/comment.validation.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: comment
 *   description: Trips activities
 */

/**
 * @swagger
 *
 * /trip-request/comment/{tripId}:
 *    post:
 *      summary: user and manager can comment to the trip request
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: tripId
 *         in: path
 *         description: trip request ID
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tripRequestcomment'
 *      responses:
 *        "201":
 *          description: trip request comment schema
 *
 * components:
 *    schemas:
 *      tripRequestcomment:
 *        type: object
 *        required:
 *          - comment
 *        properties:
 *          comment:
 *            type: string
 */
router.post('/comment/:tripId', verifyToken.headerToken, Validate.tripRequestCommentValidation(), isValid, commentMiddleware.validateTipIdAndUserId, comment.createTripRequestComment);

/**
 * @swagger
 * tags:
 *   name: comment
 *   description: Trips activities
 */

/**
 * @swagger
 *
 * /trip-request/comment/{tripId}/view?page:
 *    get:
 *      summary: user and manager can view the trip request comment of
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: tripId
 *         in: path
 *         description: trip request ID
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: limit number
 *         required: true
 *      responses:
 *        "200":
 *          description: trip request comment schema
 */
router.get('/comment/:tripId/view', verifyToken.headerToken, commentMiddleware.validateTipIdAndUserId, comment.viewTripRequestComment);

router.delete('/comment/:commentId/delete', verifyToken.headerToken, commentMiddleware.deleteCommentValidation, comment.deleteTripRequestComment);
export default router;
