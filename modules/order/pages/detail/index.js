import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';
import Content from './components';
import Skeleton from './components/skeleton';

const DefaultOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

DefaultOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(DefaultOrder));
