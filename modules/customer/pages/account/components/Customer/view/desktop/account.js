/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

const AddressView = ({ customer, styles, t }) => (
    <>
        <h2 className={styles.infoTitle}>
            {t('customer:menu:accountInformation')}
        </h2>
        <hr />
        <div className="row">
            <div className="col-lg-6">
                <h3>Contact Information</h3>
                <p>
                    {customer.firstname}
                    {' '}
                    {customer.lastname}
                    <br />
                    {customer.email}
                    <br />
                    <Link href="/customer/account/profile">
                        <a className={styles.desktopLink}>Edit</a>
                    </Link>
                    {' '}
                    |
                    {' '}
                    <Link href="/customer/account/profile">
                        <a className={styles.desktopLink}>Change Password</a>
                    </Link>
                </p>
            </div>
            <div className="col-lg-6">
                <h3>Newsletters</h3>
                <p>
                    You
                    {' '}
                    {customer.is_subscribed ? 'are' : 'not'}
                    {' '}
                    subscribed to "General Subscription".
                    <br />
                    <Link href="/customer/setting">
                        <a className={styles.desktopLink}>Edit</a>
                    </Link>
                </p>
            </div>
        </div>
    </>
);

export default AddressView;
