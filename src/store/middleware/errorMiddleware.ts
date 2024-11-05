import { State, StateCreator } from 'zustand';

export const errorMiddleware =
    <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) =>
        config(
            (args) => {
                try {
                    set(args);
                } catch (error) {
                    console.error('An error occurred in the store:', error);
                    // Optionally, set a global error state here
                }
            },
            get,
            api
        );
