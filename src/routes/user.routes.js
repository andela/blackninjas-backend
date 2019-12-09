import express from 'express';
import UserController from '../controllers/user.conntroller';
import verifyToken from '../middlewares/verify.token.middleware';


const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User activate
 */

/**
 * @swagger
 *
 * /activate/{authorizations}:
 *   get:
 *     tags:
 *       - Users
 *     name: Activate user
 *     summary: Activate a user
 *     description: Activet user account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: authorizations
 *         in: path
 *         description: Check token authentication
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "Successful operation"
 *       400:
 *         description: "Bad request"
 *       401:
 *         description: "Unauthorized"
 *       409:
 *         description: "Conflict"
 *
 */
router.get('/activate/:autorizations', verifyToken, UserController.updatedUser);

export default router;
