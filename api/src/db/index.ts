import mongoose from 'mongoose';
import logger from '../common/logger';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let connection: typeof mongoose | null = null;

const connectDB = async (skipIfNoUrl = false) => {
    try {
        if (!process.env.DATABASE_URL) {
            if (skipIfNoUrl) {
                logger.warn(
                    'DATABASE_URL not set, skipping database connection',
                );
                return null;
            }
            throw new Error('DATABASE_URL is not set');
        }
        connection = await mongoose.connect(process.env.DATABASE_URL as string);
        logger.info(`MongoDB connected: ${connection.connection.host}`);
        return connection;
    } catch (err) {
        logger.error('MongoDB connection error:', err);
        throw err;
    }
};

const disconnectDB = async () => {
    if (connection) {
        await connection.disconnect();
        connection = null;
        logger.info('MongoDB disconnected');
    }
};

export { connectDB, disconnectDB };
