import express from 'express';
import verifyToken from '../middlewares/verify.token.middleware';
import notificationController from '../controllers/notification.controller';
import Validate from '../helpers/validate.helper';
import isValid from '../middlewares/validate.middleware';

const router = express.Router();
/**
 * @swagger
 *
 * /:
 *    get:
 *      summary: Get notifications for a logged in user
 *      tags: [Notification]
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
 *              $ref: '#/components/schemas/notifications'
 *      responses:
 *        "201":
 *          description: user's notifications
 */
router.get('/', verifyToken.headerToken, notificationController.getUserNotifications);
/**
 * @swagger
 *
 * /notifications/1:
 *  get:
 *    tags:
 *      - Users
 *    summary: get a notification
 *    produces:
 *      - application/json
 *    parameters:
 *       - name: token
 *         in: header
 *         description: Check token authentication
 *         required: true
 *         type: string
 *    responses:
 *      '200':
 *        description: successful operation
 * */
router.get('/:id', verifyToken.headerToken, notificationController.getNotificationById);
/**
 * @swagger
 *
 * /notifications/changePreference:
 *    patch:
 *      summary: User can change notification preference
 *      tags: [Notification]
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
 *              $ref: '#/components/schemas/User preference'
 *      responses:
 *        "201":
 *          description: Notification preference
 *
 * components:
 *    schemas:
 *      User preference:
 *        type: object
 *        required:
 *          - appNotification
 *          - emailNotification
 *        properties:
 *          appNotification:
 *            type: string
 *          emailNotification:
 *            type: string
 */
router.patch('/changePreference', Validate.userPreference(), isValid, verifyToken.headerToken, notificationController.changePreference);
/**
 * @swagger
 *
 * /notifications:
 *    patch:
 *      summary: Mark all notifications as read
 *      tags: [Notification]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check authentication
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Successfully marked all notifications as read.
 */
router.patch('/', Validate.validateOnUpdateNotification(), isValid, verifyToken.headerToken, notificationController.updateNotificationsStatus);
/**
 * @swagger
 *
 * /notifications/{id}:
 *    patch:
 *      summary: Mark a notification as read
 *      tags: [Notification]
 *      parameters:
 *       - name: token
 *         in: header
 *         description: Check authentication
 *         required: true
 *         type: string
 *       - name: id
 *         in: path
 *         description: Notification id
 *         required: true
 *         type: string
 *      responses:
 *        "200":
 *          description: Successfully marked a notification as read.
 */
router.patch('/:notificationID', Validate.validateOnUpdateNotification(), isValid, verifyToken.headerToken, notificationController.updateNotificationStatus);
export default router;
