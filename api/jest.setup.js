// @ts-check
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { getLogger } = require('./src/common/logger');

let mongoServer;

// Enhanced logging and error handling for database connection
const connectToMemoryDB = async () => {
    const logger = getLogger();
    try {
        // Check if already connected
        if (mongoose.connection.readyState === 1) {
            logger.info('Already connected to database');
            return mongoose.connection;
        }

        // Create memory server
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        // Ensure clean disconnection before connecting
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        // Connect with robust options
        const connection = await mongoose.connect(mongoUri, {
            socketTimeoutMS: 30000,
            serverSelectionTimeoutMS: 5000,
        });

        logger.info('Successfully connected to in-memory MongoDB');
        return connection;
    } catch (error) {
        const logger = getLogger();
        logger.error('Failed to connect to in-memory MongoDB:', error);
        throw error;
    }
};

beforeAll(async () => {
    const logger = getLogger();
    try {
        await connectToMemoryDB();
    } catch (error) {
        logger.error('Setup failed:', error);
        process.exit(1);
    }
});

afterEach(async () => {
    const logger = getLogger();
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    } catch (error) {
        logger.warn('Error clearing collections:', error);
    }
});

afterAll(async () => {
    const logger = getLogger();
    try {
        await mongoose.disconnect();
        if (mongoServer) {
            await mongoServer.stop();
            logger.info('In-memory MongoDB server stopped');
        }
    } catch (error) {
        logger.error('Teardown error:', error);
    }
});

module.exports = {
    connectToMemoryDB,
};