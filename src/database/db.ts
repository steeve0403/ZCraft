import Dexie from 'dexie';
import { User } from '@/models/User';

export class MyAppDatabase extends Dexie {
    users: Dexie.Table<User, number>;

    constructor() {
        super('MyAppDatabase');
        this.version(1).stores({
            users: '++id, username, email, role, isEmailVerified, passwordResetToken, createdAt, updatedAt'
        });
        this.users = this.table('users');
    }
}

export const db = new MyAppDatabase();
