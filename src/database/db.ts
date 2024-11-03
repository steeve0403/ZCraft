// src/database/db.ts

import Dexie from 'dexie';

export interface CV {
    id?: number;
    title: string;
    sections: Section[];
}

export interface Section {
    id?: number;
    title: string;
    content: string;
}

class ZCraftDB extends Dexie {
    cvs: Dexie.Table<CV, number>;

    constructor() {
        super('ZCraftDB');
        this.version(1).stores({
            cvs: '++id, title',
        });

        this.cvs = this.table('cvs');
    }
}

export const db = new ZCraftDB();
