import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const getChildrenImage = (url: string): string => {
    return `/uploads/children/${url}`;
};

const getDataFromLocalStorage = (key: string, initialValue: any) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
};

const saveDataToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const removeDataFromLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

export {
    fetcher,
    getChildrenImage,
    getDataFromLocalStorage,
    saveDataToLocalStorage,
    removeDataFromLocalStorage,
};
