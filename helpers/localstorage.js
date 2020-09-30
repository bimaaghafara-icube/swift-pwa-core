import { localResolverKey } from '@config';

export const setLocalStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        let localData = data;
        if (data && data !== null) {
            localData = JSON.stringify(data);
        }
        localStorage.setItem(key, localData);
    }
    return false;
};

export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        const data = localStorage.getItem(key);
        if (data && data !== null) {
            return JSON.parse(data);
        }
        return data;
    }
    return false;
};

export const setResolver = (data) => setLocalStorage(localResolverKey, data);

export const getResolver = () => getLocalStorage(localResolverKey);

export default {
    setLocalStorage,
    getLocalStorage,
};
