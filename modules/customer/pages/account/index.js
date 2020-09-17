import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

import Core from './core';
import Skeleton from './components/Skeleton';
import CustomerView from './components/Customer/view';
import GuestView from './components/Guest';

const Page = (props) => (
    <Core
        {...props}
        CustomerView={CustomerView}
        Skeleton={Skeleton}
        GuestView={GuestView}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
