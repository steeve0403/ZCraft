import { Table } from 'dexie';
import { User } from '@/models/User';

export const addHooks = (db: any) => {
    const addUserHooks = (users: Table<User, number>) => {
        users.hook('creating', (primKey, obj) => {
            obj.createdAt = new Date();
            obj.updatedAt = new Date();
        });

        users.hook('updating', (modifications) => {
            if ('updatedAt' in modifications) {
                modifications.updatedAt = new Date();
            }
        });
    };
    addUserHooks(db.users);
};
