import Slide from '@material-ui/core/Slide';
import Typography from '@common_typography';
import Button from '@common_button';
import { useState } from 'react';
import ExpansionPanel from '@material-ui/core/Accordion';
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { formatPrice } from '@helper_currency';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import useStyles from './style';

const CheckoutDrawer = ({
    editMode, t, summary, handleActionSummary, loading, disabled, showItems = false, items = [], label = '',
}) => {
    const styles = useStyles();
    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const { data, total } = summary;
    return (
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <div className={styles.checkoutBox}>
                <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
                    <ExpansionPanelSummary
                        classes={{
                            root: styles.expanHead,
                            expanded: styles.expandHeadOpen,
                        }}
                    >
                        {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.expanBody}>
                        {
                            showItems ? (
                                <>
                                    <div className={classNames('row', styles.itemContainer)}>
                                        {
                                            items.map((item, index) => (
                                                <div
                                                    className="col-xs-12 row"
                                                    key={index}
                                                >
                                                    <div className="col-xs-12 row between-xs clear-margin-padding">
                                                        <div className="col-xs-6">
                                                            <Typography variant="p">{item.product.name}</Typography>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <Typography variant="p" align="right">
                                                                {formatPrice(
                                                                    item.prices.price.value * item.quantity, item.prices.price.currency || 'IDR',
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className={classNames('col-xs-12', styles.qtyOption)}>
                                                        <Typography variant="p">
                                                            {
                                                                item.configurable_options && item.configurable_options.length > 0
                                                                    && (`${t('common:variant')} : ${
                                                                        item.configurable_options.map((option, key) => {
                                                                            if (key !== item.configurable_options.length - 1) {
                                                                                return `${option.value_label} `;
                                                                            }
                                                                            return ` ${option.value_label}`;
                                                                        })
                                                                    }`)
                                                            }
                                                            &nbsp; &nbsp; &nbsp;
                                                            {`${t('common:title:shortQty')} : ${item.quantity}`}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <Divider />
                                </>
                            ) : null
                        }
                        <List>
                            {
                                data.map((dt, index) => (
                                    <ListItem className={styles.list} key={index}>
                                        <ListItemText
                                            className={styles.labelItem}
                                            primary={<Typography variant="p" size="12">{dt.item}</Typography>}
                                        />
                                        <ListItemSecondaryAction>
                                            <Typography variant="span" type="regular">
                                                {dt.value}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))
                            }
                            <ListItem className={styles.list}>
                                <ListItemText primary={<Typography variant="title" type="bold">Total</Typography>} />
                                <ListItemSecondaryAction>
                                    <Typography variant="title" type="bold">
                                        {total.currency ? formatPrice(total.value, total.currency) : null}
                                    </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {
                    expanded === null || expanded === false ? (
                        <div className={styles.summary}>
                            <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                                Total
                            </Typography>
                            <Typography variant="span" type="bold" align="center" letter="capitalize" className={styles.subtotal}>
                                {total.currency ? formatPrice(total.value, total.currency) : null}
                            </Typography>
                        </div>
                    ) : null
                }
                <div className={styles.actions}>
                    <Button
                        loading={loading}
                        disabled={disabled}
                        customRootStyle={{ width: 'fit-content' }}
                        className={styles.goToCheckout}
                        onClick={handleActionSummary}
                    >
                        <Typography variant="span" color="white" type="bold" letter="uppercase">
                            {label || t('common:button:checkout')}
                        </Typography>
                    </Button>
                </div>
            </div>
        </Slide>
    );
};

export default CheckoutDrawer;
