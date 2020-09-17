import Layout from '@layout';
import { withTranslation } from '@i18n';

const Error = (props) => {
    const {
        statusCode, Content, pageConfig, storeConfig,
    } = props;
    const statusCodes = {
        400: 'Bad Request',
        404: 'This page could not be found',
        405: 'Method Not Allowed',
        500: 'Internal Server Error',
    };

    // eslint-disable-next-line react/destructuring-assignment
    const title = props.title || statusCodes[statusCode] || 'An unexpected error has occurred';

    const config = {
        title,
    };
    return (
        <Layout pageConfig={pageConfig || config} {...props} {...storeConfig}>
            <Content statusCode={statusCode} title={title} />
        </Layout>
    );
};

export default withTranslation()(Error);
