import express from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controller';
import Validate from '../helpers/validate.helper';
import isEmailUsed from '../middlewares/auth.middleware';
import isValid from '../middlewares/validate.middleware';
import verifyToken from '../middlewares/verify.token.middleware';


const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

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
router.post('/signin', Validate.signin(), isValid, UserController.signIn);
/**
 * @swagger
 *
 * /auth/signup:
 *    post:
 *      summary: User can signup
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      responses:
 *        "201":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - gender
 *          - country
 *          - birthday
 *          - phoneNumber
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *          gender:
 *            type: string
 *          country:
 *            type: string
 *          birthday:
 *            type: string
 *          phoneNumber:
 *            type: string
 *          password:
 *            type: string
 *
 */
router.post('/signup', Validate.signup(), isValid, isEmailUsed, UserController.signup);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User activities
 */

/**
 * @swagger
 *
 * /auth/activate/{authorizations}:
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
router.get('/activate/:autorizations', verifyToken.paramToken, UserController.updatedUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/google' }), UserController.authGoogleAndFacebook);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/facebook' }), UserController.authGoogleAndFacebook);
router.get('/logout/:autorizations', verifyToken.paramToken, UserController.logout);

/**
 * @swagger
 *
 * /auth/resetpassword:
 *    patch:
 *      summary: User can reset password
 *      tags: [Users]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/reset password'
 *      responses:
 *        "201":
 *          description: Reset password schema
 *
 * components:
 *    schemas:
 *      reset password:
 *        type: object
 *        required:
 *          - password
 *          - confirmPassword
 *        properties:
 *          password:
 *            type: string
 *          confirmPassword:
 *            type: string
 *
 */

router.patch('/resetpassword', Validate.resetPassword(), isValid, verifyToken.headerToken, UserController.resetPassword);

/**
 * @swagger
 *
 * /auth/forgetpassword:
 *    post:
 *      summary: User can receive an email
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/forget password'
 *      responses:
 *        "201":
 *          description: A user schema
 *
 * components:
 *    schemas:
 *      forget password:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *
 */
router.post('/forgetpassword', Validate.sendResetPasswordLink(), isValid, UserController.sendResetPasswordLink);
export default router;
