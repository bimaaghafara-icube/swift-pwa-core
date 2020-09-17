import { withTranslation } from '@i18n';
import { withApollo } from '@lib/apollo';
import Content from './components';
import Core from './core';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'payment'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
