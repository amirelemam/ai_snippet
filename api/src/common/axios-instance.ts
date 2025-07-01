import axios, {  AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import logger from './logger';

const instance = axios.create({
  timeout: 60000,
  validateStatus(status: number) {
    return (status >= 200 && status < 300) || (status >= 400 && status < 500);
  },
});

instance.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  logger.info(`Req: ${req.method?.toUpperCase()} ${req.url}`);
  return req;
});

instance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: any) => Promise.reject(error),
);

export default instance;
