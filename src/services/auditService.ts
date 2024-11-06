import { db } from '@/database/db';
import { AuditLog } from '@/models/AuditLog';
import { ServiceWrapper } from '@/services/serviceWrapper';
import { Logger, LogLevel } from '@/utils/logger';

export class AuditService {
    /**
     * Logs an action performed by a user.
     * @param userId - ID of the user performing the action.
     * @param action - Description of the action.
     * @param details - Additional details about the action.
     */
    async logAction(
        userId: number,
        action: string,
        details?: string
    ): Promise<void> {
        await ServiceWrapper.executeService(async () => {
            const auditLog: AuditLog = {
                userId,
                action,
                timestamp: new Date(),
                details
            };
            await db.auditLogs.add(auditLog);
        }, 'AuditService.logAction').then((response) => {
            if (response.error) {
                Logger.log({
                    level: LogLevel.ERROR,
                    message: `Failed to log audit action: ${response.error.message}`,
                    context: 'AuditService.logAction'
                });
            } else {
                Logger.log({
                    level: LogLevel.INFO,
                    message: `Audit action logged: ${action}`,
                    context: 'AuditService.logAction'
                });
            }
        });
    }

    /**
     * Retrieves all audit logs.
     * @returns An array of audit logs.
     */
    async getAuditLogs(): Promise<AuditLog[]> {
        return await ServiceWrapper.executeService(async () => {
            return db.auditLogs.toArray();
        }, 'AuditService.getAuditLogs').then((response) => {
            if (response.error) {
                throw new Error(response.error.message);
            }
            return response.data as AuditLog[];
        });
    }
}
