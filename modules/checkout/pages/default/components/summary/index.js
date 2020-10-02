import React, { useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';
import { setCartId, removeCartId } from '@helper_cartid';
import { setCheckoutData } from '@helper_cookies';
import _ from 'lodash';
import { localTotalCart } from '@services/graphql/schema/local';
import SummaryPlugin from '@core_modules/cart/plugin/Summary';
import { IPAY_URL } from '@config';
import gqlService from '../../../../services/graphql';

const Summary = ({
    t,
    checkout,
    setCheckout,
    handleOpenMessage,
    formik,
    updateFormik,
    config,
    refSummary,
}) => {
    const { order: loading, all: disabled } = checkout.loading;
    const client = useApolloClient();
    const [orderId, setOrderId] = useState(null);
    const [snapOpened, setSnapOpened] = useState(false);
    const [snapClosed, setSnapClosed] = useState(false);
    const [getSnapToken, manageSnapToken] = gqlService.getSnapToken({ onError: () => {} });
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });
    const [placeOrder] = gqlService.placeOrder({ onError: () => {} });
    const [getSnapOrderStatusByOrderId, snapStatus] = gqlService.getSnapOrderStatusByOrderId({ onError: () => {} });
    const [getCustCartId, manageCustCartId] = gqlService.getCustomerCartId();
    const [mergeCart] = gqlService.mergeCart();

    const validateReponse = (response, parentState) => {
        const state = parentState;
        if ((response && response.errors) || !response) {
            state.loading.order = false;
            setCheckout(state);

            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:serverError'),
            });

            return false;
        }

        return true;
    };

    const generatesuccessRedirect = (orderNumber) => {
        if (config && config.successRedirect && config.successRedirect.link) {
            return `${config.successRedirect.link}${config.successRedirect.orderId ? `?orderId=${orderNumber}` : ''}`;
        }
        return '/checkout/onepage/success';
    };

    const generateCartRedirect = () => {
        if (config && config.cartRedirect && config.cartRedirect.link) {
            return config.cartRedirect.link;
        }
        return '/checkout/cart';
    };

    const handlePlaceOrder = async () => {
        const { cart, isGuest } = checkout.data;
        let state = { ...checkout };
        let formValidation = {};
        let result;

        state.loading.order = true;
        setCheckout(state);

        if (cart.prices.grand_total.value === 0 && (cart.selected_payment_method && cart.selected_payment_method.code !== 'free')) {
            state = { ...checkout };
            result = await setPaymentMethod({ variables: { cartId: cart.id, code: 'free' } });

            if (!validateReponse(result, state)) {
                return;
            }

            state.data.cart = result.data.setPaymentMethodOnCart.cart;
            setCheckout(state);
            updateFormik(result.data.setPaymentMethodOnCart.cart);
        }

        await formik.submitForm();
        formValidation = await formik.validateForm();

        if (_.isEmpty(formValidation)) {
            if (checkout.selected.delivery === 'pickup'
                && (checkout.error.pickupInformation || checkout.error.selectStore)) {
                state.loading.order = false;
                setCheckout(state);

                const msg = t('checkout:completePikcupInfo');
                handleOpenMessage({
                    variant: 'error',
                    text: msg,
                });
            } else {
                result = await placeOrder({ variables: { cartId: cart.id } });

                state = { ...checkout };
                state.loading.order = false;
                setCheckout(state);

                if (!validateReponse(result, state)) {
                    return;
                }

                const orderNumber = result.data.placeOrder.order.order_number;
                setCheckoutData({
                    email: isGuest ? formik.values.email : cart.email,
                    order_number: orderNumber,
                    order_id: result.data.placeOrder.order.order_id,
                });
                client.query({ query: localTotalCart, data: { totalCart: 0 } });
                await removeCartId();

                if (checkout.data.cart.selected_payment_method.code.match(/snap.*/)) {
                    setOrderId(orderNumber);
                    await getSnapToken({ variables: { orderId: orderNumber } });
                } else if (checkout.data.cart.selected_payment_method.code.match(/ovo.*/)) {
                    const ipayUrl = IPAY_URL[process.env.APP_ENV] || IPAY_URL.dev;
                    window.location.href = ipayUrl + orderNumber;
                } else {
                    handleOpenMessage({
                        variant: 'success',
                        text: t('checkout:message:placeOrder'),
                    });
                    window.location.replace(generatesuccessRedirect(orderNumber));
                }
            }
        } else {
            state.loading.order = false;
            setCheckout(state);

            const msg = checkout.data.isGuest
                ? t('checkout:message:guestFormValidation')
                : t('checkout:message:customerFormValidation');

            handleOpenMessage({
                variant: 'error',
                text: msg,
            });
        }
    };

    // Start - Manage Snap Pop Up When Opened (Waiting Response From SnapToken)
    if (manageSnapToken.data && orderId && !snapOpened) {
        const snapToken = manageSnapToken.data.getSnapTokenByOrderId.snap_token;
        snap.pay(snapToken, {
            async onSuccess() {
                window.location.replace(generatesuccessRedirect(orderId));
            },
            async onPending() {
                window.location.replace(generatesuccessRedirect(orderId));
            },
            async onError() {
                window.backdropLoader(true);
                getSnapOrderStatusByOrderId({
                    variables: {
                        orderId,
                    },
                });

                if (!checkout.data.isGuest) {
                    getCustCartId();
                }

                setSnapOpened(true);
            },
            async onClose() {
                window.backdropLoader(true);
                getSnapOrderStatusByOrderId({
                    variables: {
                        orderId,
                    },
                });

                if (!checkout.data.isGuest) {
                    getCustCartId();
                }

                setSnapOpened(true);
            },
        });
    }
    // End - Manage Snap Pop Up When Opened (Waitinge Response From SnapToken)

    // Start - Process Snap Pop Up Close (Waitinge Response From Reorder)
    if (snapStatus.data && !snapClosed) {
        const { cart_id } = snapStatus.data.getSnapOrderStatusByOrderId;
        setSnapClosed(true);

        if (!checkout.data.isGuest && manageCustCartId.data) {
            const { id: customerCartId } = manageCustCartId.data.customerCart;
            if (cart_id !== customerCartId) {
                mergeCart({
                    variables: {
                        sourceCartId: cart_id,
                        destionationCartId: customerCartId,
                    },
                }).then(async () => {
                    await setCartId(customerCartId);
                    setOrderId(null);
                    window.location.replace(generateCartRedirect());
                }).catch(() => {
                    window.location.replace(generateCartRedirect());
                });
            } else {
                setCartId(customerCartId);
                setOrderId(null);
                window.location.replace(generateCartRedirect());
            }
        } else {
            setCartId(cart_id);
            setOrderId(null);
            window.location.replace(generateCartRedirect());
        }
    }
    // End - Process Snap Pop Up Close (Waitinge Response From Reorder)

    useEffect(() => {
        if (typeof refSummary !== 'undefined') {
            // eslint-disable-next-line no-param-reassign
            refSummary.current = {
                handlePlaceOrder,
            };
        }
    }, [refSummary]);

    if (checkout && checkout.data && checkout.data.cart) {
        return (
            <>
                <div className="hidden-desktop">
                    <SummaryPlugin
                        t={t}
                        loading={loading}
                        disabled={disabled}
                        handleActionSummary={handlePlaceOrder}
                        dataCart={checkout.data.cart}
                        isDesktop={false}
                        showItems
                        label={t('checkout:placeOrder')}
                    />
                </div>
                <SummaryPlugin
                    t={t}
                    loading={loading}
                    handleActionSummary={handlePlaceOrder}
                    dataCart={checkout.data.cart}
                    disabled={disabled}
                    isDesktop
                    showItems
                    hideButton
                />
            </>
        );
    }

    return null;
};

export default Summary;
