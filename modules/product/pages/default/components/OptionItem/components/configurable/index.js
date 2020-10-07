/* eslint-disable no-nested-ternary */
import React from 'react';
import { useApolloClient } from '@apollo/client';
import ProductByVariant, {
    CheckAvailableOptions, CheckAvailableStock, getOptionVariant,
    generateAvailableCombination,
} from '@helper_productbyvariant';
import { getLoginInfo } from '@helper_auth';
import { getCartId, setCartId } from '@helper_cartid';
import TagManager from 'react-gtm-module';
import { localTotalCart } from '@services/graphql/schema/local';
import {
    addConfigProductsToCart, getConfigurableProduct, getGuestCartId as queryGetGuestCartId, getCustomerCartId,
} from '../../../../../../services/graphql';

const OptionsItemConfig = (props) => {
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

    const configProduct = getConfigurableProduct(sku);

    const selected = selectConfigurable;
    const [firstSelected, setFirstSelected] = React.useState({});
    const [variantOption, setVariant] = React.useState([]);

    const handleSelect = async (value, key) => {
        if (selected[key] && selected[key] === value) {
            delete selected[key];
        } else {
            selected[key] = value;
        }
        await setSelectConfigurable({
            ...selected,
        });
        const product = await ProductByVariant(selected, configProduct.data.products.items[0].variants);
        console.log(product);
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

        firstSelected.code = key;
        firstSelected.value = value;
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

    React.useEffect(() => {
        if (configProduct.data && variantOption.length === 0) {
            const variants = configProduct.data && getOptionVariant(
                configProduct.data.products.items[0].variants,
                configProduct.data.products.items[0].configurable_options,
            );
            setVariant(variants);
        }
    }, [configProduct.data]);

    const combination = variantOption && variantOption.length > 0
    && generateAvailableCombination(selected, variantOption, configProduct.data.products.items[0].configurable_options);
    // console.log(variantOption);
    // console.log(combination);
    return (
        <>
            {configProduct.data
                && configProduct.data.products.items[0].configurable_options.map((option, index) => {
                    const value = [];
                    let isSwatch = false;
                    for (
                        let valIdx = 0;
                        valIdx < option.values.length;
                        // eslint-disable-next-line no-plusplus
                        valIdx++
                    ) {
                        if (value.indexOf(option.values[valIdx].label) === -1) {
                            const initValue = {
                                label: option.values[valIdx].label,
                                value: option.values[valIdx].value_index,
                                disabled: false,
                                thumbnail: '',
                            };
                            if (option.values[valIdx].swatch_data && Object.keys(option.values[valIdx].swatch_data).length > 0) {
                                isSwatch = true;
                                if (option.values[valIdx].swatch_data.thumbnail) {
                                    initValue.thumbnail = option.values[valIdx].swatch_data.thumbnail;
                                }
                                initValue.content = option.values[valIdx].swatch_data.value;
                            }
                            let available = true;
                            if (configProduct.data.products.items[0].configurable_options.length === 1) {
                                available = CheckAvailableStock(option.values[valIdx], configProduct.data.products.items[0].variants);
                            }
                            if (combination.length > 0) {
                                available = CheckAvailableOptions(
                                    combination, option, option.values[valIdx],
                                );
                            }
                            if (!available) {
                                initValue.disabled = true;
                            }
                            value.push(initValue);
                        }
                    }
                    return (
                        <ConfigurableView
                            key={index}
                            option={{
                                ...option,
                                isSwatch,
                            }}
                            selected={selected}
                            value={value}
                            handleSelect={handleSelect}
                            error={error}
                            loading={loading}
                            configProduct={configProduct}
                        />
                    );
                })}
            <Footer qty={qty} handleAddToCart={handleAddToCart} setQty={setQty} t={t} loading={loading || configProduct.loading} />
        </>
    );
};

export default OptionsItemConfig;
