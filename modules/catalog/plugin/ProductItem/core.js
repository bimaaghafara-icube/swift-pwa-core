/* eslint-disable jsx-a11y/anchor-is-valid */
import { modules, debuging } from '@config';
import { getLoginInfo } from '@helper_auth';
import { setCookies } from '@helper_cookies';
import { useTranslation } from '@i18n';
import route from 'next/router';
import React from 'react';
import { setResolver } from '@helper_localstorage';
import classNames from 'classnames';
import { addWishlist } from '../../services/graphql';
import useStyles from './style';
import ConfigurableOpt from './components/ConfigurableProductItem';

const ProductItem = (props) => {
    const {
        id, url_key = '', categorySelect, review, ImageProductView, DetailProductView, LabelView, className = '',
        ...other
    } = props;
    const styles = useStyles();
    const { t } = useTranslation(['catalog']);
    const [feed, setFeed] = React.useState(false);
    const [spesificProduct, setSpesificProduct] = React.useState({});

    let isLogin = '';
    if (typeof window !== 'undefined') isLogin = getLoginInfo();
    const [postAddWishlist] = addWishlist();

    const handleFeed = () => {
        if (isLogin && isLogin !== '') {
            postAddWishlist({
                variables: {
                    productId: id,
                },
            })
                .then(async () => {
                    await setFeed(!feed);
                    await window.toastMessage({ open: true, variant: 'success', text: t('common:message:feedSuccess') });
                    route.push('/wishlist');
                })
                .catch((e) => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: debuging.originalError ? e.message.split(':')[1] : t('common:message:feedFailed'),
                    });
                });
        } else if (typeof window.toastMessage !== 'undefined') {
            window.toastMessage({
                open: true,
                variant: 'warning',
                text: t('catalog:wishlist:addWithoutLogin'),
            });
        }
    };

    const handleClick = async () => {
        await setResolver({
            type: 'PRODUCT',
        });
        setCookies('lastCategory', categorySelect);
        route.push('/[...slug]', `/${url_key}`);
    };

    const ratingValue = review && review.rating_summary ? parseInt(review.rating_summary, 0) / 20 : 0;
    const DetailProps = {
        spesificProduct,
        handleClick,
        handleFeed,
        ratingValue,
        feed,
    };
    return (
        <>
            <div className={classNames(styles.itemContainer, className)}>
                {
                    modules.catalog.productListing.label.enabled && LabelView ? (
                        <LabelView {...other} spesificProduct={spesificProduct} />
                    ) : null
                }
                <div className={styles.imgItem}>
                    <ImageProductView handleClick={handleClick} spesificProduct={spesificProduct} {...other} />
                </div>
                <div className={styles.detailItem}>
                    <DetailProductView {...DetailProps} {...other} />
                    {modules.catalog.productListing.configurableOptions.enabled ? (
                        <ConfigurableOpt setSpesificProduct={setSpesificProduct} {...other} />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ProductItem;
