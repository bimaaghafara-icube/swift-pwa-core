import Layout from '@layout';
import { debuging } from '@config';
import PropTypes from 'prop-types';
import CustomerLayout from '@core_modules/customer/components/layout';
import { getOrder } from '../../services/graphql';

const HistoryOrder = (props) => {
    const {
        t, Content, Skeleton, ErrorView, size,
    } = props;
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(true);
        }
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setLoadMore(true);
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const {
        loading, data, error,
    } = getOrder({
        pageSize,
        currentPage: page + 1,
    });

    React.useEffect(() => {
        if (!loading && data && data.customerOrders.items && data.customerOrders.items.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    if (loading || (!data && !loadMore)) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <ErrorView
                    type="error"
                    message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')}
                />
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content
                {...props}
                loadMore={loadMore}
                data={data.customerOrders}
                page={page}
                pageSize={pageSize}
                loading={loading}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
            />
        </Layout>
    );
};

HistoryOrder.propTypes = {
    ErrorView: PropTypes.func,
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

HistoryOrder.defaultProps = {
    ErrorView: () => null,
    Content: () => null,
    Skeleton: () => null,
};

export default HistoryOrder;
