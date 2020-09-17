/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import cookies from 'js-cookie';
import { expiredToken } from '@config';

export const setLastPathWithoutLogin = (path) => {
    cookies.set('lastPathNoAuth', path);
    return true;
};

export const getLastPathWithoutLogin = () => {
    const path = cookies.get('lastPathNoAuth');
    if (path && typeof type !== 'undefined' && path !== '') {
        return path;
    }
    return '/customer/account';
};

export const removeLastPathWithoutLogin = () => {
    cookies.remove('lastPathNoAuth');
};

export const setLogin = (isLogin = 0, expired) => {
    cookies.set('isLogin', isLogin, { expires: expired || expiredToken });
    return 0;
};

export const getLoginInfo = () => {
    const isLogin = cookies.get('isLogin');
    return parseInt(isLogin) || 0;
};

export const removeIsLoginFlagging = () => {
    cookies.remove('isLogin');
};
