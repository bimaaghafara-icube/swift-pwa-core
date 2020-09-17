import PropTypes from 'prop-types';
import Layout from '@layout';
import { getCustomer } from '../../services/graphql';
import Content from './components/form';

const Tracking = (props) => {
    let customer = {};
    const {
        isLogin, Skeleton, pageConfig, t,
    } = props;
    const config = {
        title: t('trackingorder:trackingOrder'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('trackingorder:trackingOrder'),
        bottomNav: false,
    };

    if (isLogin) {
        const { data, loading } = getCustomer();
        if (loading) {
            return (
                <Layout {...props} pageConfig={pageConfig || config}>
                    <Skeleton />
                </Layout>
            );
        }
        if (data && data.customer) {
            customer = data.customer;
        }
    }
    return <Layout {...props} pageConfig={pageConfig || config}><Content {...props} email={customer.email || ''} /></Layout>;
};

Tracking.propTypes = {
    FormView: PropTypes.func,
    Skeleton: PropTypes.func,
    SkeletonResult: PropTypes.func,
    ResultView: PropTypes.func,
};

Tracking.defaultProps = {
    FormView: () => { },
    Skeleton: () => { },
    SkeletonResult: () => { },
    ResultView: () => { },
};

export default Tracking;
