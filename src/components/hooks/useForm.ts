// src/components/hooks/useForm.ts

import React, { useState } from 'react';

interface FormState {
    [key: string]: any;
}

const useForm = <T extends FormState>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const resetForm = () => setValues(initialValues);

    return {
        values,
        handleChange,
        resetForm
    };
};

export default useForm;
