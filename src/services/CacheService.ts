export class CacheService<T> {
    private cache: Map<string, { data: T; expiry: number }> = new Map();
    private ttl: number;

    constructor(ttlSeconds: number) {
        this.ttl = ttlSeconds * 1000;
        this.startCleanup();
    }

    set(key: string, value: T): void {
        const expiry = Date.now() + this.ttl;
        this.cache.set(key, { data: value, expiry });
    }

    get(key: string): T | undefined {
        const cachedItem = this.cache.get(key);
        if (cachedItem && cachedItem.expiry > Date.now()) {
            return cachedItem.data;
        } else {
            this.cache.delete(key);
            return undefined;
        }
    }

    private startCleanup(): void {
        setInterval(() => {
            const now = Date.now();
            this.cache.forEach((value, key) => {
                if (value.expiry <= now) {
                    this.cache.delete(key);
                }
            });
        }, this.ttl);
    }
}