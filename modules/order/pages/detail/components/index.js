/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import Typography from '@common_typography';
import classNames from 'classnames';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import Layout from '@core_modules/customer/components/layout';
import useStyles from '../style';
import ItemProduct from './product';
import Footer from './footer';
import Table from './TableListItem';

const DetailOrder = (props) => {
    const {
        t, detail, currency, features,
    } = props;
    const styles = useStyles();
    let items = [];
    if (detail.length > 0 && detail[0].detail[0].items.length) {
        const itemsChild = detail[0].detail[0].items.filter((item) => {
            if (item.parent_item_id !== null) return item;
        });
        const simpleData = detail[0].detail[0].items.filter((item) => !itemsChild.find(({ sku }) => item.sku === sku) && item);
        items = [...itemsChild, ...simpleData];
    }
    if (detail.length > 0) {
        return (
            <Layout t={t} wishlist={[]}>
                <div className="column">
                    <div className={classNames('hidden-mobile', styles.blockHeader)}>
                        <Typography
                            variant="h1"
                            letter="uppercase"
                            type="regular"
                            className={classNames('clear-margin-padding', styles.headerTitle)}
                        >
                            {t('order:order')}
                            {' # '}
                            {detail[0].order_number || ''}
                        </Typography>
                        <Typography variant="span" className="clear-margin-padding">
                            {formatDate(detail[0].created_at)}
                        </Typography>
                    </div>
                    <div className={classNames(styles.block)}>
                        <div className="row center-xs start-sm start-sm start-md start-lg">
                            <div className="col-xs-12">
                                <Typography
                                    variant="span"
                                    letter="capitalize"
                                    type="regular"
                                    className={classNames('clear-margin-padding', styles.blockLabel)}
                                >
                                    {t('order:orderInfo')}
                                </Typography>
                            </div>
                            <div className="col-xs-12 hidden-desktop">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:orderId')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].order_number || ''}
                                </Typography>
                                <Typography variant="p" type="bold" letter="uppercase" align="center">
                                    {t('order:date')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {formatDate(detail[0].created_at)}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {
                                        detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                            ? t('order:pickupAt') : t('order:shippedTo')
                                    }
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].shipping_address.firstname || ''}
                                    {' '}
                                    {detail[0].detail[0].shipping_address.lastname || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.street || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.city || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.region || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.country_id || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.telephone || ''}
                                    <br />
                                    {detail[0].detail[0].shipping_address.postcode || ''}
                                </Typography>
                            </div>
                            {
                                detail[0].detail[0].pickup_store && detail[0].detail[0].pickup_store.is_using_pickup_store
                                && (
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                        <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                            {t('order:pickupBy')}
                                        </Typography>
                                        <Typography variant="span" className="clear-margin-padding">
                                            {detail[0].detail[0].pickup_store.pickup_person.name}
                                        </Typography>
                                        <Typography variant="span" className="clear-margin-padding">
                                            {`Hp : ${detail[0].detail[0].pickup_store.pickup_person.handphone}`}
                                        </Typography>
                                        <Typography variant="span" className="clear-margin-padding">
                                            {`Email : ${detail[0].detail[0].pickup_store.pickup_person.email}`}
                                        </Typography>
                                    </div>
                                )
                            }
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:orderStatus')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].status_label || ''}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {
                                        t('order:billingAddress')
                                    }
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].billing_address.firstname || ''}
                                    {' '}
                                    {detail[0].detail[0].billing_address.lastname || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.street || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.city || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.region || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.country_id || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.telephone || ''}
                                    <br />
                                    {detail[0].detail[0].billing_address.postcode || ''}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:shippingMethod')}
                                </Typography>
                                <Typography variant="span" className="clear-margin-padding">
                                    {detail[0].detail[0].shipping_methods.shipping_description || ''}
                                </Typography>
                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                                <Typography variant="p" type="bold" letter="uppercase" className={styles.labelDetail}>
                                    {t('order:paymentMethod')}
                                </Typography>
                                {Object.keys(detail[0].detail[0].payment.payment_additional_info).map((item) => {
                                    if (item !== '__typename' && detail[0].detail[0].payment.payment_additional_info[item] !== ''
                                        && detail[0].detail[0].payment.payment_additional_info[item] !== null) {
                                        return (
                                            <React.Fragment key={item}>
                                                <Typography variant="p" type="bold" letter="capitalize" className={styles.labelDetailSm}>
                                                    {item.replace('_', ' ')}
                                                </Typography>
                                                <Typography
                                                    variant="span"
                                                    className="clear-margin-padding"
                                                >
                                                    {detail[0].detail[0].payment.payment_additional_info[item] || ''}
                                                </Typography>
                                            </React.Fragment>
                                        );
                                    }
                                })}
                            </div>
                        </div>

                    </div>
                    <div className={styles.block}>
                        <div className="row center-xs start-sm start-sm start-md start-lg">
                            <div className="col-xs-12">
                                <Typography
                                    variant="span"
                                    letter="capitalize"
                                    type="regular"
                                    className={classNames('clear-margin-padding', styles.blockLabel)}
                                >
                                    {t('order:orderItem')}
                                </Typography>
                            </div>
                            <div className="col-xs-12">
                                <div className="hidden-desktop">
                                    {items.length > 0
                                    && items.map((item, key) => (
                                        <ItemProduct t={t} key={key} {...item} currency={currency} features={features} />
                                    ))}
                                </div>
                                <div className="hidden-mobile">
                                    <Table
                                        data={items}
                                        t={t}
                                        currency={currency}
                                        detail={detail}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames('hidden-desktop', styles.block)}>
                        <div className="row end-md">
                            <div className="col-xs-12 col-sm-6 col-md-8 hidden-mobile" />
                            <div className="col-xs-12 col-sm-6 col-md-4">
                                {detail[0].detail[0].subtotal && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            Sub total
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].subtotal, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].payment && (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:shipping')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].payment.shipping_amount, currency)}
                                        </Typography>
                                    </div>
                                )}
                                {detail[0].detail[0].discount_amount ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:discount')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].discount_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].aw_store_credit.is_use_store_credit ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:credit')}
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(detail[0].detail[0].aw_store_credit.store_credit_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                {detail[0].detail[0].aw_giftcard.giftcard_amount ? (
                                    <div className={styles.listSummary}>
                                        <Typography variant="span" letter="capitalize" className={styles.labelSummary}>
                                            {t('order:giftcard')}
                                            {' '}
                                            (
                                            { detail[0].detail[0].aw_giftcard.giftcard_detail[0].giftcard_code }
                                            )
                                        </Typography>
                                        <Typography variant="span" letter="capitalize">
                                            {formatPrice(-detail[0].detail[0].aw_giftcard.giftcard_amount, currency)}
                                        </Typography>
                                    </div>
                                ) : null}
                                <div className={styles.listSummary}>
                                    <Typography variant="title" type="bold" letter="capitalize" className={styles.labelSummary}>
                                        Total
                                    </Typography>
                                    <Typography variant="title" type="bold" letter="capitalize">
                                        {detail[0].detail[0].grand_total && formatPrice(detail[0].detail[0].grand_total, currency)}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <Footer {...props} />
                    </div>
                </div>

            </Layout>
        );
    }
    return (
        <Alert className="m-15" severity="warning">
            {t('order:notFound')}
        </Alert>
    );
};

export default DetailOrder;
