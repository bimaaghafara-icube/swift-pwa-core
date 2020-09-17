import Skeleton from '@material-ui/lab/Skeleton';
import { useEffect } from 'react';
import { formatPrice } from '@helpers/currency';
import TagManager from 'react-gtm-module';
import _ from 'lodash';
import gqlService from '../../../../services/graphql';

const Loader = () => (
    <>
        <Skeleton width="100%" variant="text" animation="wave" height={10} />
        <Skeleton width="100%" variant="text" animation="wave" height={10} />
        <Skeleton width="100%" variant="text" animation="wave" height={10} />
    </>
);

const Address = (props) => {
    const {
        checkout,
        t,
        setCheckout,
        defaultAddress,
        updateFormik,
        AddressView,
        storeConfig,
        ...other
    } = props;

    const [setShippingAddressById] = gqlService.setShippingAddress();
    const [setShippingAddressByInput] = gqlService.setShippingAddressByInput();
    const [setBillingAddressById] = gqlService.setBillingAddressById();
    const [setBillingAddressByInput] = gqlService.setBillingAddressByInput();

    const { address } = checkout.selected;
    const { loading, data } = checkout;
    const street = _.isNull(address) ? null : address.street.join(' ');
    let dialogProps;

    if (data.isGuest) {
        dialogProps = address
            ? {
                region: address.region.label,
                country: address.country.code,
                city: address.city,
                street,
                firstname: address.firstname,
                lastname: address.lastname,
                postcode: address.postcode,
                telephone: address.telephone,
            }
            : {};
    }

    let content;

    if (loading.addresses || loading.all) {
        content = <Loader />;
    } else if (data.isGuest && !address) {
        content = t('checkout:message:address:add');
    } else if (address) {
        content = `${address.firstname} ${address.lastname} ${street} 
        ${address.city} ${address.region.label} ${address.postcode} ${address.telephone}`;
    } else {
        content = t('checkout:message:address:default');
    }

    const updateAddressState = (result) => {
        const state = { ...checkout };

        const updatedCart = result.data.setBillingAddressOnCart.cart;
        const [shippingAddress] = updatedCart.shipping_addresses;

        const shippingMethods = shippingAddress.available_shipping_methods.map((shipping) => ({
            ...shipping,
            label: `${shipping.method_title} ${shipping.carrier_title}`,
            value: {
                name: { carrier_code: shipping.carrier_code, method_code: shipping.method_code },
                price: formatPrice(shipping.amount.value, shipping.amount.currency),
            },
        }));

        const addressKeys = Object.keys(shippingAddress);
        const allowedKeys = addressKeys.filter((item) => item !== 'available_shipping_methods');
        const dataAddress = _.pick(shippingAddress, allowedKeys);

        state.data.shippingMethods = shippingMethods;
        state.selected.address = dataAddress;
        state.selected.shipping = shippingAddress.selected_shipping_method;
        state.loading.addresses = false;
        state.data.cart = updatedCart;
        setCheckout(state);

        updateFormik(updatedCart);
    };

    const setAddress = (selectedAddress, cart) => new Promise((resolve, reject) => {
        const state = { ...checkout };
        state.loading.addresses = true;
        setCheckout(state);
        let latitude = '';
        let longitude = '';

        // eslint-disable-next-line no-unused-expressions
        selectedAddress.customAttributes && selectedAddress.customAttributes.length > 0
            // eslint-disable-next-line array-callback-return
            && selectedAddress.customAttributes.map((item) => {
                if (item.attribute_code === 'latitude') {
                    latitude = item.value;
                }
                if (item.attribute_code === 'longitude') {
                    longitude = item.value;
                }
            });

        if (checkout.data.isGuest) {
            setShippingAddressByInput({
                variables: {
                    cartId: cart.id,
                    ...selectedAddress,
                    latitude,
                    longitude,
                },
            }).then(() => {
                setBillingAddressByInput({
                    variables: {
                        cartId: cart.id,
                        ...selectedAddress,
                        latitude,
                        longitude,
                    },
                }).then((resBilling) => {
                    updateAddressState(resBilling);
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                reject();
            });
        } else {
            setShippingAddressById({
                variables: {
                    cartId: cart.id,
                    addressId: selectedAddress.id,
                },
            }).then(() => {
                setBillingAddressById({
                    variables: {
                        cartId: cart.id,
                        addressId: selectedAddress.id,
                    },
                }).then((resBilling) => {
                    updateAddressState(resBilling);
                    resolve();
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                reject();
            });
        }
    });

    const isAddressNotSame = (current = null, previous = null, prevDestLocation = null) => {
        if (previous) {
            let currentDestLatitude = null;
            let currentDestLongitude = null;

            // eslint-disable-next-line array-callback-return
            current.custom_attributes.map((item) => {
                if (item.attribute_code === 'latitude') {
                    currentDestLatitude = item.value;
                }
                if (item.attribute_code === 'longitude') {
                    currentDestLongitude = item.value;
                }
            });

            const currentStringfy = JSON.stringify({
                city: current.city,
                country_code: current.country_code,
                firstname: current.firstname,
                lastname: current.lastname,
                postcode: current.postcode,
                regionLabel: current.region.region,
                street: current.street,
                telephhone: current.telephone,
                dest_latitude: currentDestLatitude,
                dest_longitude: currentDestLongitude,
            });

            const previousStringfy = JSON.stringify({
                city: previous.city,
                country_code: previous.country.code,
                firstname: previous.firstname,
                lastname: previous.lastname,
                postcode: previous.postcode,
                regionLabel: previous.region.label,
                street: previous.street,
                telephhone: previous.telephone,
                dest_latitude: typeof prevDestLocation.dest_latitude !== 'undefined' ? prevDestLocation.dest_latitude : null,
                dest_longitude: typeof prevDestLocation.dest_longitude !== 'undefined' ? prevDestLocation.dest_longitude : null,
            });

            return currentStringfy !== previousStringfy;
        }

        return true;
    };
    // let storeConfig = {};
    // if (typeof window !== 'undefined') {
    //     storeConfig = cookies.getJSON(storeConfigNameCokie);
    // }
    useEffect(() => {
        if (defaultAddress && !checkout.data.isGuest) {
            const { cart } = checkout.data;
            const [prevAddress] = cart.shipping_addresses;
            let prevDestLocation = null;
            if (typeof cart.dest_location !== 'undefined') {
                prevDestLocation = cart.dest_location;
            }
            if (isAddressNotSame(defaultAddress, prevAddress, prevDestLocation)) {
                setAddress(defaultAddress, cart);
            }
        }
    }, [defaultAddress]);

    useEffect(() => {
        if (address) {
            const option = `${address.firstname} ${address.lastname} ${street} 
            ${address.city} ${address.region.label} ${address.postcode} ${address.telephone}`;
            const dataLayer = {
                pageType: 'checkout',
                pageName: 'Checkout',
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: { step: 1, option },
                        products: checkout.data.cart.items.map(({ quantity, product, prices }) => ({
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
            TagManager.dataLayer({
                dataLayer,
            });
        }
    }, [loading.addresses, loading.all]);

    return (
        <AddressView
            data={data}
            checkout={checkout}
            setAddress={setAddress}
            setCheckout={setCheckout}
            t={t}
            dialogProps={dialogProps}
            loading={loading}
            address={address}
            content={content}
            storeConfig={storeConfig}
            {...other}
        />
    );
};

export default Address;
