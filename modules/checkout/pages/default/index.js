/* eslint-disable react/destructuring-assignment */
import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import cookies from 'next-cookies';
import redirect from 'next-redirect';
import Core from './core';
import CashbackInfo from './components/CashbackInfo';
import EmailView from './components/email/view';
import DeliveryView from './components/delivery/view';
import DeliverySkeleton from './components/delivery/skeleton';
import SummaryView from './components/summary/view';
import AddressView from './components/address/view';
import ShippingView from './components/shipping/view';
import PaymentView from './components/payment/view';
import GiftCardView from './components/giftcard/view';
import FieldPointView from '../../components/fieldcode';
import RewardPointView from './components/rewardpoint/view';
import StoreCreditView from './components/credit/view';
import Content from './components';
import HeaderView from './components/Header';

const Page = (props) => (
    <Core
        {...props}
        CashbackInfoView={CashbackInfo}
        EmailView={EmailView}
        DeliveryView={DeliveryView}
        DeliverySkeleton={DeliverySkeleton}
        SummaryView={SummaryView}
        AddressView={AddressView}
        ShippingView={ShippingView}
        PaymentView={PaymentView}
        PromoView={FieldPointView}
        GiftCardView={GiftCardView}
        RewardPointView={RewardPointView}
        StoreCreditView={StoreCreditView}
        Content={Content}
        HeaderView={HeaderView}
        pageConfig={{
            title: props.t('checkout:pageTitle'),
            header: 'relative', // available values: "absolute", "relative", false (default)
            headerTitle: props.t('checkout:pageTitle'),
            headerDesktop: false,
            footer: false,
            bottomNav: false,
            pageType: 'checkout',
        }}
    />
);

Page.getInitialProps = async (ctx) => {
    const cartId = cookies(ctx).nci || null;

    if (!cartId) {
        redirect(ctx, '/checkout/cart');
    }

    return {
        namespacesRequired: ['common', 'checkout', 'customer', 'validate'],
        cartId,
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
