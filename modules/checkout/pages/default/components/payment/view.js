/* eslint-disable no-plusplus */
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/Accordion';
import MuiExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import MuiExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import Typography from '@common_typography';
import Arrow from '@material-ui/icons/ArrowDropDown';
import Radio from '@common_forms/Radio';
import Skeleton from '@material-ui/lab/Skeleton';
import RadioItem from '../../../../components/radioitem';
import useStyles from '../style';

import {
    ExpanDetailStyle,
    ExpanPanelStyle,
    ExpanSummaryStyle,
} from './style';

const Loader = () => (
    <>
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="rect" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const ExpansionPanel = withStyles(ExpanPanelStyle)(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(ExpanSummaryStyle)(
    MuiExpansionPanelSummary,
);

const ExpansionPanelDetails = withStyles(ExpanDetailStyle)(
    MuiExpansionPanelDetails,
);

const PaymentView = (props) => {
    const {
        loading, data, checkout, storeConfig, t, handlePayment, selected,
    } = props;
    const styles = useStyles();
    let content;
    const [expanded, setExpanded] = React.useState(null);
    const [expandedActive, setExpandedActive] = React.useState(true);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        setExpandedActive(false);
    };

    if (loading.payment || loading.shipping || loading.all) {
        content = <Loader />;
    } else if (data.cart.prices.grand_total.value === 0) {
        content = <Typography variant="p">{t('checkout:noNeedPayment')}</Typography>;
    } else if (data.paymentMethod.length !== 0 && storeConfig.payments_configuration) {
        let paymentConfig = JSON.parse(`${storeConfig.payments_configuration}`);
        const groups = paymentConfig ? Object.keys(paymentConfig) : [];
        // create grouping by config
        paymentConfig = groups.map((key) => {
            const groupData = [];
            let config = paymentConfig[key];
            config = config.split(',');
            for (let idx = 0; idx < data.paymentMethod.length; idx++) {
                const element = data.paymentMethod[idx];
                for (let idc = 0; idc < config.length; idc++) {
                    if (config[idc] === element.code) {
                        groupData.push(element);
                    }
                }
            }
            let active = false;
            if (groupData.length > 0) {
                // ad active key if on group data selected payment method
                if (selected.payment) {
                    for (let idx = 0; idx < groupData.length; idx += 1) {
                        const element = groupData[idx];
                        if (element.code === selected.payment) {
                            active = true;
                        }
                    }
                }
            }
            return {
                group: key,
                data: groupData,
                active,
            };
        });

        // check if have active on group data by default selected if
        let itemActive = false;
        if (paymentConfig) {
            for (let idx = 0; idx < paymentConfig.length; idx += 1) {
                const element = paymentConfig[idx];
                if (element.active) {
                    itemActive = true;
                }
            }
        }
        content = (
            <div>
                <Typography variant="p">{t('checkout:paymentSubtitle')}</Typography>
                {paymentConfig && (
                    <div className={styles.paymentExpansionContainer}>
                        {paymentConfig.map((item, index) => {
                            if (item.data.length !== 0) {
                                return (
                                    <ExpansionPanel
                                        expanded={expanded === index // if key index same with expanded active
                                            || (item.active && expandedActive) // expand if item active and not change expand
                                            || (!itemActive && expandedActive && index === 0)} // if dont have item active, set index 0 to active
                                        onChange={handleChange(index)}
                                        key={index}
                                    >
                                        <ExpansionPanelSummary
                                            aria-controls="panel1d-content"
                                            id="panel1d-header"
                                            expandIcon={<Arrow className={styles.icon} />}
                                        >
                                            <Typography letter="uppercase" variant="span" type="bold">
                                                {
                                                    (t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)
                                                        === `paymentGrouping.${item.group.replace('pg-', '')}`)
                                                        ? item.group.replace('pg-', '')
                                                        : t(`checkout:paymentGrouping:${item.group.replace('pg-', '')}`)
                                                }
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {item.data.length !== 0 ? (
                                                <Radio
                                                    value={selected.payment}
                                                    onChange={handlePayment}
                                                    valueData={item.data}
                                                    CustomItem={RadioItem}
                                                    propsItem={{
                                                        borderBottom: false,
                                                        RightComponent: true,
                                                    }}
                                                />
                                            ) : null}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        );
    } else if (checkout.selected.delivery === 'pickup') {
        content = <Typography variant="p">{t('checkout:noPaymentPickup')}</Typography>;
    } else {
        content = <Typography variant="p">{t('checkout:noPayment')}</Typography>;
    }

    return (
        <div className={styles.block}>
            <Typography variant="title" type="bold" letter="uppercase">
                {t('checkout:payment')}
            </Typography>
            <div>{content}</div>
        </div>
    );
};

export default PaymentView;
