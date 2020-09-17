import Typography from '@common_typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import useStyles from '../../styles';

const ItemProductView = (props) => {
    const {
        checked, disabled, handleChange, name,
        image_url, price, currency,
    } = props;
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <Checkbox checked={checked} disabled={disabled} onChange={handleChange} inputProps={{ 'aria-label': name }} />
            <div className={styles.productImgContainer}>
                <img
                    src={image_url || '/assets/img/placeholder.png'}
                    className={styles.productImg}
                    alt={name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/img/placeholder.png';
                    }}
                />
            </div>
            <div className={styles.detailItem}>
                <Typography variant="span" type="semiBold">
                    {name || ''}
                </Typography>
                <Typography variant="span">{formatPrice(price, currency)}</Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProductView;
