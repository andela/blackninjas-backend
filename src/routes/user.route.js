import express from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller';
import Validate from '../helpers/validate.helper';
import isEmailUsed from '../middlewares/auth.middleware';
import isValid from '../middlewares/validate.middleware';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';
import '../config/passport.config';

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
router.post('/signin', Validate.signin(), isValid, userController.signIn);
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
router.post('/signup', Validate.signup(), isValid, isEmailUsed, userController.signup);
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

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/google' }), userController.authGoogleAndFacebook);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/facebook' }), userController.authGoogleAndFacebook);

router.get('/activate/:autorizations', verifyToken.paramToken, userController.updatedUser);

/**
 * @swagger
 *
 * /auth/logout:
 *    get:
 *      summary: User can reset password
 *      tags: [Users]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *      responses:
 *        "201":
 *          description: Reset password schema
 *
 */
router.patch('/logout', verifyToken.headerToken, userController.logout);
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

router.patch('/resetpassword', Validate.resetPassword(), isValid, verifyToken.headerToken, userController.resetPassword);

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
router.post('/forgetpassword', Validate.sendResetPasswordLink(), isValid, userController.sendResetPasswordLink);
router.get('/activate/:autorizations', verifyToken, userController.updatedUser);
/**
 * @swagger
 *
 * /auth/profile:
 *  get:
 *    tags:
 *      - Users
 *    summary: Users profile settings
 *    description: Barefoot Nomad User is able to access their Barefoot Nomad profile
 *    operationId: GetUserProfile
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: userEmail
 *        in: token
 *        description: ID of user to return a profile
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
router.get('/profile', verifyToken.headerToken, verifyUser, userController.viewProfile);

/**
 * @swagger
 *
 * /auth/profile:
 *  patch:
 *    tags:
 *      - Users
 *    summary: Users profile settings
 *    description: User gets a user profile upon successful registration to Barefoot Nomad
 *      and is able to update/edit
 *    operationId: CreateUserProfile
 *    requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: john
 *               lastName:
 *                 type: string
 *                 example: doe
 *               password:
 *                 type: string
 *                 example: password
 *               gender:
 *                 type: string
 *                 example: male
 *               preferredCurrency:
 *                 type: string
 *                 example: "$"
 *               preferredLanguage:
 *                 type: string
 *                 example: English
 *               department:
 *                 type: string
 *                 example: IT
 *               birthDate:
 *                 type: string
 *                 example: 14/10/1990
 *               address:
 *                 type: string
 *                 example: 14, Jeremiah Ugwu, Lekki, Lagos
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: header
 *        name: token
 *        description: Returning User To Update users role
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

router.patch('/profile', verifyToken.headerToken, verifyUser, userController.editProfile);
export default router;
