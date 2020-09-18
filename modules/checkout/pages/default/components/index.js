import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import classNames from 'classnames';
import Delivery from './delivery';
import Email from './email';
import Summary from './summary';
import Address from './address';
import Shipping from './shipping';
import PaymentList from './payment';
import Promo from './promo';
import GiftCard from './giftcard';
import RewardPoint from './rewardpoint';
import Credit from './credit';
import PickupInfo from './PickupInformation';
import ExtraFee from './ExtreeFee';
import useStyles from './style';

const Content = (props) => {
    const {
        containerStyle,
        checkout,
        storeConfig,
        CashbackInfoView,
        chasbackMessage,
        DeliveryView,
        DeliverySkeleton,
        formik,
        t,
        setCheckout,
        handleOpenMessage,
        EmailView,
        config,
        updateFormik,
        AddressView,
        ShippingView,
        PaymentView,
        PromoView,
        GiftCardView,
        SummaryView,
        RewardPointView,
        StoreCreditView,
        modules,
        HeaderView,
        manageCustomer,
    } = props;

    const styles = useStyles();
    const SummaryRef = React.createRef();
    const { order: loading, all: disabled } = checkout.loading;
    const handleClick = () => {
        if (SummaryRef.current) {
            SummaryRef.current.handlePlaceOrder();
        }
    };
    return (
        <div className={classNames(styles.mobileBottomSpace, 'row between-lg')}>
            <div className="col-xs-12 center hidden-mobile">
                <HeaderView t={t} storeConfig={storeConfig} />
            </div>
            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8" style={containerStyle || {}}>
                {
                    checkout.data.cart && checkout.data.cart.applied_cashback.is_cashback && (
                        <CashbackInfoView
                            message={chasbackMessage}
                            price={checkout.data.cart.applied_cashback.data[0].amount}
                            currency={storeConfig.base_currency_code}
                            promo_name={checkout.data.cart.applied_cashback.data[0].promo_name}
                        />
                    )
                }
                <>
                    {
                        storeConfig.pickup_store ? (
                            <Delivery
                                t={t}
                                DeliveryView={DeliveryView}
                                Skeleton={DeliverySkeleton}
                                formik={formik}
                                checkout={checkout}
                                setCheckout={setCheckout}
                                handleOpenMessage={handleOpenMessage}
                                storeConfig={storeConfig}
                            />
                        ) : null
                    }
                    <Email
                        t={t}
                        formik={formik}
                        EmailView={EmailView}
                        checkout={checkout}
                        config={config}
                    />
                    {
                        checkout.selected.delivery === 'home' ? (
                            <Address
                                checkout={checkout}
                                t={t}
                                setCheckout={setCheckout}
                                defaultAddress={checkout.data.defaultAddress}
                                updateFormik={updateFormik}
                                AddressView={AddressView}
                                manageCustomer={manageCustomer}
                                storeConfig={storeConfig}
                            />
                        ) : (
                            <PickupInfo
                                t={t}
                                formik={formik}
                                checkout={checkout}
                                setCheckout={setCheckout}
                            />
                        )
                    }
                    <Shipping
                        t={t}
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        formik={formik}
                        handleOpenMessage={handleOpenMessage}
                        storeConfig={storeConfig}
                        ShippingView={ShippingView}
                    />
                    <PaymentList
                        checkout={checkout}
                        setCheckout={setCheckout}
                        updateFormik={updateFormik}
                        handleOpenMessage={handleOpenMessage}
                        t={t}
                        storeConfig={storeConfig}
                        PaymentView={PaymentView}
                        modules={modules}
                    />
                    {modules.promo.enabled ? (
                        <Promo
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            formik={formik}
                            storeConfig={storeConfig}
                            PromoView={PromoView}
                        />
                    ) : null }
                    {modules.giftcard.enabled ? (
                        <GiftCard
                            t={t}
                            checkout={checkout}
                            setCheckout={setCheckout}
                            handleOpenMessage={handleOpenMessage}
                            formik={formik}
                            storeConfig={storeConfig}
                            GiftCardView={GiftCardView}
                        />
                    ) : null }
                    <div className={classNames(styles.block, 'row')}>
                        {modules.rewardpoint.enabled ? (
                            <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                <RewardPoint
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    RewardPointView={RewardPointView}
                                />
                            </div>
                        ) : null}
                        {modules.storecredit.enabled ? (
                            <div className="col-xs-12 col-sm-12 col-md-6 col-xl-6">
                                <Credit
                                    t={t}
                                    checkout={checkout}
                                    setCheckout={setCheckout}
                                    handleOpenMessage={handleOpenMessage}
                                    formik={formik}
                                    storeConfig={storeConfig}
                                    StoreCreditView={StoreCreditView}
                                />
                            </div>
                        ) : null}
                    </div>
                    {modules.checkout.extraFee.enabled ? (
                        <ExtraFee
                            checkout={checkout}
                            setCheckout={setCheckout}
                            updateFormik={updateFormik}
                            handleOpenMessage={handleOpenMessage}
                            t={t}
                            storeConfig={storeConfig}
                        />
                    ) : null}
                </>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-3">
                <Summary
                    {...props}
                    loading={checkout.loading.order}
                    disabled={checkout.loading.all}
                    checkout={checkout}
                    updateFormik={updateFormik}
                    setCheckout={setCheckout}
                    handleOpenMessage={handleOpenMessage}
                    formik={formik}
                    storeConfig={storeConfig}
                    SummaryView={SummaryView}
                    // eslint-disable-next-line no-return-assign
                    refSummary={SummaryRef}
                />
            </div>
            <div className="col-sm-8 hidden-mobile center">
                <Button
                    customRootStyle={{ marginBottom: 80, marginTop: 50 }}
                    onClick={handleClick}
                    fullWidth
                    loading={loading}
                    disabled={disabled}
                    className={styles.placeOrderDesktop}
                >
                    <Typography variant="span" letter="uppercase" type="bold" color="white">
                        {t('checkout:placeOrder')}
                    </Typography>
                </Button>
            </div>
        </div>
    );
};

export default Content;
