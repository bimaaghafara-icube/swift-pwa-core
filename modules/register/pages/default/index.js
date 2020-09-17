import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Core from './core';

const Page = (props) => (<Core {...props} />);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'register', 'validate'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
