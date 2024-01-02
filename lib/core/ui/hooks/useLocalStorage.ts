import { useState, useEffect } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
    const [value, setValue] = useState<any>(initialValue);

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) setValue(JSON.parse(storedValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [
        value,
        (value: any) => {
            setValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        },
    ];
};
export const useLocalStorageNotInitial = (key: string, initialValue: any) => {
    const [value, setValue] = useState<any>();

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) setValue(JSON.parse(storedValue));
        else setValue(initialValue);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [
        value,
        (value: any) => {
            setValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        },
    ];
};