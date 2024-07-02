import { useEffect, useState } from "react";

function useCustomLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            setValue(JSON.parse(storedValue));
        }
    }, [key]);

    const updateValue = (newValue: T) => {
        localStorage.setItem(key, JSON.stringify(newValue));
        setValue(newValue);
    };

    const removeValue = () => {
        localStorage.removeItem(key);
        setValue(initialValue); // Reset state to initial value after removing from localStorage
    };

    return [value, updateValue, removeValue] as const;
}

export default useCustomLocalStorage;
