import express from 'express';

import {
  createRequest,
  markInProgress,
  completeRequest,
  cancelRequest,
  listRequests,
  cancelInProgressRequests
} from '../controllers/request.controller';

const router = express.Router();

router.post('/', createRequest);
router.post('/:id/progress', markInProgress);
router.post('/:id/complete', completeRequest);
router.post('/:id/cancel', cancelRequest);
router.get('/', listRequests);
router.post('/cancel-in-progress', cancelInProgressRequests);

export default router;