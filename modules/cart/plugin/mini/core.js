/* eslint-disable radix */
import { getCartId } from '@helper_cartid';
import { useMutation } from '@apollo/client';
import { getMiniCartData } from '../../services/graphql';
import * as Schema from '../../services/graphql/schema';

const MiniCart = (props) => {
    const {
        Content, open, setOpen, count, t,
    } = props;
    const [cart, setCart] = React.useState({ items: [] });
    let loadingCart = false;
    let getCartData = () => {};
    const [actDeleteItem, delCart] = useMutation(Schema.deleteCartitem);
    const [actUpdateItem, update] = useMutation(Schema.updateCartitem);

    let cartId = '';
    const [getCart, data] = getMiniCartData();
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (cartId) {
            getCartData = () => getCart({
                variables: {
                    cartId,
                },
            });
            loadingCart = data.loading;
            React.useMemo(() => {
                if (!data.loading && data.data && data.data.cart) {
                    setCart({ ...data.data.cart });
                }
            },
            [data.loading]);
        } else {
            loadingCart = false;
        }
    }

    React.useMemo(() => {
        if (!update.loading && update.data) {
            setCart({ ...update.data.updateCartItems.cart });
        }
    },
    [update.loading]);

    React.useMemo(() => {
        if (!delCart.loading && delCart.data) {
            setCart({ ...delCart.data.removeItemFromCart.cart });
        }
    },
    [delCart.loading]);

    console.log(cart);

    if (!loadingCart && update.loading) {
        loadingCart = update.loading;
    }

    if (!loadingCart && delCart.loading) {
        loadingCart = delCart.loading;
    }

    React.useMemo(() => {
        if (open && typeof window !== 'undefined' && cartId && cartId !== '') {
            setCart({ ...{ items: [] } });
            getCartData();
            loadingCart = true;
        }
    }, [open]);

    // update items
    // update items
    const updateCart = (id, qty) => {
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(id),
                quantity: qty,
            },
            context: {
                request: 'internal',
            },
        }).then(() => {
            // getCartData();
            window.toastMessage({
                open: true,
                text: t('common:cart:updateSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('common:cart:updateFailed'),
                variant: 'error',
            });
        });
    };

    const deleteCart = (id) => {
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(id),
            },
            context: {
                request: 'internal',
            },
        }).then(() => {
            // getCartData();
            // loadingCart = false;
            window.toastMessage({
                open: true,
                text: t('common:cart:deleteSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            loadingCart = false;
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('common:cart:deleteFailed'),
                variant: 'error',
            });
        });
    };
    return (
        <Content
            open={open}
            setOpen={setOpen}
            count={count}
            loading={loadingCart}
            data={cart}
            deleteCart={deleteCart}
            updateCart={updateCart}
            t={t}
        />
    );
};

export default MiniCart;
