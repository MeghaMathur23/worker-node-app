import express from 'express';
import workerEvent from './workerevent/worker';

const router = express.Router();

router.use('/worker',workerEvent)

export default router;
