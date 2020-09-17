import ProductByVariant, { getCombinationVariants, CheckAvailableOptions } from '@helper_productbyvariant';
import useStyles from './style';

const ConfigurableOpt = (props) => {
    const {
        variants = [], configurable_options = [], setSpesificProduct, ListColorView, ListSizeView,
    } = props;
    const styles = useStyles();
    const [selected, setSelected] = React.useState({});
    const [firstSelected, setFirstSelected] = React.useState({});
    const selectedVariant = (key, value) => {
        // reset child filter if parent filter or first filter change
        const options = (firstSelected.code === key && firstSelected.value !== value) ? {} : selected;
        options[key] = value;
        setSpesificProduct({ ...ProductByVariant(options, variants) });
        setSelected({ ...options });

        if (firstSelected.code === key) {
            firstSelected.value = value;
        } else if (!firstSelected.code) {
            firstSelected.code = key;
            firstSelected.value = value;
        }
        setFirstSelected({ ...firstSelected });
    };

    // get combination from helpers
    const combination = getCombinationVariants(firstSelected, variants);
    return configurable_options.map((conf, idx) => {
        const value = [];
        for (
            let valIdx = 0;
            valIdx < conf.values.length;
            // eslint-disable-next-line no-plusplus
            valIdx++
        ) {
            if (value.indexOf(conf.values[valIdx].label) === -1) {
                value.push(conf.values[valIdx].label);
            }
        }
        if (conf.attribute_code === 'color') {
            return (
                <div className={styles.colorContainer} key={idx}>
                    {value.map((clr, index) => {
                        let available = true;
                        if (combination.code && combination.code !== conf.attribute_code) {
                            if (combination.available_combination.length > 0) {
                                available = CheckAvailableOptions(combination.available_combination, clr);
                            } else {
                                available = false;
                            }
                        }
                        return (
                            <ListColorView
                                value={selected.color}
                                onClick={selectedVariant}
                                key={index}
                                disabled={!available}
                                color={clr}
                                size={16}
                                className={styles.btnColor}
                            />
                        );
                    })}
                </div>
            );
        }
        return (
            <div className={styles.colorContainer} key={idx}>
                {value.map((sz, index) => {
                    let available = true;
                    if (combination.code && combination.code !== conf.attribute_code) {
                        if (combination.available_combination.length > 0) {
                            available = CheckAvailableOptions(combination.available_combination, sz);
                        } else {
                            available = false;
                        }
                    }
                    return (
                        <ListSizeView
                            value={selected[conf.attribute_code]}
                            code={conf.attribute_code}
                            onClick={selectedVariant}
                            data={sz}
                            disabled={!available}
                            key={index}
                            width={16}
                            className={styles.btnColor}
                        />
                    );
                })}
            </div>
        );
    });
};

export default ConfigurableOpt;
