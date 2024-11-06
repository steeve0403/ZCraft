export interface AuditLog {
    id?: number;
    userId: number;
    action: string;
    timestamp: Date;
    details?: string;
}
