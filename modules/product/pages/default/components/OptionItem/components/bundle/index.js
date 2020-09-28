/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { localTotalCart } from '@services/graphql/schema/local';
import {
    addConfigProductsToCart, getBundleProduct, getGuestCartId as queryGetGuestCartId, getCustomerCartId,
} from '../../../../../../services/graphql';

export default (props) => {
    const {
        t,
        data: {
            sku,
        },
        loading,
        BundleView,
        Footer,
    } = props;
    const client = useApolloClient();
    const [qty, setQty] = React.useState(1);
    const handleQty = (event) => {
        setQty(event.target.value);
    };

    const configProduct = getBundleProduct(sku);

    let cartId = '';
    let isLogin = 0;

    if (typeof window !== 'undefined') {
        isLogin = getLoginInfo();
        cartId = getCartId();
    }

    const [addCartConfig] = addConfigProductsToCart();
    const [getGuestCartId] = queryGetGuestCartId();
    const cartUser = getCustomerCartId();

    const [error, setError] = React.useState({});

    const handleAddToCart = async () => {

    };

    return (
        <BundleView data={configProduct} loading={loading} t={t} />
    );
};
