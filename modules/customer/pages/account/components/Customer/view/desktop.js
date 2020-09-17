/* eslint-disable react/no-unescaped-entities */
import Account from './desktop/account';
import Order from './desktop/order';
import Address from './desktop/address';
import Notification from './desktop/notification';
import useStyles from '../style';

const ViewDesktop = (props) => {
    const { t, userData } = props;
    const { customer, notificationList, customerOrders } = userData;
    const styles = useStyles();
    return (
        <div className="hidden-mobile">
            <div className={styles.desktopContainer}>
                <Account customer={customer} styles={styles} t={t} />
                <Address customer={customer} styles={styles} t={t} />
                <Order customerOrders={customerOrders || {}} styles={styles} t={t} />
                <Notification notification={notificationList || {}} styles={styles} t={t} />

            </div>
        </div>
    );
};

export default ViewDesktop;
