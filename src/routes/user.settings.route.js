import express from 'express';
import userController from '../controllers/user.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyAdmin from '../middlewares/admin.verify.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import chatController from '../controllers/chat.controller';

const router = express.Router();


/**
 * @swagger
 *
 * /users/:userId/settings:
 *  patch:
 *    tags:
 *      - Users
 *    summary: Admin Can Update User Role And Permission
 *    description: Admin Update User Role by his Email to Barefoot Nomad
 *      and send data after updating
 *    operationId: UpdateUserRole
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               email:
 *                 type: string
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: token
 *        description: Returning User To Update users role
 *        required: true
 *        type: string
 *        format: int64
 *      - in: path
 *        name: userId
 *        description: User Id that will update role
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
router.patch('/:userId/settings', verifyToken.headerToken, verifyUser, verifyAdmin, userController.updateRole);
router.get('/', verifyToken.headerToken, verifyUser, verifyAdmin, userController.getUsers);

/**
 * @swagger
 *
 * /users/messages:
 *  get:
 *    tags:
 *      - Users
 *    summary: user can get list of all users and their online status
 *    description: User check
 *    operationId: Get All Messages From All Users
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: token
 *        description: Returning User Who what to get All Chat messages
 *        required: true
 *        type: string
 *        format: int64
 *    responses:
 *      '200':
 *        description: successful operation
 *      '404':
 *        description: Unsuccessful User not found
 *      '500':
 *        description: Internal Server error
 * */
router.get('/messages', verifyToken.headerToken, verifyUser, chatController.getAllUsers);

export default router;
