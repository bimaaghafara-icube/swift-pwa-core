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

export default {};
