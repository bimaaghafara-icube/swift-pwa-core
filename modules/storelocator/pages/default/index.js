import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

import Content from './components';
import Core from './core';

const StoreLocator = (props) => <Core {...props} Content={Content} />;

StoreLocator.getInitialProps = async () => ({
    namespacesRequired: ['common', 'storelocator'],
});

export default withApollo({ ssr: true })(withTranslation()(StoreLocator));
