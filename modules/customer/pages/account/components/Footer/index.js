import { removeIsLoginFlagging } from '@helpers/auth';
import { removeCartId } from '@helpers/cartId';
import { useApolloClient } from '@apollo/client';
import Router from 'next/router';
import { localTotalCart } from '@services/graphql/schema/local';
import Cookies from 'js-cookie';
import {
    custDataNameCookie,
} from '@config';
import { removeToken as deleteToken } from '../../../../services/graphql';

export default ({
    t, isLogin, storeConfig, FooterView, modules,
}) => {
    const { aw_blog_general_enabled: blog } = storeConfig;
    const client = useApolloClient();
    const [deleteTokenGql] = deleteToken();
    const handleLogout = () => {
        deleteTokenGql().then(() => {
            Cookies.remove(custDataNameCookie);
            removeIsLoginFlagging();
            removeCartId();
            client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
            Router.push('/customer/account/login');
        }).catch(() => {
            //
        });
    };
    return <FooterView blog={blog} t={t} isLogin={isLogin} handleLogout={handleLogout} modules={modules} />;
};
