/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import Typography from '@common_typography';
import Radio from '@common_radio';
import Select from '@common_select';
import Checkbox from '@common_checkbox';
import classanames from 'classnames';
import { formatPrice } from '@helpers/currency';
import Skeleton from '@material-ui/lab/Skeleton';
import gqlService from '../../../../services/graphql';

import useStyles from './style';

const AdditionSelect = (props) => {
    const {
        t, checkout, setCheckout, storeConfig,
    } = props;
    const [updateExtraFee] = gqlService.updateExtraFee();
    const { data: { cart }, loading } = checkout;
    const styles = useStyles();
    const [state, setState] = React.useState({});
    const globalCurrency = storeConfig.default_display_currency_code || 'IDR';

    React.useEffect(() => {
        if (cart && cart.addtional_fees && cart.applied_extra_fee) {
            const addtionalFee = cart.addtional_fees;
            const extraFee = cart.applied_extra_fee;
            if (addtionalFee.data && extraFee.select_options) {
                let stateData = {};
                for (let ei = 0; ei < extraFee.select_options.length; ei += 1) {
                    for (let ai = 0; ai < addtionalFee.data.length; ai += 1) {
                        for (let oai = 0; oai < addtionalFee.data[ai].options.length; oai += 1) {
                            if (addtionalFee.data[ai].options[oai].option_id === extraFee.select_options[ei].option_id) {
                                if (addtionalFee.data[ai].frontend_type === 'checkbox') {
                                    let newState = {
                                        [addtionalFee.data[ai].id_fee]: [JSON.stringify(addtionalFee.data[ai].options[oai])],
                                    };
                                    if (stateData[[addtionalFee.data[ai].id_fee]]) {
                                        newState = {
                                            [addtionalFee.data[ai].id_fee]: [
                                                ...stateData[[addtionalFee.data[ai].id_fee]],
                                                JSON.stringify(addtionalFee.data[ai].options[oai]),
                                            ],
                                        };
                                    }
                                    stateData = {
                                        ...stateData,
                                        ...newState,
                                    };
                                } else {
                                    stateData = {
                                        ...stateData,
                                        [addtionalFee.data[ai].id_fee]: JSON.stringify(addtionalFee.data[ai].options[oai]),
                                    };
                                }
                            }
                        }
                    }
                }
                setState(stateData);
            }
        }
    }, [checkout]);

    if (loading.all) {
        return (
            <div className={styles.container}>
                <Skeleton variant="text" width="40%" height={35} />
                <Skeleton variant="text" width="80%" height={30} />
                <Skeleton variant="text" width="80%" height={30} />
            </div>
        );
    }

    const handleChange = async (key, value) => {
        window.backdropLoader(true);
        const newState = { ...state, [key]: value };
        await setState(newState);
        const keyState = Object.keys(newState);
        const select_options = [];
        for (let index = 0; index < keyState.length; index += 1) {
            if (Array.isArray(newState[keyState[index]])) {
                const options = newState[keyState[index]].map((option) => {
                    const val = JSON.parse(option);
                    return {
                        label: val.label,
                        option_id: val.option_id,
                    };
                });
                select_options.push(...options);
            } else {
                const val = JSON.parse(newState[keyState[index]]);
                select_options.push({
                    label: val.label,
                    option_id: val.option_id,
                });
            }
        }

        updateExtraFee({
            variables: {
                cart_id: cart.id,
                select_options,
            },
        }).then(async (res) => {
            const checkoutData = { ...checkout };
            checkoutData.data.cart = res.data.updateExtraFeeOnCart.cart;
            await setCheckout(checkoutData);
            window.backdropLoader(false);
        }).catch(() => window.backdropLoader(false));
    };
    if (cart && cart.addtional_fees && cart.addtional_fees.data && cart.addtional_fees.data.length > 0) {
        return (
            <div className={styles.container}>
                <Typography variant="title" type="bold" className={classanames(styles.title)}>{t('common:title:extraFee')}</Typography>
                {
                    cart.addtional_fees.data.map((item, key) => {
                        const data = item.options.map((option) => ({
                            ...option,
                            originalLabel: option.label,
                            label: `${option.label} (${formatPrice(option.price, globalCurrency)})`,
                            value: JSON.stringify(option),
                        }));
                        if (item.frontend_type === 'checkbox' && item.enabled) {
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Typography variant="span" type="bold" className="clear-margin-padding">
                                        {item.fee_name}
                                    </Typography>
                                    <Checkbox
                                        key={key}
                                        flex="column"
                                        data={data}
                                        value={state[item.id_fee] ? state[item.id_fee] : []}
                                        classCheckbox={styles.checkbox}
                                        classContainer={styles.checkboxContainer}
                                        onChange={(val) => handleChange(item.id_fee, val)}
                                    />
                                </div>
                            );
                        }
                        if (item.frontend_type === 'radio' && item.enabled) {
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Typography variant="span" type="bold" className="clear-margin-padding">
                                        {item.fee_name}
                                    </Typography>
                                    <Radio
                                        flex="column"
                                        valueData={data}
                                        value={state[item.id_fee] ? state[item.id_fee] : ''}
                                        onChange={(val) => handleChange(item.id_fee, val)}
                                        classContainer={styles.radio}
                                    />
                                </div>
                            );
                        }
                        if (item.frontend_type === 'dropdown' && item.enabled) {
                            return (
                                <div className={styles.boxItem} key={key}>
                                    <Select
                                        options={data}
                                        label={item.fee_name}
                                        value={state[item.id_fee] ? state[item.id_fee] : ''}
                                        className={styles.select}
                                        onChange={(event) => handleChange(item.id_fee, event.target.value)}
                                        helperText={t('common:form:select')}
                                    />
                                </div>
                            );
                        }
                    })
                }
            </div>
        );
    }

    return null;
};

export default AdditionSelect;
