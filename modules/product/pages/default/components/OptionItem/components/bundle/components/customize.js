/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import ButtonQty from '@common_buttonqty';
import Button from '@common_button';
import useStyles from '../style';

const generateBundleSize = (items) => {
    let price = 0;
    let currency = 'USD';
    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        for (let idx = 0; idx < element.options.length; idx++) {
            const opt = element.options[idx];
            if (opt.is_default) {
                price += opt.product.price_range.minimum_price.final_price.value;
                currency = opt.product.price_range.minimum_price.final_price.currency;
            }
        }
    }

    return formatPrice(price, currency);
};

const changeSelectedOption = (position, id, items) => {
    const result = [];
    for (let index = 0; index < items.length; index++) {
        // need to create new object because read only from graph ql
        const element = { ...items[index] };
        const optionArr = [];
        if (element.position === parseInt(position)) {
            for (let idx = 0; idx < element.options.length; idx++) {
                const opt = { ...element.options[idx] };
                if (element.type === 'radio') {
                    opt.is_default = opt.id === parseInt(id);
                }
                optionArr.push(opt);
            }
            element.options = optionArr;
        }

        result.push(element);
    }

    return result;
};

const GenerateOptionsSelect = ({ data, options = [], selectOptions }) => options.map((val, idx) => (
    <div className="options-container" key={idx}>
        <input
            type="radio"
            onClick={() => selectOptions(data, val.id)}
            id={val.id}
            name={data.position}
            value={val.id}
            defaultChecked={val.is_default}
        />
        <label
            className="label-options"
            htmlFor={val.id}
            dangerouslySetInnerHTML={{
                __html: `${val.label} + <b>+${formatPrice(val.product.price_range.minimum_price.final_price.value,
                    val.product.price_range.minimum_price.final_price.currency)}</b>`,
            }}
        />
        <br />
    </div>
));

const Customize = (props) => {
    const { data, t } = props;
    const styles = useStyles();
    const [items, setItems] = React.useState([]);
    const product = data.items && data.items[0] ? data.items[0] : {};

    React.useEffect(() => {
        if (items.length === 0 && product.items) {
            setItems(product.items);
        }
    }, [product]);

    const selectOptions = (group, id) => {
        const itemsUpdate = changeSelectedOption(group.position, id, items);
        setItems([...itemsUpdate]);
    };

    console.log(items);

    return (
        <>
            <Typography variant="h5" type="bold">
                Customize
                {' '}
                {product.name}
            </Typography>
            {
                items.length > 0 ? (
                    <div className={styles.customizeContainer}>
                        <div className="row">
                            <div className="col-xs-12 col-lg-8">
                                {items.map((val, idx) => (
                                    <div className="item-list" key={idx}>
                                        <Typography variant="label" type="bold">
                                            {val.title}
                                            <span className="required-label">
                                                *
                                            </span>
                                        </Typography>
                                        <GenerateOptionsSelect data={val} options={val.options} selectOptions={selectOptions} />
                                        <Typography variant="label" type="bold">
                                            Quantity
                                        </Typography>
                                        <ButtonQty
                                            value={1}
                                            onChange={(e) => { console.log(e); }}
                                            max={10000}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="col-xs-12 col-lg-4">
                                <Typography variant="label" type="bold">
                                    Your Customization
                                </Typography>
                                <hr />
                                <Typography variant="h3" type="bold">
                                    {generateBundleSize(items)}
                                </Typography>
                                <ButtonQty
                                    value={1}
                                    onChange={(e) => { console.log(e); }}
                                    max={10000}
                                />
                                <Button
                                    className={styles.btnAddToCard}
                                    color="primary"
                                    onClick={() => {}}
                                    loading={false}
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
                        </div>
                    </div>
                ) : null
            }

        </>
    );
};

export default Customize;
