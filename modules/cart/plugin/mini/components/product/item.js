/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
const Item = (props) => {
    const { t } = props;
    return (
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
    );
};

export default Item;
