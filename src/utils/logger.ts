import log from 'loglevel';

// Configure the log level (can be adjusted based on environment)
log.setLevel('info');

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

interface LogMessage {
    level: LogLevel;
    message: string;
    context?: string;
}

export const Logger = {
    /**
     * Logs a message with a specified level and context.
     * @param message - The log message containing level, message, and context.
     */
    log: (message: LogMessage) => {
        const { level, message: msg, context } = message;
        const formattedMessage = context ? `[${context}] ${msg}` : msg;

        switch (level) {
            case LogLevel.INFO:
                log.info(formattedMessage);
                break;
            case LogLevel.WARN:
                log.warn(formattedMessage);
                break;
            case LogLevel.ERROR:
                log.error(formattedMessage);
                break;
            default:
                log.info(formattedMessage);
        }
    },
    /**
     * Sets the logging level.
     * @param level - The desired log level.
     */
    setLevel: (level: log.LogLevelDesc) => {
        log.setLevel(level);
    }
};

