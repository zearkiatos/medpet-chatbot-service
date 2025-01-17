import express from 'express';
import webhookController from '@controllers/webhookController.js';
import healthCheckController from '@controllers/healthCheckController.js';

const router = express.Router();

router.post('/webhook', webhookController.handleIncoming);
router.get('/webhook', webhookController.verifyWebhook);
router.get('/health', healthCheckController.healthCheck);

export default router;