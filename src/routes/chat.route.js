import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import chatController from '../controllers/chat.controller';
import verifyUser from '../middlewares/verify.user.middleware';

const router = express.Router();

/**
 * @swagger
 *
 * /messages:
 *  get:
 *    tags:
 *      - Chat
 *    summary: Get Public and Private Messages
 *    description: User check
 *    operationId: Get All Messages From All Users
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: token
 *        description: Returning User To Who what to get messages
 *        required: true
 *        type: string
 *        format: int64
 *      - in: path
 *        name: userId
 *        description: User Id
 *        required: true
 *        type: integer
 *    responses:
 *      '200':
 *        description: successful operation
 *      '404':
 *        description: Unsuccessful User not found
 *      '500':
 *        description: Internal Server error
 * */
router.get('/:userId', verifyToken.headerToken, verifyUser, chatController.getMessages);
router.get('/', verifyToken.headerToken, verifyUser, chatController.getMessages);

export default router;
