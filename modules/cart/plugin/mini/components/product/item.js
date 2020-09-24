/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { formatPrice } from '@helper_currency';

const Item = (props) => {
    const {
        quantity, prices, product, deleteCart, updateCart, id, configurable_options,
    } = props;
    return (
        <li>
            <div className="product">
                <a className="product-item-photo">
                    <img
                        className="product-image-photo"
                        src={product.small_image.url}
                        alt={product.small_image.label}
                        style={{ width: '75px', height: '75px' }}
                    />
                </a>
                <div className="product-item-details">
                    <strong className="product-item-name">
                        <Link href="/[...slug]" as={`/${product.url_key}`}><a>{product.name}</a></Link>
                    </strong>
                    {configurable_options && configurable_options.length ? (
                        <div className="product-options">
                            {configurable_options.map((val, idx) => (
                                <div className="option-wrapper" key={idx}>
                                    <strong>{val.option_label}</strong>
                                    {' '}
                                    :
                                    {' '}
                                    {val.value_label}
                                </div>
                            ))}
                        </div>
                    ) : null}

                </div>
                <div className="product-item-pricing">
                    <div className="details-qty qty">
                        <label
                            className="label"
                            htmlFor="cart-item"
                        >
                            Qty
                        </label>

                        <span className="item-minus qty-update" onClick={() => (quantity > 1 ? updateCart(id, quantity - 1) : '')} />
                        <span className="item-count">{quantity}</span>
                        <span className="item-plus qty-update" onClick={() => updateCart(id, quantity + 1)} />
                    </div>
                    <div className="item-price">
                        {formatPrice(
                            prices.row_total.value, prices.row_total.currency || 'IDR',
                        )}
                    </div>
                </div>
                <div
                    className="delete"
                    onClick={() => {
                        deleteCart(id);
                    }}
                >
                    x
                </div>
            </div>
        </li>
    );
};

export default Item;
