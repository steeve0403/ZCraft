import Dexie from 'dexie';
export async function entityExists<T>(
    table: Dexie.Table<T, number>,
    id: number
): Promise<boolean> {
    const entity = await table.get(id);
    return !!entity;
}
