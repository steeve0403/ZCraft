import Dexie from 'dexie';
import { User } from '@/models/User';
import { AuditLog } from '@/models/AuditLog';

export class ZCraftDB extends Dexie {
    users: Dexie.Table<User, number>;
    auditLogs: Dexie.Table<AuditLog, number>;

    constructor() {
        super('ZCraftDB');
        this.version(1).stores({
            users: '++id, username, email, role, isEmailVerified, passwordResetToken, passwordResetTokenExpiry, emailVerificationToken, emailVerificationTokenExpiry, createdAt, updatedAt, *profile',
            auditLogs: '++id, userId, action, timestamp'
        });
        this.users = this.table('users');
        this.auditLogs = this.table('auditLogs');
    }
}

export const db = new ZCraftDB();
