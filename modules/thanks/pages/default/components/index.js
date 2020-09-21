import Button from '@common_button';
import Typography from '@common_typography';
import Link from 'next/link';
import { formatPrice } from '@helper_currency';
import formatDate from '@helper_date';
import IconArrow from '@material-ui/icons/ArrowForwardIos';
import classNames from 'classnames';
import useStyles from './style';

const View = (props) => {
    const {
        t, isLogin, checkoutData, handleCotinue, ordersFilter, storeConfig, dateOrder,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <Typography variant="h1" type="bold" letter="uppercase" className={styles.title}>
                {t('thanks:thanks')}
            </Typography>
            <Typography variant="span" className="clear-margin-padding" letter="none">
                {t('thanks:placeInfo')}
            </Typography>
            <div className={styles.info}>
                <Typography variant="span" className="clear-margin-padding" letter="none">
                    {`${t('thanks:yourOrderId')} : `}
                    {isLogin && isLogin === 1 ? (
                        <Link href="/sales/order/view/order_id/[id]" as={`/sales/order/view/order_id/${checkoutData.order_number}`}>
                            <a>
                                <b>{checkoutData.order_number}</b>
                            </a>
                        </Link>
                    ) : <b>{checkoutData.order_number}</b>}
                </Typography>
                <Typography variant="span" className="clear-margin-padding" letter="none">
                    {`${t('thanks:amount')} : `}
                    {ordersFilter && formatPrice(ordersFilter.data[0].detail[0].grand_total, storeConfig.base_currency_code || 'IDR')}
                </Typography>
            </div>
            {
                (ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer')
                    ? (
                        <div className={styles.info}>
                            <Typography variant="span" className="clear-margin-padding" letter="none">
                                {t('thanks:bankInfo').split('$')[0]}
                                <b className={styles.payment}>
                                    {`${ordersFilter.data[0].detail[0].payment.payment_additional_info.method_title},`}
                                </b>
                                <br />
                                {t('thanks:bankInfo').split('$')[1]}
                            </Typography>
                            <Typography variant="span" className={styles.dateOver}>
                                {`${t('thanks:bankInfo2')} `}
                                {ordersFilter
                                    && formatDate(dateOrder.setTime(dateOrder.getTime() + 111600000), 'dddd, DD MMM HH:mm WIB')}
                            </Typography>
                        </div>
                    )
                    : null
            }
            <div className={classNames(styles.info, 'hidden-mobile')}>
                {
                    (ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer')
                        ? (
                            <>
                                <Button
                                    href="/confirmpayment"
                                    className={[styles.btnConfirmFirst].join(' ')}
                                    align="left"
                                >
                                    <Typography
                                        variant="span"
                                        letter="uppercase"
                                        color="white"
                                        type="bold"
                                    >
                                        {t('thanks:paymentConfirmation')}
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={handleCotinue}
                                    className={styles.btnConfirm}
                                    variant="text"
                                    align="left"
                                    endIcon={<IconArrow className={styles.btnConfirmIcon} />}
                                >
                                    {t('thanks:continue')}
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={handleCotinue}
                                className={styles.btnConfirm}
                                endIcon={<IconArrow className={styles.btnConfirmIcon} />}
                            >
                                <Typography size="10" type="bold" color="white" letter="uppercase">{t('thanks:continue')}</Typography>
                            </Button>
                        )
                }
            </div>
            <div className={classNames(styles.footer, 'hidden-desktop')}>
                {
                    (ordersFilter && ordersFilter.data[0].detail[0].payment.method === 'banktransfer')
                        ? (
                            <>
                                <Button href="/confirmpayment" className={[styles.btnConfirm, styles.btnConfirmFirst].join(' ')}>
                                    <Typography
                                        variant="p"
                                        letter="uppercase"
                                        color="white"
                                        type="bold"
                                        align="center"
                                    >
                                        {t('thanks:paymentConfirmation')}
                                    </Typography>
                                </Button>
                                <Button
                                    onClick={handleCotinue}
                                    className={styles.btnConfirm}
                                    variant="text"
                                    endIcon={<IconArrow className={styles.btnConfirmIcon} />}
                                >
                                    {t('thanks:continue')}
                                </Button>
                            </>
                        ) : (
                            <Button
                                onClick={handleCotinue}
                                className={styles.btnConfirm}
                                endIcon={<IconArrow className={styles.btnConfirmIcon} />}
                            >
                                <Typography size="10" type="bold" color="white" letter="uppercase">{t('thanks:continue')}</Typography>
                            </Button>
                        )
                }

            </div>
        </div>
    );
};

export default View;
