import Dexie, { Table } from 'dexie';
import { User } from '@/models/User';
import { CV } from '@/models/CV';
import { Section } from '@/models/Section';
import { Tag } from '@/models/Tag';
import { CVTag } from '@/models/CVTag';

export class ZCVDatabase extends Dexie {
    users!: Table<User, number>;
    cvs!: Table<CV, number>;
    sections!: Table<Section, number>;
    tags!: Table<Tag, number>;
    cvTags!: Table<CVTag, number>;

    constructor() {
        super('ZCVDatabase');

        // Initial version
        this.version(1).stores({
            users: '++id, &email, username',
            cvs: '++id, userId, [userId+title], createdAt, updatedAt',
            sections: '++id, type, title',
            tags: '++id, &name',
            cvTags: '++id, [cvId+tagId]'
        });

        // Version 2 with migrations
        this.version(2)
            .stores({
                users: '++id, &email, username, createdAt, updatedAt',
                cvs: '++id, userId, [userId+title], createdAt, updatedAt, description',
                sections: '++id, type, [type+title], createdAt, updatedAt',
                tags: '++id, &name, createdAt, updatedAt',
                cvTags: '++id, [cvId+tagId], cvId, tagId'
            })
            .upgrade(async (trans) => {
                // Migration logic
                await trans
                    .table('users')
                    .toCollection()
                    .modify((user: User) => {
                        if (!user.createdAt) user.createdAt = new Date();
                        if (!user.updatedAt) user.updatedAt = new Date();
                    });
                await trans
                    .table('sections')
                    .toCollection()
                    .modify((section: Section) => {
                        if (!section.createdAt) section.createdAt = new Date();
                        if (!section.updatedAt) section.updatedAt = new Date();
                    });
                await trans
                    .table('tags')
                    .toCollection()
                    .modify((tag: Tag) => {
                        if (!tag.createdAt) tag.createdAt = new Date();
                        if (!tag.updatedAt) tag.updatedAt = new Date();
                    });
            });
    }
}

export const db = new ZCVDatabase();
