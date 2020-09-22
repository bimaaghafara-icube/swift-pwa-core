/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Drawer from '@material-ui/core/Drawer';
import { useRouter } from 'next/router';
import useStyles from './style';

const MiniComponent = (props) => {
    const router = useRouter();
    const { open, setOpen } = props;
    const styles = useStyles();
    return (
        <Drawer anchor="right" open={open} onClose={setOpen}>
            <div className={styles.container}>
                <div className={styles.mini_top}>
                    <span>
                        2 Item
                    </span>
                    <span>
                        My Cart
                    </span>
                    <span onClick={setOpen}>
                        Close
                    </span>
                </div>
                <ol className={styles.miniCartItems}>
                    <li>
                        <div className="product">
                            <a className="product-item-photo">
                                <img
                                    className="product-image-photo"
                                    src="https://swiftpwa-be.testingnow.me/media/catalog/product/cache/a5a223edfa4da3fa7fe4c58714d48103/w/s/wsh11-blue_main_2.jpg"
                                    alt="Ina Compression Short"
                                    style={{ width: '75px', height: '75px' }}
                                />
                            </a>
                            <div className="product-item-details">
                                <strong className="product-item-name">
                                    <a href="https://swiftpwa-be.testingnow.me/ina-compression-short.html">Ina Compression Short</a>
                                </strong>
                                <div className="product-options">
                                    <div className="option-wrapper">
                                        <strong>Size</strong>
                                        {' '}
                                        : xl
                                    </div>
                                    <div className="option-wrapper">
                                        <strong>Color</strong>
                                        {' '}
                                        : Blue
                                    </div>
                                </div>
                            </div>
                            <div className="product-item-pricing">
                                <div className="details-qty qty">
                                    <label
                                        className="label"
                                        htmlFor="cart-item"
                                    >
                                        Qty
                                    </label>

                                    <span className="item-minus qty-update" />
                                    <span className="item-count">1</span>
                                    <span className="item-plus qty-update" />
                                </div>
                                <div className="item-price">
                                    $10
                                </div>
                            </div>
                            <div className="delete">x</div>
                        </div>
                    </li>
                </ol>
                <div className={styles.mini_bottom}>
                    <div className="sub-total">
                        <span>Cart Subtotal:</span>
                        <span>$28</span>
                    </div>
                    <div
                        className="edit-cart"
                        onClick={() => {
                            setOpen();
                            router.push('/checkout/cart');
                        }}
                    >
                        View and Edit Cart
                    </div>
                    <div className="checkout">
                        <div
                            className="checkout-button"
                            onClick={() => {
                                setOpen();
                                router.push('/checkout');
                            }}
                        >
                            Go to Checkout
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default MiniComponent;
