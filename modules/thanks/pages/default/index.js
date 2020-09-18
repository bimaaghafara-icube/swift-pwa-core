import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import { getCheckoutDataFromRequest } from '@helper_cookies';
import redirect from 'next-redirect';
import Core from './core';
import Skeleton from './components/Loader';
import Content from './components';
import ErrorInfo from './components/ErrorInfo';

const Page = (props) => (
    <Core
        Skeleton={Skeleton}
        Content={Content}
        ErrorInfo={ErrorInfo}
        {...props}
    />
);

Page.getInitialProps = async (ctx) => {
    const checkoutData = getCheckoutDataFromRequest(ctx);
    if (!checkoutData) redirect(ctx, '/');
    return {
        query: ctx.query,
        checkoutData,
        namespacesRequired: ['common', 'thanks'],
    };
};

export default withApollo({ ssr: true })(withTranslation()(Page));
