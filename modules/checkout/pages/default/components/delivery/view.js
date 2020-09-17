/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from './style';
import useStylesRoot from '../style';

const ShippingView = (props) => {
    const {
        checkout, handleSelect, t,
    } = props;
    const classes = useStyles();
    const styles = useStylesRoot();
    const checkStyles = (delivery) => ((checkout.selected.delivery === delivery)
        ? classNames(classes.item, classes.active) : classes.item);
    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:deliveryMethod:label')}
            </Typography>
            <div className="row">
                <div className="col-xs-6">
                    <div className={checkStyles('home')} onClick={() => handleSelect('home')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:homeDelivery')}
                            </Typography>
                            <Typography className="hidden-mobile">
                                {t('checkout:deliveryMethod:homeDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className="col-xs-6">
                    <div className={checkStyles('pickup')} onClick={() => handleSelect('pickup')}>
                        <div className="column">
                            <Typography variant="span" type="bold">
                                {t('checkout:deliveryMethod:pickupDelivery')}
                            </Typography>
                            <Typography className="hidden-mobile">
                                {t('checkout:deliveryMethod:pickupDeliveryDesc')}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingView;
