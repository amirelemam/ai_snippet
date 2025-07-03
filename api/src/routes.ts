import { Router } from 'express';

import healthCheck from './components/health/routes';
import snippets from './components/snippets/routes';

const router = Router();

router.use('/health', healthCheck);
router.use('/snippets', snippets);

export default router;
