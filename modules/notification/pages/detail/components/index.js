import Typography from '@common_typography';
import Alert from '@material-ui/lab/Alert/Alert';
import Layout from '@core_modules/customer/components/layout';
import Skeleton from './skeleton';

const NotificationData = (props) => {
    const {
        t, loading, error, data, localDateString,
    } = props;
    if (loading) return <Layout {...props}><Skeleton /></Layout>;
    if (error) return <Layout {...props}><Alert severity="error">{`Error: ${error.message}`}</Alert></Layout>;
    if (!data) return <Layout {...props}><Alert severity="error">{t('notification:not_found')}</Alert></Layout>;

    const item = data.readNotification.items[0];

    return (
        <Layout {...props}>
            <div className="container">
                <Typography variant="p" style={{ marginBottom: 12 }} size="10" type="regular">
                    {localDateString(item.createdAt)}
                </Typography>
                <Typography variant="p" size="14" type="regular">
                    {item.subject}
                </Typography>
                <Typography variant="p" size="12" type="regular">
                    {item.content}
                </Typography>
            </div>
        </Layout>
    );
};

export default NotificationData;
