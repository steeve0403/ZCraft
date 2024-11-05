export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error'
}

interface LogOptions {
    level: LogLevel;
    message: string;
    context?: string;
    error?: Error;
}

export class Logger {
    static log({ level, message, context, error }: LogOptions): void {
        const timestamp = new Date().toISOString();
        let logMessage = `[${timestamp}] [${level.toUpperCase()}]`;

        if (context) {
            logMessage += ` [${context}]`;
        }

        logMessage += `: ${message}`;

        if (error) {
            logMessage += `\nError Stack: ${error.stack}`;
        }

        switch (level) {
            case LogLevel.DEBUG:
            case LogLevel.INFO:
                console.log(logMessage);
                break;
            case LogLevel.WARN:
                console.warn(logMessage);
                break;
            case LogLevel.ERROR:
                console.error(logMessage);
                break;
        }
    }
}

// Usage Example
// Logger.log({
//     level: LogLevel.INFO,
//     message: 'User registered successfully.',
//     context: 'AuthService',
// });
