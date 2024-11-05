import { handleServiceError } from '@/utils/errorHandler';

export abstract class BaseService {
    protected context: string;

    constructor(context: string) {
        this.context = context;
    }

    protected async execute<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (error) {
            handleServiceError(error, this.context);
        }
    }
}
