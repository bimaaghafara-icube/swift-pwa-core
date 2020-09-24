import gqlService from '../../../../services/graphql';

const DiscountSection = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        PromoView,
    } = props;
    const [applyCouponTocart] = gqlService.applyCouponToCart({ onError: () => {} });
    const [removeCouponFromCart] = gqlService.removeCouponFromCart({ onError: () => {} });

    const handlePromo = async () => {
        let cart;
        const state = { ...checkout };
        state.loading.coupon = true;
        setCheckout(state);
        const isApplied = !state.data.isCouponAppliedToCart;

        if (isApplied) {
            const result = await applyCouponTocart({ variables: { cartId: checkout.data.cart.id, coupon: formik.values.coupon } });
            cart = result && result.data.applyCouponToCart.cart;
            if (cart) {
                handleOpenMessage({
                    variant: 'success',
                    text: t('checkout:message:couponApplied'),
                });
            }
        } else {
            const result = await removeCouponFromCart({ variables: { cartId: checkout.data.cart.id } });
            cart = result && result.data.removeCouponFromCart.cart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:couponRemoved'),
            });
        }

        state.loading.coupon = false;

        if (cart) {
            state.data.cart = cart;
            state.data.isCouponAppliedToCart = !state.data.isCouponAppliedToCart;
        } else {
            await formik.setFieldError('coupon', t('checkout:message:couponError'));
        }

        setCheckout(state);
    };

    return (
        <PromoView
            id="coupon"
            placeholder="Promo Code"
            action={handlePromo}
            onChange={formik.handleChange}
            value={formik.values.coupon}
            disabled={checkout.loading.coupon}
            toggleField={checkout.data.isCouponAppliedToCart}
            loading={checkout.loading.coupon}
            error={!!formik.errors.coupon}
            errorMessage={formik.errors.coupon}
        />
    );
};

export default DiscountSection;
