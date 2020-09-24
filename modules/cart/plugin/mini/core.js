/* eslint-disable radix */
import { getCartId } from '@helper_cartid';
import { useMutation } from '@apollo/client';
import { getMiniCartData } from '../../services/graphql';
import * as Schema from '../../services/graphql/schema';

const MiniCart = (props) => {
    const {
        Content, open, setOpen, count, t,
    } = props;
    let dataCart = {};
    let loadingCart = false;
    let getCartData = () => {};
    const [actDeleteItem, delCart] = useMutation(Schema.deleteCartitem);
    const [actUpdateItem, update] = useMutation(Schema.updateCartitem);

    let cartId = '';
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (cartId) {
            const [getCart, data] = getMiniCartData(cartId);
            getCartData = getCart;
            loadingCart = data.loading;
            if (data.data) {
                dataCart = data.data.cart;
            }
        } else {
            loadingCart = false;
        }
    }

    if (!loadingCart && update.loading) {
        loadingCart = update.loading;
    }

    if (!loadingCart && delCart.loading) {
        loadingCart = delCart.loading;
    }

    React.useEffect(() => {
        if (open) {
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
            getCartData();
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
            getCartData();
            loadingCart = false;
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
            Content={Content}
            open={open}
            setOpen={setOpen}
            count={count}
            loading={loadingCart}
            data={dataCart}
            deleteCart={deleteCart}
            updateCart={updateCart}
            t={t}
        />
    );
};

export default MiniCart;
