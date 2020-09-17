/* eslint-disable radix */
/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';
import { getCartId } from '@helpers/cartId';
import { useMutation } from '@apollo/client';
import TagManager from 'react-gtm-module';
import Layout from '@layout';
import { getCartData, addWishlist as mutationWishlist } from '../../services/graphql';
import * as Schema from '../../services/graphql/schema';

const getCrossSellProduct = (items) => {
    let crosssell = [];
    for (let index = 0; index < items.length; index++) {
        const data = items[index].product.crosssell_products.map((product) => ({
            ...product,
            categories: items[index].product.categories,
        }));
        crosssell = crosssell.concat(data);
    }
    return crosssell;
};

const Cart = (props) => {
    const {
        t, token, isLogin, EmptyView, SkeletonView, pageConfig, Content, storeConfig, ...other
    } = props;
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState({});
    const [openEditDrawer, setOpenEditDrawer] = useState(false);
    let cartId = '';
    const config = {
        title: t('cart:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('cart:pageTitle'),
        headerBackIcon: 'close', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'cart',
    };
    let dataCart = {
        id: null,
        total_quantity: 0,
        applied_coupons: null,
        prices: {},
        items: [],
    };
    let loadingCart = true;
    let crosssell = [];

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const toggleEditDrawer = (item) => {
        setEditItem(item);
        setOpenEditDrawer(!openEditDrawer);
    };

    // delete item from cart
    const [actDeleteItem] = useMutation(Schema.deleteCartitem);
    const [actUpdateItem] = useMutation(Schema.updateCartitem);

    // delete items
    const deleteItem = (itemProps) => {
        const dataLayer = {
            event: 'removeFromCart',
            eventLabel: itemProps.product.name,
            label: itemProps.product.name,
            ecommerce: {
                currencyCode: itemProps.prices.price.currency || 'IDR',
                remove: {
                    cartItem: itemProps.id,
                    quantity: itemProps.quantity,
                    product: {
                        name: itemProps.product.name,
                        id: itemProps.product.sku,
                        price: itemProps.prices.price.value || 0,
                        dimensions4: itemProps.product.stock_status || '',
                    },
                },
            },
        };

        TagManager.dataLayer({ dataLayer });
        window.backdropLoader(true);
        actDeleteItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemProps.id),
            },
            context: {
                request: 'internal',
            },
            refetchQueries: [
                {
                    query: Schema.getCart,
                    variables: { cartId },
                    fetchPolicy: 'cache-and-network',
                    context: {
                        request: 'internal',
                    },
                },
            ],
        }).then(() => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('cart:deleteSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('cart:deleteFailed'),
                variant: 'error',
            });
        });
    };

    // update items
    const updateItem = (itemData) => {
        window.backdropLoader(true);
        actUpdateItem({
            variables: {
                cartId,
                cart_item_id: parseInt(itemData.cart_item_id),
                quantity: itemData.quantity,
            },
            context: {
                request: 'internal',
            },
            refetchQueries: [
                {
                    query: Schema.getCart,
                    variables: { cartId },
                    context: {
                        request: 'internal',
                    },
                    fetchPolicy: 'cache-and-network',
                },
            ],
        }).then(() => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('cart:updateSuccess'),
                variant: 'success',
            });
        }).catch((e) => {
            toggleEditMode();
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message.split(':')[1] || t('cart:updateFailed'),
                variant: 'error',
            });
        });
    };
    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (cartId) {
            const { loading, data } = getCartData(token, cartId);
            loadingCart = loading;
            if (!loading && data && data.cart) {
                dataCart = data.cart;
            }
        } else {
            loadingCart = false;
        }
    }
    useEffect(() => {
        if (dataCart.items.length > 0) {
            const crosssellData = getCrossSellProduct(dataCart.items);
            const dataLayer = {
                pageName: t('cart:pageTitle'),
                pageType: 'cart',
                ecommerce: {
                    currency: storeConfig.base_currency_code || 'IDR',
                    impressions: crosssellData.map((product, index) => ({
                        name: product.name,
                        id: product.sku,
                        category: product.categories[0].name || '',
                        price: product.price_range.minimum_price.regular_price.value,
                        list: 'Crossel Products',
                        position: index + 1,
                    })),
                },
                event: 'impression',
                eventCategory: 'Ecommerce',
                eventAction: 'Impression',
                eventLabel: 'cart',
            };
            TagManager.dataLayer({ dataLayer });
        }
    }, [dataCart]);
    // add to wishlist
    const [addWishlist] = mutationWishlist();
    const handleFeed = (itemProps) => {
        if (isLogin && isLogin === 1) {
            TagManager.dataLayer({
                dataLayer: {
                    event: 'addToWishlist',
                    eventLabel: itemProps.product.name,
                    label: itemProps.product.name,
                    ecommerce: {
                        currencyCode: itemProps.prices.price.currency || 'IDR',
                        add: {
                            products: [{
                                name: itemProps.product.name,
                                id: itemProps.product.sku,
                                price: itemProps.prices.price.value || 0,
                                category: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                list: itemProps.product.categories.length > 0 ? itemProps.product.categories[0].name : '',
                                dimensions4: itemProps.product.stock_status,
                            }],
                        },
                    },
                },
            });
            window.backdropLoader(true);
            addWishlist({
                variables: {
                    productId: parseInt(itemProps.product.id),
                },
            })
                .then(async () => {
                    deleteItem(itemProps);
                    await window.toastMessage({ open: true, variant: 'success', text: t('cart:addWishlistSuccess') });
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || t('cart:addWishlistFailed'),
                    });
                    window.backdropLoader(false);
                });
        } else {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('cart:addWishlistWithoutLogin'),
            });
        }
    };

    if (loadingCart) {
        return <Layout pageConfig={config || pageConfig} {...props}><SkeletonView /></Layout>;
    }

    crosssell = getCrossSellProduct(dataCart.items);
    const globalCurrency = storeConfig.default_display_currency_code;

    if (dataCart.id && dataCart.items.length > 0) {
        const contentProps = {
            dataCart,
            t,
            handleFeed,
            toggleEditMode,
            editMode,
            deleteItem,
            toggleEditDrawer,
            crosssell,
            editItem,
            openEditDrawer,
            updateItem,
            storeConfig,
            globalCurrency,
        };
        return (
            <Layout pageConfig={config || pageConfig} {...props}>
                <Content
                    {...contentProps}
                    {...other}
                />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={config || pageConfig} {...props}>
            <EmptyView t={t} />
        </Layout>
    );
};

export default Cart;
