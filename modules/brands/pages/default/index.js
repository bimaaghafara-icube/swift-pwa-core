import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';
import Content from './components';
import Skeleton from './components/skeleton';

const Default = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

Default.getInitialProps = async () => ({
    namespacesRequired: ['brands'],
});

export default withApollo({ ssr: true })(withTranslation()(Default));
