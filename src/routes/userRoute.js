import express from 'express';
import userController from '../controllers/userController';
import Validate from '../helpers/validate';
import isvalid from '../middlewares/Validate';


const router = express.Router();
/**
 * @swagger
 *
 * /auth/signin:
 *   post:
 *     security: []
 *     summary: User SignIn
 *     description: Logs in an existing User
 *     tags:
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   token:
 *                     type: string
 *     responses:
 *       200:
 *         description: success
 */
router.post('/signin', Validate.signin(), isvalid, userController.signIn);

export default router;
