import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import { useTranslation } from '@i18n';
import useStyles from './styles';

const ItemProduct = (props) => {
    const {
        name, qty_rma, price, image_url,
        currency = 'IDR', custom_fields,
    } = props;
    const { t } = useTranslation(['return']);
    const styles = useStyles();
    return (
        <div className="column">
            <div className={styles.itemContainer}>
                <div className={styles.productImgContainer}>
                    <img
                        src={image_url || '/assets/img/placeholder.png'}
                        className={styles.productImg}
                        alt={name}
                        onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    />
                </div>
                <div className={styles.detailItem}>
                    <Typography variant="span">{name}</Typography>
                    <Typography variant="span">{formatPrice(price, currency)}</Typography>
                    <Typography variant="span" className={styles.textDetail}>
                        {t('common:title:qty')}
                        {' '}
                        :
                        {' '}
                        {qty_rma || 0}
                    </Typography>
                    {
                        custom_fields.map((field, indx) => (
                            <Typography key={indx} variant="span" className={styles.textDetail}>
                                {field.field.frontend_labels[0].value}
                                {' '}
                                :
                                {' '}
                                {field.value.frontend_labels[0].value}
                            </Typography>
                        ))
                    }
                    <div className="flex-grow" />
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;
