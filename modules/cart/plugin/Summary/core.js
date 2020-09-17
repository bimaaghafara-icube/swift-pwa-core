import { formatPrice } from '@helpers/currency';
import _ from 'lodash';

const CoreSummary = (props) => {
    const {
        DesktopView, MobileView, isDesktop, dataCart, globalCurrency = 'IDR',
        ...other
    } = props;
    let dataSummary = [];
    let total = 0;
    const {
        prices = {},
        items = [],
        applied_store_credit = {},
        applied_reward_points = {},
        applied_giftcard = {},
        shipping_addresses = [],
        applied_extra_fee = {},
    } = dataCart;

    if (dataCart && items) {
        const sumTotalItem = items.reduce(
            (prev, curr) => ({
                value: prev.value + curr.prices.row_total.value,
                currency: curr.prices.row_total.currency,
            }),
            { value: 0 },
        );
        const subtotal = formatPrice(sumTotalItem.value, sumTotalItem.currency);
        total = prices.grand_total;
        const [shipping] = shipping_addresses;

        dataSummary.push({ item: 'Sub total', value: subtotal });

        if (applied_extra_fee && applied_extra_fee.extrafee_value) {
            dataSummary.push({
                item: applied_extra_fee.title || '',
                value: formatPrice(applied_extra_fee.extrafee_value.value || 0, applied_extra_fee.extrafee_value.currency || globalCurrency),
            });
        }

        if (shipping && shipping.selected_shipping_method) {
            const shippingMethod = shipping.selected_shipping_method;
            const price = formatPrice(shippingMethod.amount.value, shippingMethod.amount.currency);
            dataSummary.push({ item: 'shipping', value: price });
        }

        if (_.isArray(prices.discounts)) {
            const discounts = prices.discounts.map((disc) => {
                const price = formatPrice(disc.amount.value, disc.amount.currency);
                return { item: `${disc.label} - ${price}`, value: `-${price}` };
            });
            dataSummary = dataSummary.concat(discounts);
        }

        if (applied_store_credit.is_use_store_credit) {
            const price = formatPrice(Math.abs(applied_store_credit.store_credit_amount), globalCurrency);
            dataSummary.push({ item: 'Store Credit', value: `-${price}` });
        }

        if (applied_reward_points.is_use_reward_points) {
            const price = formatPrice(Math.abs(applied_reward_points.reward_points_amount), globalCurrency);
            dataSummary.push({ item: 'Reward Point ', value: `-${price}` });
        }

        if (applied_giftcard) {
            const giftCards = applied_giftcard.giftcard_detail.map((item) => {
                const price = formatPrice(Math.abs(item.giftcard_amount_used), globalCurrency);
                return { item: `Gift Card (${item.giftcard_code}) - ${price}`, value: `-${price}` };
            });
            dataSummary = dataSummary.concat(giftCards);
        }
    }

    if (isDesktop) {
        return (
            <DesktopView items={items} summary={{ total, data: dataSummary }} isDesktop={isDesktop} {...other} />
        );
    }

    return (
        <MobileView items={items} summary={{ total, data: dataSummary }} {...other} />
    );
};

export default CoreSummary;
