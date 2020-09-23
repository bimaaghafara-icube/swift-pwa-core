import Cookies from 'js-cookie';
import server from 'next-cookies';
import { nameCheckoutCookie, expiredDefault, nameGlobalCookie } from '@config';

export const getCheckoutData = () => {
    const data = Cookies.getJSON(nameCheckoutCookie);
    return data;
};

export const getCheckoutDataFromRequest = (ctx) => {
    const data = server(ctx);
    return data[nameCheckoutCookie];
};

export const setCheckoutData = (data) => {
    Cookies.set(nameCheckoutCookie, data, { expires: expiredDefault });
    return true;
};

export const removeCheckoutData = () => {
    Cookies.remove(nameCheckoutCookie);
    return true;
};

export const getCookies = (key) => {
    const data = Cookies.getJSON(nameGlobalCookie);
    if (data && data[key]) {
        return data[key];
    }
    return '';
};

export const getCookiesFromRequest = (ctx, key) => {
    const data = server(ctx);
    return data[nameGlobalCookie][key];
};

export const setCookies = (key, data) => {
    const oldData = Cookies.getJSON(nameGlobalCookie);
    Cookies.set(nameGlobalCookie, { ...oldData, [key]: data }, { expires: expiredDefault });
    return true;
};

export const removeCookies = (key) => {
    const data = Cookies.getJSON(nameGlobalCookie);
    delete data[key];
    Cookies.set(nameGlobalCookie, { ...data }, { expires: expiredDefault });
    return true;
};

const set = (key, value) => {
    const maxChar = 1000;
    const str = JSON.stringify(value);
    if (str.length > maxChar) {
        let subKeys = '';
        for (let i = 0; i < str.length; i += maxChar) {
            Cookies.set(`__${key}_${i}`, str.slice(i, i + maxChar), { expires: expiredDefault });
            subKeys += i + maxChar >= str.length ? i : `${i},`;
            if (i + maxChar >= str.length) {
                Cookies.set(`__${key}_subKeys`, JSON.stringify(subKeys), { expires: expiredDefault });
            }
        }
    } else {
        Cookies.set(key, str, { expires: expiredDefault });
    }
};

const get = (key) => {
    const subKeys = Cookies.getJSON(`__${key}_subKeys`);
    if (subKeys) {
        const str = subKeys.split(',').reduce((result, subKey) => result + Cookies.getJSON(`__${key}_${subKey}`), '');
        return JSON.parse(str || null);
    }
    return JSON.parse(Cookies.getJSON(key) || null);
};

const remove = (key) => {
    const subKeys = Cookies.getJSON(`__${key}_subKeys`);
    if (subKeys) {
        subKeys.split(',').forEach((subKey) => Cookies.remove(`__${key}_${subKey}`));
        Cookies.remove(`__${key}_subKeys`);
    } else {
        Cookies.remove(key);
    }
};

export default {
    set, get, remove,
};
