import Typography from '@common_typography';
import { formatPrice } from '@helpers/currency';
import React from 'react';
import Image from '@common_image';
import useStyles from '../style';

const ItemProduct = ({
    name, price, qty_ordered, currency, t, image_url, features: { imageSize },
}) => {
    const styles = useStyles();
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productImgContainer}>
                <Image
                    src={image_url}
                    className={styles.productImg}
                    alt={name}
                    width={imageSize.product.width}
                    height={imageSize.product.height}
                    quality={80}
                />
            </div>
            <div className={styles.detailItem}>
                <Typography variant="label" className="clear-margin-padding">{name || ''}</Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:price')}
                    {' '}
                    :
                    {formatPrice(price, currency)}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:qty')}
                    {' '}
                    :
                    {qty_ordered || 0}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:subtotal')}
                    {' '}
                    :
                    {formatPrice((price * qty_ordered), currency)}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProduct;
