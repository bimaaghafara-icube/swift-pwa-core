/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { removeCheckoutData, getCheckoutData } from '@helpers/cookies';
import { getCartId } from '@helpers/cartId';
import { formatPrice } from '@helpers/currency';
import Layout from '@layout';
import Head from 'next/head';
import { modules } from '@config';
import gqlService from '../../services/graphql';

const Checkout = (props) => {
    const {
        t,
        storeConfig,
        isLogin,
        config,
        pageConfig,
        Content,
    } = props;
    let { cartId } = props;
    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }
    const { snap_is_production, snap_client_key } = storeConfig;
    const configPage = {
        title: t('checkout:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('checkout:pageTitle'),
        bottomNav: false,
        pageType: 'checkout',
    };

    const url = snap_is_production === '1' ? modules.checkout.snapUrl.prod : modules.checkout.snapUrl.dev;

    const [checkout, setCheckout] = useState({
        order_id: '',
        data: {
            cart: null,
            customer: null,
            shippingMethods: [],
            paymentMethod: [],
            isGuest: false,
            isCouponAppliedToCart: false,
            rewardPoints: {},
            credit: 0,
            message: {
                open: false,
                text: 'default',
                variant: '',
            },
            defaultAddress: null,
            summary: {
                prices: null,
                items: null,
                shipping_addresses: null,
            },
        },
        selected: {
            address: null,
            shipping: {
                name: { carrier_code: null, method_code: null },
                price: null,
            },
            payment: null,
            billing: null,
            delivery: 'home',
        },
        loading: {
            all: true,
            addresses: false,
            shipping: false,
            payment: false,
            billing: false,
            order: false,
            coupon: false,
            storeCredit: false,
            giftCard: false,
        },
        status: {
            addresses: false,
            openAddressDialog: false,
            backdrop: false,
        },
        pickupInformation: {},
        selectStore: {},
        error: {
            pickupInformation: false,
            selectStore: false,
        },
    });

    // start init graphql
    const [getCustomer, manageCustomer] = gqlService.getCustomer();
    const [getCart, { data: dataCart, error: errorCart }] = gqlService.getCart();
    const [getRewardPoint, rewardPoint] = gqlService.getRewardPoint();
    // end init graphql

    const CheckoutSchema = Yup.object().shape({
        email: checkout.data.isGuest ? Yup.string().nullable().email(t('validate:email:wrong')).required(t('validate:email.required')) : null,
        address: Yup.object().nullable().required(t('validate:required')),
        shipping: checkout.selected.delivery === 'home' && Yup.object().nullable().required(t('validate:required')),
        payment: Yup.string().nullable().required(t('validate:required')),
        billing: Yup.object().nullable().required(t('validate:required')),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            coupon: '',
            giftCard: '',
            address: null,
            shipping: null,
            payment: null,
            billing: null,
            delivery: 'home',
        },
        validationSchema: CheckoutSchema,
        onSubmit: () => {},
    });

    const updateFormik = (cart) => {
        const [address] = cart.shipping_addresses ? cart.shipping_addresses : null;
        const shipping = address && address.selected_shipping_method;
        const { email } = cart;
        const payment = cart.selected_payment_method && cart.selected_payment_method.code;
        const billing = cart.billing_address;

        if (!email && _.isEmpty(formik.values.email)) {
            formik.setFieldValue('email', email || '');
        }

        if (cart.applied_coupons) {
            const [coupon] = cart.applied_coupons;
            formik.setFieldValue('coupon', coupon.code);
        }

        formik.setFieldValue('address', address);
        formik.setFieldValue('shipping', shipping);
        formik.setFieldValue('payment', payment);
        formik.setFieldValue('billing', billing);
    };

    const initData = () => {
        const { cart } = dataCart;
        const state = { ...checkout };

        if (cart.items.length === 0) {
            window.location.replace(config.cartRedirect && config.cartRedirect.link ? config.cartRedirect.link : '/checkout/cart');
        }

        const { customer } = state.data.isGuest ? {} : manageCustomer.data;
        const [address] = customer
            ? customer.addresses.filter((item) => item.default_shipping)
            : [null];

        state.data.defaultAddress = customer ? address : null;

        // init cart & customer
        state.data.customer = customer;
        state.data.cart = cart;

        // init coupon
        state.data.isCouponAppliedToCart = cart.applied_coupons || false;

        // init shipping address
        const [shipping] = cart.shipping_addresses ? cart.shipping_addresses : null;

        if (shipping) {
            state.selected.address = {
                firstname: shipping.firstname,
                lastname: shipping.lastname,
                city: shipping.city,
                region: shipping.region,
                country: shipping.country,
                postcode: shipping.postcode,
                telephone: shipping.telephone,
                street: shipping.street,
            };
        } else if (!state.data.isGuest && address) {
            state.selected.address = {
                firstname: address.firstname,
                lastname: address.lastname,
                city: address.city,
                region: {
                    label: address.region.region,
                },
                postcode: address.postcode,
                telephone: address.telephone,
                street: address.street,
            };
        }

        // init shipping method
        if (shipping && shipping.available_shipping_methods) {
            const availableShipping = shipping.available_shipping_methods.filter((x) => x.available && x.carrier_code !== 'pickup');
            state.data.shippingMethods = availableShipping.map((item) => ({
                ...item,
                label: `${item.method_title} ${item.carrier_title}`,
                value: {
                    name: { carrier_code: item.carrier_code, method_code: item.method_code },
                    price: formatPrice(item.amount.value, item.amount.currency),
                },
            }));
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            state.selected.shipping = {
                name: { carrier_code: shippingMethod.carrier_code, method_code: shippingMethod.method_code },
                price: formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency),
            };
        }

        // init payment method
        if ((shipping && shipping.selected_shipping_method && cart.available_payment_methods)) {
            state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                ...method,
                label: method.title,
                value: method.code,
                image: null,
            }));
        } else if (checkout.selected.delivery === 'pickup') {
            state.data.paymentMethod = cart.available_payment_methods.map((method) => ({
                ...method,
                label: method.title,
                value: method.code,
                image: null,
            }));
        }

        if (cart.selected_payment_method) {
            state.selected.payment = cart.selected_payment_method.code;
        }

        if (rewardPoint && rewardPoint.data && rewardPoint.data.customerRewardPoints) {
            state.data.rewardPoints = rewardPoint.data.customerRewardPoints;
        }
        state.loading.all = false;

        setCheckout(state);
        updateFormik(cart);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cdt = getCheckoutData();
            if (cdt) removeCheckoutData();
        }
    }, []);

    useEffect(() => {
        setCheckout({
            ...checkout,
            loading: {
                ...checkout.loading,
                all: true,
            },
            data: {
                ...checkout.data,
                isGuest: !isLogin,
            },
        });

        if (!manageCustomer.data && isLogin) {
            getCustomer();
            getRewardPoint();
        }

        const loadCart = isLogin ? manageCustomer.data && !dataCart : !dataCart;

        if (loadCart) {
            getCart({ variables: { cartId } });
        }

        if (errorCart) {
            window.location.replace('/checkout/cart');
        }

        if (dataCart) {
            initData();
        }
    }, [manageCustomer.data, dataCart]);

    const handleOpenMessage = async ({ variant, text }) => {
        const state = { ...checkout };
        window.toastMessage({
            open: true,
            variant,
            text,
        });
        setCheckout(state);
    };

    const chasbackMessage = t('checkout:cashbackInfo').split('$');

    const contentProps = {
        formik,
        checkout,
        handleOpenMessage,
        chasbackMessage,
        updateFormik,
        setCheckout,
        manageCustomer,
    };

    return (

        <Layout pageConfig={configPage || pageConfig} {...props}>
            <Head>
                <script
                    type="text/javascript"
                    src={url}
                    data-client-key={snap_client_key}
                />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Content
                {...contentProps}
                {...props}
                modules={modules}
            />
        </Layout>
    );
};

export default Checkout;
