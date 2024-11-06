import { Logger, LogLevel } from '@/utils/logger';

interface ServiceResponse<T> {
    data: T | null;
    error: string | null;
}

export class ServiceWrapper {
    /**
     * Exécute une fonction de service et gère les erreurs.
     * @param serviceFn - Fonction de service à exécuter.
     * @param context - Contexte ou nom du service pour le logging.
     * @returns Une promesse contenant les données ou une erreur.
     */
    static async executeService<T>(
        serviceFn: () => Promise<T>,
        context: string = 'Service'
    ): Promise<ServiceResponse<T>> {
        try {
            Logger.log({
                level: LogLevel.INFO,
                message: `Exécution de ${context}`,
                context
            });
            const data = await serviceFn();
            Logger.log({
                level: LogLevel.INFO,
                message: `${context} réussi.`,
                context
            });
            return { data, error: null };
        } catch (error: any) {
            let errorMessage = 'Une erreur inconnue est survenue.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            Logger.log({
                level: LogLevel.ERROR,
                message: `${context} échoué: ${errorMessage}`,
                context
            });
            return { data: null, error: errorMessage };
        }
    }
}
