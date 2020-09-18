/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatPrice } from '@helpers/currency';
import classNames from 'classnames';

import useStyles from './style';

const Summary = (props) => {
    const {
        t, summary, handleActionSummary = () => {}, loading, disabled,
        showItems = false, items = [], hideButton = false, isDesktop,
    } = props;
    const styles = useStyles();
    const [openItem, setOpenItem] = React.useState(false);
    return (
        <div className={isDesktop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            <Typography variant="h1" type="regular" letter="capitalize">
                Summary
            </Typography>
            {
                showItems ? (
                    <>
                        <div className={classNames('row between-xs')} onClick={() => setOpenItem(!openItem)}>
                            <div className="col-xs-6">
                                <Typography variant="span">{`${items.length} items in Cart`}</Typography>
                            </div>
                            <div className="col-xs-2">
                                {
                                    openItem ? (<ExpandLess />) : (<ExpandMore />)
                                }
                            </div>
                        </div>
                        {
                            openItem ? (
                                <div className={classNames('row')}>
                                    {
                                        items.map((item, index) => (
                                            <div className={classNames('col-xs-12 row between-xs', styles.list, styles.listProduct)} key={index}>
                                                <div className="col-xs-4">
                                                    <img src={item.product.small_image.url} alt={item.product.name} className={styles.imgProduct} />
                                                </div>
                                                <div className={classNames('col-xs-8', styles.bodyProductItem)}>
                                                    <Typography variant="span">{item.product.name}</Typography>
                                                    <div className="flex-grow" />
                                                    <Typography variant="span">{`${t('common:title:shortQty')} : ${item.quantity}`}</Typography>
                                                    <Typography variant="span" size="14" letter="uppercase">
                                                        {formatPrice(item.prices.price.value, item.prices.price.currency || 'IDR')}
                                                    </Typography>

                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : null
                        }
                    </>
                )
                    : null
            }
            <List>
                {
                    summary.data.map((dt, index) => (
                        <ListItem className={styles.list} key={index}>
                            <ListItemText className={styles.labelItem} primary={<Typography variant="p" size="12">{dt.item}</Typography>} />
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
                            {summary.total.currency ? formatPrice(summary.total.value, summary.total.currency) : null}
                        </Typography>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            {
                !hideButton ? (
                    <Button loading={loading} disabled={disabled} className={styles.btnCheckout} onClick={handleActionSummary}>
                        <Typography variant="span" color="white" type="bold" letter="uppercase">
                            {t('common:button:checkout')}
                        </Typography>
                    </Button>
                ) : null
            }
        </div>
    );
};

export default Summary;
