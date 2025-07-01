import winston from 'winston';

const { combine, errors, json, colorize, printf } = winston.format;

const customLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'blue',
        verbose: 'white',
        debug: 'white',
        silly: 'white',
    },
};

winston.addColors(customLevels.colors);

const addAppNameFormat = winston.format((info: any) => {
    const infoFormatted = { ...info };
    infoFormatted.app = 'UPC Workbench';
    return infoFormatted;
});

let loggerInstance: winston.Logger | null = null;

export function getLogger(): winston.Logger {
    if (!loggerInstance) {
        loggerInstance = winston.createLogger({
            format: combine(
                errors({ stack: true }),
                winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
                addAppNameFormat(),
                json(),
                colorize(),
                printf(
                    ({ timestamp, level, message, stack }) =>
                        `${timestamp} - ${level}: ${
                            level === '\x1B[31merror\x1B[39m'
                                ? `${stack}`
                                : `${message}`
                        }`,
                ),
            ),
            transports: [
                new winston.transports.Console({
                    level: process.env.LOG_LEVEL || 'debug',
                }),
            ],
        });
    }
    return loggerInstance;
}

export default getLogger();
