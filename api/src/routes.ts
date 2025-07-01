import { Router } from 'express';

import healthCheck from './components/health/routes';

const router = Router();

router.use('/health', healthCheck);

export default router;
