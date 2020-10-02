import React, { useState } from 'react';
import gqlService from '../../../../services/graphql';

const Email = (props) => {
    const {
        checkout,
        EmailView,
        formik,
        setCheckout,
        handleOpenMessage,
        t,
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [setGuestEmailAddressOnCart] = gqlService.setGuestEmailAddressOnCart(({ onError: () => {} }));
    const open = Boolean(anchorEl);
    const id = open ? 'email-helper' : undefined;
    const handleBlur = async () => {
        const state = { ...checkout };
        window.backdropLoader(true);
        const result = await setGuestEmailAddressOnCart({ variables: { cartId: checkout.data.cart.id, email: formik.values.email } });
        if (!result || result.errors) {
            handleOpenMessage({
                variant: 'error',
                text: t('checkout:message:problemConnection'),
            });
        } else {
            state.data.cart = {
                ...state.data.cart,
                ...result.data.setGuestEmailOnCart.cart,
            };
            setCheckout(state);
            window.backdropLoader(false);
        }
    };
    const content = (
        <EmailView
            {...props}
            idButton={id}
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            handleBlur={handleBlur}
        />
    );

    return checkout.data.isGuest ? content : null;
};

export default Email;
