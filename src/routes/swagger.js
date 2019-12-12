import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import options from '../swagger/index';

const router = express.Router();

const specs = swaggerJsdoc(options);
router.use('/docs', swaggerUi.serve);
router.get(
  '/docs',
  swaggerUi.setup(specs, {
    explorer: true
  })
);

export default router;
