import Layout from '@layout';
import dynamic from 'next/dynamic';

const Customer = dynamic(() => import('./components/Customer'), { ssr: false });

const CustomerAccount = (props) => {
    const {
        t, isLogin, CustomerView, Skeleton, GuestView, pageConfig,
    } = props;
    const config = {
        title: t('customer:dashboard:pageTitle'),
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'account',
    };

    if (isLogin) {
        return (
            <Layout pageConfig={pageConfig || config} {...props}>
                <Customer {...props} CustomerView={CustomerView} Skeleton={Skeleton} />
            </Layout>
        );
    }
    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <GuestView {...props} />
        </Layout>
    );
};

export default CustomerAccount;
