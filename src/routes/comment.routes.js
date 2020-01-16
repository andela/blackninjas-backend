import express from 'express';
import tripController from '../controllers/trip.controller';
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
 * /trip-request/{tripRequestID}/comments:
 *    post:
 *      summary: user and manager can comment to the trip request
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: tripRequestID
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
router.post('/:tripRequestID/comments', verifyToken.headerToken, Validate.CommentValidation(), isValid, commentMiddleware.validateUserAndSubjectRelationships, tripController.createComment);


/**
 * @swagger
 * tags:
 *   name: comment
 *   description: Trips activities
 */

/**
 * @swagger
 *
 * /trip-request/{tripRequestID}/comments?page:
 *    get:
 *      summary: user and manager can view the trip request comment of
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: tripRequestID
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
router.get('/:tripRequestID/comments', verifyToken.headerToken, commentMiddleware.validateUserAndSubjectRelationships, tripController.getAllComments);

/**
 * @swagger
 *
 * /trip-request/{subjectID}/comments/{commentID}:
 *    delete:
 *      summary: user and manager can delete the trip request comment
 *      tags: [comment]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *       - name: subjectID
 *         in: path
 *         description: subject ID
 *         required: true
 *         type: string
 *       - name: commentID
 *         in: path
 *         description: comment ID
 *         required: true
 *         type: integer
 *      responses:
 *        "200":
 *          description: trip request comment schema
 */
router.delete('/:subjectID/comments/:commentID', verifyToken.headerToken, commentMiddleware.deleteCommentValidation, tripController.deleteComment);
export default router;
