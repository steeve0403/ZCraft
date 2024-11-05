import { db } from '@/database/db';
import Dexie, { IndexableType, UpdateSpec } from 'dexie';

/**
 * Executes a transaction on the specified tables.
 * @param mode - The transaction mode ('r' for read, 'rw' for read/write).
 * @param tables - The tables to include in the transaction.
 * @param transactionFn - The function to execute within the transaction.
 * @returns The result of the transaction function.
 */
export async function executeTransaction<T>(
    mode: Dexie.TransactionMode,
    tables: Table<any, any>[],
    transactionFn: () => Promise<T>
): Promise<T> {
    return Dexie.transaction(mode, tables, transactionFn);
}

/**
 * Checks if an entity exists in a table by a given key.
 * @param table - The Dexie table.
 * @param key - The key to search for.
 * @param value - The value of the key.
 */
export async function entityExists<T>(
    table: Dexie.Table<T, number>,
    key: keyof T,
    value: T[keyof T]
): Promise<boolean> {
    const count = await table
        .where(String(key))
        .equals(value as IndexableType)
        .count();
    return count > 0;
}

/**
 * Inserts or updates an entity in a table.
 * @param table - The Dexie table.
 * @param entity - The entity to insert or update.
 */
export async function upsertEntity<T>(
    table: Dexie.Table<T, number>,
    entity: T
): Promise<void> {
    await table.put(entity);
}

/**
 * Deletes an entity from a table by a given key.
 * @param table - The Dexie table.
 * @param key - The key of the entity to delete.
 */
export async function deleteEntity<T>(
    table: Dexie.Table<T, number>,
    key: number
): Promise<void> {
    await table.delete(key);
}

/**
 * Retrieves all entities from a table.
 * @param table - The Dexie table.
 */
export async function getAllEntities<T>(
    table: Dexie.Table<T, number>
): Promise<T[]> {
    return table.toArray();
}

/**
 * Retrieves an entity by its ID.
 * @param table - The Dexie table.
 * @param id - The ID of the entity.
 */
export async function getEntityById<T>(
    table: Dexie.Table<T, number>,
    id: number
): Promise<T | undefined> {
    return table.get(id);
}

/**
 * Updates an entity in the table.
 * @param table - The Dexie table.
 * @param id
 * @param changes
 */
export async function updateEntity<T>(
    table: Dexie.Table<T, number>,
    id: number,
    changes: UpdateSpec<T>
): Promise<void> {
    await table.update(id, changes);
}

/**
 * Retrieves entities by a specific index.
 * @param table - The Dexie table.
 * @param index - The index to search by.
 * @param value - The value of the index.
 */
export async function getEntitiesByIndex<T>(
    table: Dexie.Table<T, number>,
    index: keyof T,
    value: T[keyof T]
): Promise<T[]> {
    return table
        .where(String(index))
        .equals(value as IndexableType)
        .toArray();
}
