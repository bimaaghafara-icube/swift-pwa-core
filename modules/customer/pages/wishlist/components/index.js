/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import Typography from '@common_typography';
import Button from '@common_button';
import Alert from '@material-ui/lab/Alert';
import React from 'react';
import Layout from '@core_modules/customer/components/layout';
import useStyles from './style';
import Item from './item';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const {
        t, wishlist, refetch, handleRemove, handleToCart, handleAddAlltoBag, loading,
    } = props;
    return (
        <Layout {...props}>
            <div className={styles.root}>
                {wishlist.length === 0 && (
                    <Alert className="m-15" severity="warning">
                        {t('customer:wishlist:notFound')}
                    </Alert>
                )}
                <div className={[styles.content, styles.wishlistItems, 'row'].join(' ')}>
                    {wishlist.map((item, index) => (
                        <div className="col-md-3 col-xs-12">
                            <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <Button
                        onClick={handleAddAlltoBag}
                        disabled={loading || wishlist.length === 0}
                        className={styles.btnWishlist}
                    >
                        <Typography variant="title" type="regular" letter="capitalize" color="white">
                            {t('customer:wishlist:addAllToBag')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default Content;
