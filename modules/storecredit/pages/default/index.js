import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';

import Content from './components';
import Core from './core';

const StoreCredit = (props) => <Core {...props} Content={Content} />;

StoreCredit.getInitialProps = async () => ({
    namespacesRequired: ['common', 'storecredit', 'customer'],
});

export default withApollo({ ssr: true })(withTranslation()(StoreCredit));
