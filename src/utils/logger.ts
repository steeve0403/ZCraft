import log from 'loglevel';

log.setLevel('info');

export enum LogLevel {
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

interface LogMessage {
    level: LogLevel;
    message: string;
    context?: string;
}

export const Logger = {
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
    setLevel: (level: log.LogLevelDesc) => {
        log.setLevel(level);
    }
};
