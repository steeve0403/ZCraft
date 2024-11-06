import { Logger, LogLevel } from '@/utils/logger';
import { handleError } from '@/utils/errorHandler';
import { AppError } from '@/models/AppError';

interface ServiceResponse<T> {
    data: T | null;
    error: AppError | null;
}

export class ServiceWrapper {
    /**
     * Executes a service function and handles errors.
     * @param serviceFn - The service function to execute.
     * @param context - Context or name of the service for logging.
     * @returns A promise containing the data or an error.
     */
    static async executeService<T>(
        serviceFn: () => Promise<T>,
        context: string = 'Service'
    ): Promise<ServiceResponse<T>> {
        try {
            Logger.log({
                level: LogLevel.INFO,
                message: `Executing ${context}`,
                context
            });
            const data = await serviceFn();
            Logger.log({
                level: LogLevel.INFO,
                message: `${context} succeeded.`,
                context
            });
            return { data, error: null };
        } catch (error: any) {
            const appError = handleError(error);
            Logger.log({
                level: LogLevel.ERROR,
                message: `${context} failed: ${appError.message}`,
                context
            });
            return { data: null, error: appError };
        }
    }
}
