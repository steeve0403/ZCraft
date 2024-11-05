import { BaseService } from './BaseService';
import { Logger, LogLevel } from '@/utils/logger';

export class ServiceWrapper extends BaseService {
    constructor(context: string) {
        super(context);
    }

    async wrap<T>(fn: () => Promise<T>): Promise<T> {
        return this.execute(async () => {
            try {
                const result = await fn();
                Logger.log({
                    level: LogLevel.INFO,
                    message: `Operation successful in ${this.context}`,
                    context: this.context
                });
                return result;
            } catch (error) {
                if (error instanceof Error) {
                    Logger.log({
                        level: LogLevel.ERROR,
                        message: `Operation failed in ${this.context}: ${error.message}`,
                        context: this.context
                    });
                } else {
                    Logger.log({
                        level: LogLevel.ERROR,
                        message: `Operation failed in ${this.context}: Unknown error`,
                        context: this.context
                    });
                }
                throw error;
            }
        });
    }
}
