import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './components';
import Skeleton from './components/skeleton';
import Core from './core';

const Page = (props) => <Core {...props} Content={Content} Skeleton={Skeleton} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
