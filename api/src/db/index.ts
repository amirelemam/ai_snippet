import mongoose from 'mongoose';
import logger from '../common/logger';

class DatabaseConnection {
    private static instance: typeof mongoose | null = null;

    static async connect() {
        if (this.instance) {
            return this.instance;
        }

        try {
            this.instance = await mongoose.connect(process.env.DATABASE_URL!, {
                maxPoolSize: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE) : 10,
                minPoolSize: process.env.DB_MIN_POOL_SIZE ? parseInt(process.env.DB_MIN_POOL_SIZE) : 2,
                socketTimeoutMS: process.env.DB_SOCKET_TIMEOUT_MS ? parseInt(process.env.DB_SOCKET_TIMEOUT_MS) : 45000,
                serverSelectionTimeoutMS: process.env.DB_SERVER_SELECTION_TIMEOUT_MS ? parseInt(process.env.DB_SERVER_SELECTION_TIMEOUT_MS) : 5000,
            });

            logger.info('MongoDB connected successfully');

            mongoose.connection.on('disconnected', () => {
                logger.info('MongoDB disconnected');
            });

            return this.instance;
        } catch (error) {
            logger.error('MongoDB connection error:', error);
            throw error;
        }
    }

    static async disconnect() {
        if (this.instance) {
            await mongoose.disconnect();
            this.instance = null;
        }
    }
}

export default DatabaseConnection;
