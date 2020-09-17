/* eslint-disable no-nested-ternary */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import ProductByVariant, { getCombinationVariants, CheckAvailableOptions, CheckAvailableStock } from '@helpers/productByVariant';
import { getLoginInfo } from '@helpers/auth';
import { getCartId, setCartId } from '@helpers/cartId';
import TagManager from 'react-gtm-module';
import { localTotalCart } from '@services/graphql/schema/local';
import {
    addConfigProductsToCart, getConfigurableProduct, getGuestCartId as queryGetGuestCartId, getCustomerCartId,
} from '../../../../../../services/graphql';

export default (props) => {
    const {
        setBanner,
        setPrice,
        t,
        data: {
            __typename, sku, media_gallery, image,
            price_range, price_tiers, name, categories,
            stock_status,
        },
        setOpen,
        loading,
        setLoading,
        ConfigurableView,
        Footer,
    } = props;

    const client = useApolloClient();
    const [selectConfigurable, setSelectConfigurable] = React.useState({});
    const [selectedProduct, setSelectedProduct] = React.useState({});
    const [qty, setQty] = React.useState(1);
    const handleQty = (event) => {
        setQty(event.target.value);
    };

    const configProduct = getConfigurableProduct(sku);

    const selected = selectConfigurable;
    const [firstSelected, setFirstSelected] = React.useState({});

    const handleSelect = async (value, key) => {
        const options = firstSelected.code === key && firstSelected.value !== value ? {} : selected;
        options[key] = value;
        selected[key] = value;
        setSelectConfigurable({
            ...selected,
        });
        const product = await ProductByVariant(options, configProduct.data.products.items[0].variants);
        if (product && JSON.stringify(product) !== '{}') {
            setSelectedProduct({ ...product });
            const bannerData = [];
            if (product.media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                product.media_gallery.map((media) => {
                    bannerData.push({
                        link: '#',
                        imageUrl: media.url,
                    });
                });
            } else {
                bannerData.push({
                    link: '#',
                    imageUrl: product.image.url,
                });
            }
            setBanner(bannerData);
            setPrice({
                priceRange: product.price_range,
                priceTiers: product.price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: product.__typename,
            });
        } else {
            const bannerData = [];
            if (media_gallery.length > 0) {
                // eslint-disable-next-line array-callback-return
                media_gallery.map((media) => {
                    bannerData.push({
                        link: '#',
                        imageUrl: media.url,
                    });
                });
            } else {
                bannerData.push({
                    link: '#',
                    imageUrl: image.url,
                });
            }
            setBanner(bannerData);
            setPrice({
                priceRange: price_range,
                priceTiers: price_tiers,
                // eslint-disable-next-line no-underscore-dangle
                productType: __typename,
            });
        }

        if (firstSelected.code === key) {
            firstSelected.value = value;
        } else if (!firstSelected.code) {
            firstSelected.code = key;
            firstSelected.value = value;
        }
        await setFirstSelected({ ...firstSelected });
    };

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
        const errorMessage = {
            variant: 'error',
            text: t('product:failedAddCart'),
            open: true,
        };
        const errorData = {};
        // eslint-disable-next-line array-callback-return
        configProduct.data.products.items[0].configurable_options.map((option) => {
            if (selected[option.attribute_code] === '' || !selected[option.attribute_code]) {
                errorData[option.attribute_code] = `${option.attribute_code} ${t('validate:required')}`;
            }
        });
        setError(errorData);
        if (JSON.stringify(errorData) === '{}') {
            setLoading(true);
            if (!cartId || cartId === '' || cartId === undefined) {
                if (!isLogin) {
                    await getGuestCartId()
                        .then((res) => {
                            const token = res.data.createEmptyCart;
                            cartId = token;
                            setCartId(token);
                        })
                        .catch((e) => {
                            setLoading(false);
                            window.toastMessage({
                                ...errorMessage,
                                text: e.message.split(':')[1] || errorMessage.text,
                            });
                        });
                } else {
                    const token = cartUser.data.customerCart.id || '';
                    cartId = token;
                    setCartId(token);
                }
            }
            if (__typename === 'ConfigurableProduct') {
                const variables = {
                    cartId,
                    sku: selectedProduct.sku,
                    qty: parseFloat(qty),
                    parentSku: sku,
                };
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'addToCart',
                        eventLabel: name,
                        ecommerce: {
                            currencyCode: price_range.minimum_price.regular_price.currency || 'USD',
                            add: {
                                products: [{
                                    name,
                                    id: sku,
                                    price: price_range.minimum_price.regular_price.value || 0,
                                    category: categories.length > 0 ? categories[0].name : '',
                                    list: categories.length > 0 ? categories[0].name : '',
                                    quantity: qty,
                                    dimensions4: stock_status,
                                }],
                            },
                        },
                    },
                });
                addCartConfig({
                    variables,
                })
                    .then((res) => {
                        client.writeQuery({ query: localTotalCart, data: { totalCart: res.data.addConfigurableProductsToCart.cart.total_quantity } });
                        window.toastMessage({ variant: 'success', text: t('product:successAddCart'), open: true });
                        setLoading(false);
                        setOpen(false);
                    })
                    .catch((e) => {
                        setLoading(false);
                        window.toastMessage({
                            ...errorMessage,
                            text: e.message.split(':')[1] || errorMessage.text,
                        });
                    });
            }
        }
    };

    const combination = configProduct.data && getCombinationVariants(firstSelected, configProduct.data.products.items[0].variants);
    return (
        <>
            {configProduct.data
                && configProduct.data.products.items[0].configurable_options.map((option, index) => {
                    const value = [];
                    for (
                        let valIdx = 0;
                        valIdx < option.values.length;
                        // eslint-disable-next-line no-plusplus
                        valIdx++
                    ) {
                        if (value.indexOf(option.values[valIdx].label) === -1) {
                            const initValue = {
                                label: option.values[valIdx].label,
                                value: option.values[valIdx].label,
                                disabled: false,
                            };
                            let available = true;
                            if (configProduct.data.products.items[0].configurable_options.length === 1) {
                                available = CheckAvailableStock(option.values[valIdx], configProduct.data.products.items[0].variants);
                            }
                            if (combination.code && combination.code !== option.attribute_code) {
                                if (combination.available_combination.length > 0) {
                                    available = CheckAvailableOptions(combination.available_combination, option.values[valIdx].label);
                                } else {
                                    available = false;
                                }
                            }
                            if (!available) initValue.disabled = true;
                            value.push(initValue);
                        }
                    }
                    return (
                        <ConfigurableView
                            key={index}
                            option={option}
                            selected={selected}
                            value={value}
                            handleSelect={handleSelect}
                            error={error}
                            loading={loading}
                            configProduct={configProduct}
                        />
                    );
                })}
            <Footer qty={qty} handleAddToCart={handleAddToCart} handleQty={handleQty} t={t} loading={loading || configProduct.loading} />
        </>
    );
};
