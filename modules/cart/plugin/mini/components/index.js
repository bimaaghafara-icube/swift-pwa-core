/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Drawer from '@material-ui/core/Drawer';
import { useRouter } from 'next/router';
import { formatPrice } from '@helper_currency';
import Skeleton from './skeleton';
import ItemCart from './product';
import useStyles from './style';

const MiniComponent = (props) => {
    const router = useRouter();
    const {
        open, setOpen, count, t, loading, data, deleteCart, updateCart,
    } = props;
    const styles = useStyles();
    return (
        <Drawer anchor="right" open={open} onClose={setOpen}>
            <div className={styles.container}>
                <div className={styles.mini_top}>
                    <span>
                        {count}
                        {' '}
                        Items
                    </span>
                    <span>
                        {t('common:cart:myCart')}
                    </span>
                    <span onClick={setOpen}>
                        {t('common:button:close')}
                    </span>
                </div>
                {loading || !data.items ? <Skeleton /> : (
                    <ItemCart
                        data={data.items}
                        t={t}
                        deleteCart={deleteCart}
                        updateCart={updateCart}
                    />
                )}
                {data && data.total_quantity > 0 ? (
                    <div className={styles.mini_bottom}>
                        <div className="sub-total">
                            <span>
                                {t('common:cart:cardTotal')}
                                :
                            </span>
                            <span>
                                {data.prices ? formatPrice(
                                    data.prices.subtotal_excluding_tax.value, data.prices.subtotal_excluding_tax.currency || 'IDR',
                                ) : '-'}
                            </span>
                        </div>
                        <div
                            className="edit-cart"
                            onClick={() => {
                                setOpen();
                                router.push('/checkout/cart');
                            }}
                        >
                            {t('common:button:viewandedit')}
                        </div>
                        <div className="checkout">
                            <div
                                className="checkout-button"
                                onClick={() => {
                                    setOpen();
                                    router.push('/checkout');
                                }}
                            >
                                {t('common:button:goCheckout')}
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>
        </Drawer>
    );
};

export default MiniComponent;
