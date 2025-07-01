import logger from './common/logger';
import app from './app';

app.listen(
  app.get('port'),
  () => logger.info(`Server running on port ${app.get('port')}`),
);

export default app;
