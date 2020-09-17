import { modules } from '@config';
import gqlService from '../../../../services/graphql';

const GiftCard = (props) => {
    const {
        t,
        checkout,
        setCheckout,
        handleOpenMessage,
        formik,
        GiftCardView,
    } = props;
    const [applyGiftCardToCart] = gqlService.applyGiftCardToCart({ onError: () => {} });
    const [removeGiftCardFromCart] = gqlService.removeGiftCardFromCart({ onError: () => {} });
    let giftCards = [];
    let appliedGiftCards = [];

    if (checkout.data.customer && checkout.data.cart) {
        appliedGiftCards = checkout.data.cart.applied_giftcard.giftcard_detail.map((item) => item.giftcard_code);
        giftCards = checkout.data.customer.gift_card.filter((item) => !appliedGiftCards.includes(item.giftcard_code));
    }

    const handleApplyGift = async (code = null) => {
        let state = { ...checkout };
        state.loading.giftCard = true;
        setCheckout(state);

        const cartId = state.data.cart.id;
        const finalCode = code || formik.values.giftCard;

        const result = await applyGiftCardToCart({
            variables: {
                cartId,
                code: finalCode,
            },
        });

        state = { ...checkout };
        if (result && result.data) {
            const updatedCart = result.data.applyGiftCardToCart.cart;
            state.data.cart = updatedCart;
            formik.setFieldValue('giftCard', '');
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardApplied'),
            });
        } else {
            formik.setFieldError('giftCard', t('checkout:message:giftCardError'));
        }

        state.loading.giftCard = false;
        setCheckout(state);
    };

    const handleRemoveGift = async (code) => {
        let state = { ...checkout };
        state.loading.giftCard = true;
        setCheckout(state);

        const cartId = state.data.cart.id;
        const result = await removeGiftCardFromCart({
            variables: {
                cartId,
                code,
            },
        });

        state = { ...checkout };
        if (result && result.data) {
            const updatedCart = result.data.removeGiftCardFromCart.cart;
            state.data.cart = updatedCart;
            handleOpenMessage({
                variant: 'success',
                text: t('checkout:message:giftCardRemoved'),
            });
        }

        state.loading.giftCard = false;
        setCheckout(state);
    };

    if (modules.giftcard.enabled) {
        return (
            <GiftCardView
                handleRemoveGift={handleRemoveGift}
                handleApplyGift={handleApplyGift}
                giftCards={giftCards}
                formik={formik}
                appliedGiftCards={appliedGiftCards}
                checkout={checkout}
            />
        );
    }

    return null;
};

export default GiftCard;
