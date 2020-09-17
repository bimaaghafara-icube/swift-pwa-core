import React from 'react';
import TagManager from 'react-gtm-module';
import gqlService from '../../../../services/graphql';

export default function CustomizedExpansionPanels({
    checkout,
    setCheckout,
    updateFormik,
    handleOpenMessage,
    t,
    storeConfig,
    PaymentView,
}) {
    const { loading, data, selected } = checkout;
    const [setPaymentMethod] = gqlService.setPaymentMethod({ onError: () => {} });

    const handlePayment = async (val) => {
        if (val) {
            const { cart } = checkout.data;
            let state = { ...checkout };
            state.selected.payment = val;
            window.backdropLoader(true);
            setCheckout(state);

            const result = await setPaymentMethod({ variables: { cartId: cart.id, code: val } });

            state = { ...checkout };

            if (result) {
                state.data.cart = result.data.setPaymentMethodOnCart.cart;
                updateFormik(result.data.setPaymentMethodOnCart.cart);
            } else {
                handleOpenMessage({
                    variant: 'error',
                    text: t('checkout:message:problemConnection'),
                });
            }
            window.backdropLoader(false);
            setCheckout(state);

            const selectedPayment = data.paymentMethod.filter((item) => item.code === val);
            const dataLayer = {
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout' },
                        products: cart.items.map(({ quantity, product, prices }) => ({
                            name: product.name,
                            id: product.sku,
                            price: JSON.stringify(prices.price.value),
                            category: product.categories.length > 0 ? product.categories[0].name : '',
                            list: product.categories.length > 0 ? product.categories[0].name : '',
                            quantity: JSON.stringify(quantity),
                            dimension4: product.stock_status === 'IN_STOCK' ? 'In stock' : 'Out stock',
                            dimension5: '',
                            dimension6: '',
                            dimension7: prices.discount ? 'YES' : 'NO',
                        })),
                    },
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                },
            };
            const dataLayerOption = {
                event: 'checkoutOption',
                ecommerce: {
                    currencyCode: storeConfig.base_currency_code || 'IDR',
                    checkout_option: {
                        actionField: { step: 3, option: selectedPayment[0].title, action: 'checkout_option' },
                    },
                },
            };
            TagManager.dataLayer({
                dataLayer,
            });
            TagManager.dataLayer({
                dataLayer: dataLayerOption,
            });
        }
    };

    return (
        <PaymentView
            loading={loading}
            data={data}
            checkout={checkout}
            storeConfig={storeConfig}
            t={t}
            selected={selected}
            handlePayment={handlePayment}
        />
    );
}
