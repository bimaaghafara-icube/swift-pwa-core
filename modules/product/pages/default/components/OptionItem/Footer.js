import Typography from '@common_typography';
import Qty from '@common_qty';
// import Router from 'next/router';
import React from 'react';
import Button from '@common_button';
import useStyles from './style';

export default ({
    qty = 1,
    handleQty = () => { },
    handleAddToCart = () => { },
    t,
    loading = false,
}) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.qty}>
                <Typography type="bold" variant="span">{t('common:title:qty')}</Typography>
                <Qty
                    value={qty}
                    onChange={handleQty}
                    max={10000}
                />
            </div>
            <div className={styles.footer}>
                <Button
                    className={styles.btnAddToCard}
                    color="primary"
                    onClick={handleAddToCart}
                    loading={loading}
                >
                    <Typography
                        align="center"
                        type="bold"
                        letter="uppercase"
                        color="white"
                        variant="span"
                    >
                        {t('product:addToCart')}
                    </Typography>
                </Button>
            </div>
        </>
    );
};
