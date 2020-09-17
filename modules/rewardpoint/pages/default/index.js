import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Content from './components';
import Skeleton from './components/skeleton';
import ErrorView from './components/error';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} ErrorView={ErrorView} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'rewardpoint', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
