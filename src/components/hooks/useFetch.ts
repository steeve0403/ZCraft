// src/components/hooks/useFetch.ts

import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

const useFetch = <T,>(url: string) => {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: T = await response.json();
                setState({ data, loading: false, error: null });
            } catch (error: any) {
                setState({ data: null, loading: false, error: error.message });
            }
        };

        fetchData();
    }, [url]);

    return state;
};

export default useFetch;
