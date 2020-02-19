import express from 'express';
import userManagement from '../middlewares/user-manager.middleware';
import userController from '../controllers/user.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyAdmin from '../middlewares/admin.verify.middleware';
import verifyUser from '../middlewares/verify.user.middleware';

const router = express.Router();


/**
 * @swagger
 *
 * /user-managements:
 *    get:
 *      summary: Get all users with their managers
 *      tags: [User Management]
 *      parameters:
 *       - in: header
 *         name: token
 *         description: token of the admin
 *         required: true
 *         type: string
 *       - in: query
 *         name: page
 *         description: page number
 *         required: true
 *         type: string
 *       - in: query
 *         name: limit
 *         description: limit of rows retrieved
 *         required: true
 *         type: string
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
router.get('/', verifyToken.headerToken, verifyUser, verifyAdmin, userController.getUsersWithManagers);

/**
 * @swagger
 *
 * /user-managements/managers:
 *    get:
 *      summary: Get all managers
 *      tags: [User Management]
 *      parameters:
 *       - in: header
 *         name: token
 *         description: token of the admin
 *         required: true
 *         type: string
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
router.get('/managers', verifyToken.headerToken, verifyUser, verifyAdmin, userController.getAllManagers);

/**
 * @swagger
 *
 * /user-managements/users/{userId}:
 *   patch:
 *     summary: User managements
 *     description: Admin assign user to managers
 *     tags:
 *       - User Management
 *     parameters:
 *      - in: header
 *        name: token
 *        description: token of the admin
 *        required: true
 *        type: string
 *      - in: path
 *        name: userId
 *        description: useri d to assign a manager
 *        required: true
 *        type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               managerId:
 *                 type: number
 *     produces:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               message:
 *                 type: string
 *               data:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userId:
 *                     type: number
 *                   managerId:
 *                     type: number
 *     responses:
 *       200:
 *         description: success
 *       400:
 *         description: error
 */

router.patch('/users/:userId', verifyToken.headerToken, verifyUser, verifyAdmin, userManagement.checkIfUserExistAndNotAdmin, userManagement.checkIfManagerExist, userController.assignUserToManager);


export default router;
