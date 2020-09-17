/* eslint-disable prefer-destructuring */
import Alert from '@material-ui/lab/Alert';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { formatPrice } from '@helpers/currency';

const resultItem = ({ t, orders }) => {
    const data = orders.data[0];
    if (orders.data.length > 0) {
        let { detail } = data;
        detail = detail[0];
        const items = [
            { primary: t('trackingorder:orderStatus'), secondary: data.status_label },
            { primary: t('trackingorder:shippedTo'), secondary: `${detail.shipping_address.firstname} ${detail.shipping_address.lastname}` },
            { primary: t('trackingorder:orderId'), secondary: data.order_number },
            { primary: t('trackingorder:status'), secondary: data.status },
            { primary: t('trackingorder:orderTotal'), secondary: formatPrice(data.grand_total, 'USD') },
            { primary: t('trackingorder:paymentMethod'), secondary: detail.payment.payment_additional_info.method_title },
            { primary: t('trackingorder:shippingMethod'), secondary: detail.shipping_methods.shipping_description },
        ];
        return (
            <List>
                {items.map((item, i) => (
                    <ListItem key={i}>
                        <ListItemText
                            primary={(
                                <Typography letter="capitalize">
                                    {item.primary}
                                </Typography>
                            )}
                        />
                        <ListItemSecondaryAction>
                            <Typography variant="span" type="bold">
                                {item.secondary}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
    return <Alert severity="warning">{t('trackingorder:orderNotFound')}</Alert>;
};

export default resultItem;
