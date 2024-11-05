// src/store/middleware/logger.ts

import { State, StateCreator } from 'zustand';

export const logger =
    <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) =>
        config(
            (args) => {
                console.log('  Previous state:', get());
                set(args);
                console.log('  Next state:', get());
            },
            get,
            api
        );
